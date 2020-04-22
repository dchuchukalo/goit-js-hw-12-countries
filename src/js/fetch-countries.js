import '@pnotify/core/dist/PNotify.css';
import '@pnotify/mobile/dist/PNotifyMobile.css';
import { defaults } from '@pnotify/core';
import { error, defaultModules } from '@pnotify/core/dist/PNotify.js';
import * as PNotifyMobile from '@pnotify/mobile/dist/PNotifyMobile.js';
import '@pnotify/core/dist/BrightTheme.css';
defaultModules.set(PNotifyMobile, {});
defaults.delay = '3000';

import debounce from 'lodash.debounce';
import { spinner } from './spinner';
import showResult from './show-results';
import refs from './refs';
import './settings-input';

function searchCountry(query) {
  const url = 'https://restcountries.eu/rest/v2/name/';
  const name = query.target.value;
  spinner.spin(refs.bodyRef);

  function wrongQuery() {
    clearResultsList();
    error({
      text: 'Please enter the correct country name',
    });
  }

  function clearResultsList() {
    refs.resultsRef.innerHTML = '';
  }

  if (name.length === 0) {
    wrongQuery();
    spinner.stop();
    return;
  }

  fetch(url + name)
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      throw new Error('Error fetching data');
    })
    .then(data => showResult(data))
    .finally(() => {
      spinner.stop();
    })
    .catch(wrongQuery);
}

refs.inputRef.addEventListener('input', debounce(searchCountry, 500));

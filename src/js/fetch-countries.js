import PNotify from 'pnotify/dist/es/PNotify.js';
import PNotifyButtons from 'pnotify/dist/es/PNotifyButtons.js';
import 'pnotify/dist/PNotifyBrightTheme.css';
PNotify.defaults.delay = 3000;

import debounce from 'lodash.debounce';
import { spinner } from './spinner';
import showResult from './show-results';
import refs from './refs';
import './clear-input'

function searchCountry(query) {
  const url = 'https://restcountries.eu/rest/v2/name/';
  const name = query.target.value;
  spinner.spin(refs.bodyRef);

  function wrongQuery() {
    clearResultsList();
    PNotify.error({
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
    .catch(wrongQuery)
}

refs.inputRef.addEventListener('input', debounce(searchCountry, 500));

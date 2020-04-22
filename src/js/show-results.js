import '@pnotify/core/dist/PNotify.css';
import '@pnotify/mobile/dist/PNotifyMobile.css';
import { error, defaultModules } from '@pnotify/core/dist/PNotify.js';
import * as PNotifyMobile from '@pnotify/mobile/dist/PNotifyMobile.js';
import '@pnotify/core/dist/BrightTheme.css';

defaultModules.set(PNotifyMobile, {});

import resultList from '../templates/results-list.hbs';
import countryResult from '../templates/country-result.hbs';
import refs from './refs';

export default function showResult(data) {
  let markup = '';
  if (data.length > 10) {
    error({
      text: 'Too many matches found. Please enter a more specific query!',
    });
    refs.resultsRef.innerHTML = '';
    return;
  }
  if (data.length >= 2 && data.length <= 10) {
    selectFromList(data);
    markup = resultList(data);
    insertMarkup(markup);
    return;
  }
  if (data.length === 1) {
    markup = countryResult(...data);
    insertMarkup(markup);
    return;
  }

  function insertMarkup(markup) {
    refs.resultsRef.innerHTML = markup;
  }

  function selectFromList(data) {
    refs.resultsRef.addEventListener('click', choosingFromList);

    function choosingFromList(e) {
      let targetContent = e.target.textContent;

      if (e.target.nodeName === 'LI') {
        targetContent = e.target.children[0].textContent;
      }

      const filterResult = data.filter(
        element => element.name === targetContent,
      );
      const markup = countryResult(...filterResult);
      insertMarkup(markup);
      refs.inputRef.value = targetContent;
      refs.resultsRef.removeEventListener('click', choosingFromList);
    }
  }
}

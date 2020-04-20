import PNotify from 'pnotify/dist/es/PNotify.js';
import PNotifyButtons from 'pnotify/dist/es/PNotifyButtons.js';
import resultList from '../templates/results-list.hbs';
import countryResult from '../templates/country-result.hbs';
import refs from './refs';

export default function showResult(data) {
  let markup = '';
  if (data.length > 10) {
    PNotify.error({
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
      const a = data.filter(element => element.name === e.target.textContent);
      const markup = countryResult(...a);
      insertMarkup(markup);
      refs.inputRef.value = e.target.textContent;
      refs.resultsRef.removeEventListener('click', choosingFromList);
    }
  }
}

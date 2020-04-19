import PNotify from 'pnotify/dist/es/PNotify.js';
import PNotifyButtons from 'pnotify/dist/es/PNotifyButtons.js';
import resultList from '../templates/results-list.hbs';
import countryResult from '../templates/country-result.hbs';

export default function showResult(data) {
  const resultsRef = document.querySelector('.results-js');
  let markup = '';
  if (data.length > 10) {
    PNotify.error({
      text: 'Too many matches found. Please enter a more specific query!',
    });
    resultsRef.innerHTML = '';
    return;
  }
  if (data.length >= 2 && data.length <= 10) {
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
    resultsRef.innerHTML = markup;
  }
}

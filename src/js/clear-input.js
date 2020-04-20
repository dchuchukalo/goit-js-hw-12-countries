import refs from './refs';

refs.inputRef.addEventListener('click', onClick);

function onClick({ target }) {
  target.value = '';
}

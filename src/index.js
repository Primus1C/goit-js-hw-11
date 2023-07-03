import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Notiflix from 'notiflix';
import { PixabayAPI } from './js/PixabayAPI';

const refs = {
  form: document.querySelector('.search-form'),
  input: document.querySelector('input[name="searchQuery"]'),
  buttonNext: document.querySelector('.button'),
};

refs.form.addEventListener('submit', onFormSubmit);

function onFormSubmit(evt) {
  evt.preventDefault();
  console.log('submited!');
  const queryStr = refs.input.value.replace(/ /g, '+');
  const pixabayAPI = new PixabayAPI();
  answer = pixabayAPI.getImages(queryStr);
  console.log(answer);
}

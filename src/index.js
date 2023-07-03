import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Notiflix from 'notiflix';
import { getImages } from './pixabayAPI';

const refs = {
  form: document.querySelector('.search-form'),
  input: document.querySelector('input[name="searchQuery"]'),
  /* stepArea: document.querySelector('input[name="step"]'),
  amountArea: document.querySelector('input[name="amount"]'), */
};

refs.form.addEventListener('submit', onFormSubmit);

function onFormSubmit(evt) {
  evt.preventDefault();
  console.log('submited!');
  //console.log(refs.input.value.replace(/ /g, '+'));
  const p = getImages(refs.input.value.replace(/ /g, '+'));
  //console.log(p);
}

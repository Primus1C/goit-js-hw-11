import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Notiflix from 'notiflix';
import { PixabayAPI } from './js/PixabayAPI';
import createGalleryCard from '../templates/gallery-card.hbs';

const refs = {
  form: document.querySelector('.search-form'),
  input: document.querySelector('input[name="searchQuery"]'),
  gallery: document.querySelector('.gallery'),
  buttonNext: document.querySelector('.button'),
};

refs.form.addEventListener('submit', onFormSubmit);

function onFormSubmit(evt) {
  evt.preventDefault();
  console.log('submited!');
  renderPage();
}

async function renderPage() {
  const pixabayAPI = new PixabayAPI();
  const queryStr = refs.input.value.replace(/ /g, '+');
  const response = await pixabayAPI.getImages(queryStr)
    .then(resp => {
      console.log(1,resp.data);
      p = createGalleryCard(resp.data.hits);
      console.log(2, p);
      refs.gallery.innerHTML=p;
    })
    .catch(err => {
      //console.log(err);
      Notiflix.Notify.failure(err.message);
    }
    ); 
}

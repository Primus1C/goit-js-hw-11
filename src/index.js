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
  const response = await pixabayAPI
    .getImages(queryStr)
    .then(resp => {
      console.log(1, resp.data);
      arrData = createGalleryCard(resp.data.hits);
      if (arrData.length === 0) {
        Notiflix.Notify.warning(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      }
      console.log(2, arrData);
      refs.gallery.innerHTML = arrData;
      const lightbox = new SimpleLightbox('.gallery a', {
        captionDelay: 250,
      });
    })
    .catch(err => {
      //console.log(err);
      Notiflix.Notify.failure(err.message);
    });
}

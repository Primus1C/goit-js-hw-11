import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Notiflix from 'notiflix';
import { PixabayAPI } from './js/PixabayAPI';
import createGalleryCard from '../templates/gallery-card.hbs';

const refs = {
  form: document.querySelector('.search-form'),
  input: document.querySelector('input[name="searchQuery"]'),
  gallery: document.querySelector('.gallery'),
  containerNext: document.querySelector('.container-more'),
  buttonNext: document.querySelector('.load-more'),
};

refs.form.addEventListener('submit', onFormSubmit);
refs.buttonNext.addEventListener('click', onClickNext);

let page = 1;

showElement(refs.containerNext, false);

function onFormSubmit(evt) {
  evt.preventDefault();
  renderPage();
}

function onClickNext(evt) {
  page += 1;
  renderPage(page);
}

async function renderPage(page) {
  const pixabayAPI = new PixabayAPI(page);
  const queryStr = refs.input.value.replace(/ /g, '+');
  const response = await pixabayAPI
    .getImages(queryStr)
    .then(resp => {
      const totalPages = Math.ceil(Number(resp.data.totalHits) / 40);
      if (totalPages>0) {
        Notiflix.Notify.success(`Hooray! We found ${resp.data.totalHits} images.`);
      };
      const arrData = createGalleryCard(resp.data.hits);
      if (arrData.length === 0) {
        Notiflix.Notify.info(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        return;
      };
      if (page > totalPages) {
        Notiflix.Notify.info(
          "We're sorry, but you've reached the end of search results"
        );
        showElement(refs.containerNext, false);
        return;
      };
      showElement(refs.containerNext);
      refs.gallery.innerHTML = arrData;
      const lightbox = new SimpleLightbox('.gallery a', {
        captionDelay: 250,
      });
    })
    .catch(err => {
      Notiflix.Notify.failure(err.message);
    });
}

function showElement(element, show = true) {
  if (show === true) {
    element.classList.remove('hidden');
  } else {
    element.classList.add('hidden');
  }
}

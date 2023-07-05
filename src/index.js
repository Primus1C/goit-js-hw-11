import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Notiflix from 'notiflix';
import { PixabayAPI } from './js/PixabayAPI';
import createGalleryCard from '../templates/gallery-card.hbs';

const PER_PAGE = 40;
const refs = {
  form: document.querySelector('.search-form'),
  input: document.querySelector('input[name="searchQuery"]'),
  gallery: document.querySelector('.gallery'),
  containerNext: document.querySelector('.container-more'),
  buttonNext: document.querySelector('.load-more'),
};

refs.form.addEventListener('submit', onFormSubmit);
refs.buttonNext.addEventListener('click', onClickNext);

let curPage = 0;

showElement(refs.containerNext, false);

function onFormSubmit(evt) {
  evt.preventDefault();
  curPage = 1;
  renderPage(curPage, true);
  //refs.input.value = '';
}

function onClickNext(evt) {
  curPage += 1;
  renderPage(curPage, false);
}

async function renderPage(page, itsFirstQuery) {
  const pixabayAPI = new PixabayAPI(page);
  const queryStr = refs.input.value.trim().replace(/ /g, '+');
  if (queryStr === '' && itsFirstQuery) {
    return;
  }
  console.log('Page', page);
  try {
    const response = await pixabayAPI.getImages(queryStr);
    const totalPages = Math.ceil(Number(response.data.totalHits) / PER_PAGE);
    if (totalPages > 0 && itsFirstQuery === true) {
      //console.log(response.data);
      Notiflix.Notify.success(
        `Hooray! We found ${response.data.totalHits} images.`
      );
    }
    const arrData = createGalleryCard(response.data.hits);
    if (arrData.length === 0) {
      Notiflix.Notify.info(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      showElement(refs.gallery, false);
      showElement(refs.containerNext, false);
      return;
    }
    if (page === totalPages) {
      if (page > 1) {
        Notiflix.Notify.info(
          "We're sorry, but you've reached the end of search results"
        );
      }
      showElement(refs.containerNext, false);
    } else {
      showElement(refs.containerNext);
    }
    showElement(refs.gallery);
    refs.gallery.innerHTML = arrData;
    const lightbox = new SimpleLightbox('.gallery a', {
      captionDelay: 250,
    });
  } catch (err) {
    Notiflix.Notify.failure(err.message);
  }
}

function showElement(element, show = true) {
  if (show === true) {
    element.classList.remove('hidden');
  } else {
    element.classList.add('hidden');
  }
}

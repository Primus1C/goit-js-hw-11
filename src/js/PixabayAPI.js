import axios from 'axios';
import Notiflix from 'notiflix';

const axios = require('axios');

export class PixabayAPI {
  
  #API_KEY = '6095343-d47de4ae86d54fd6f681d759d';
  #BASE_URL = 'https://pixabay.com/api/';
  #BASE_TYPE = 'image_type=photo';

  async getImages(strQuery) {
    const resp = await axios
      .get(
        `${this.#BASE_URL}/?key=${this.#API_KEY}&q=${strQuery}&${this.#BASE_TYPE}&orientation=horizontal&safesearch=true`
      )
      .then(response => {
        console.log('response', response);
        return response.data;
      })
      .catch(error => {
        //console.log(error);
        Notiflix.Notify.failure(error.message);
      });
  }

}
  
/* export async function getImages(strQuery) {
  const resp = await axios
    .get(
      `${BASE_URL}/?key=${API_KEY}&q=${strQuery}&${BASE_TYPE}&orientation=horizontal&safesearch=true`
    )
    .then(response => {
      console.log('response', response);
      return response.data;
    })
    .catch(error => {
      //console.log(error);
      Notiflix.Notify.failure(error.message);
    });
} */

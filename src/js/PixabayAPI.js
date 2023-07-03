import axios from 'axios';

export class PixabayAPI {
  
  #API_KEY = '6095343-d47de4ae86d54fd6f681d759d';
  #BASE_URL = 'https://pixabay.com/api/';
  #BASE_TYPE = 'photo';
  #PER_PAGE = '40';

  constructor(page=1) {
    this.page = page;
   }

  getImages(strQuery) {
    //console.log(this.page);
    /*  return axios.get(
      `${this.#BASE_URL}/?key=${this.#API_KEY}&q=${strQuery}&per_page${this.#PER_PAGE}&page${this.page}&$image_type={this.#BASE_TYPE}&orientation=horizontal&safesearch=true`
    ); */
    return axios.get(`${this.#BASE_URL}`, {
      params: {
        key: this.#API_KEY,
        q: strQuery,
        per_page: this.#PER_PAGE,
        page: this.page,
        image_type: this.#BASE_TYPE,
        safesearch: true,
      },
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

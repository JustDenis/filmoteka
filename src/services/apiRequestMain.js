const API_KEY = 'a4cc8d4a15480ac80c7df65d6ff4a5ea';
const BASE_URL = 'https://api.themoviedb.org';

export default {
  query: '',
  page: 1,

  fetchRequest() {
    const requestParams = `/3/search/movie?api_key=${API_KEY}&query=${this.query}&page=${this.page}`;

    return fetch(BASE_URL + requestParams)
      .then(resp => resp.json())
      .then(data => {
        return data;
      });
  },

  get searchQuery() {
    return this.query;
  },

  set searchQuery(string) {
    this.query = string;
  },

  incrementPage() {
    this.page += 1;
  },

  decrementPage() {
    this.page -= 1;
  },

  resetPage() {
    this.page = 1;
  },
};

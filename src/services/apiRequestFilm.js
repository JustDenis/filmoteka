import getFilmId from '../utilites/parseQueryString';

const BASE_URL = 'https://api.themoviedb.org';
const API_KEY = 'a4cc8d4a15480ac80c7df65d6ff4a5ea';

function fetchFilmData() {
  let filmId = getFilmId();
  return fetch(
    `${BASE_URL}/3/movie/${filmId}?api_key=${API_KEY}&language=en-US`,
  ).then(data => data.json());
}
export default fetchFilmData;

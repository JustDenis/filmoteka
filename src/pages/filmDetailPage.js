import FilmPageTemplate from '../templates/Film.hbs';
import apiRequestFilm from '../services/apiRequestFilm';
import notFound from '../images/NotFoundActor.png';
import { ROOT_DOM } from '../constants';
let filmObject;
const FilmPage = () => {
  apiRequestFilm().then(data => {
    const {
      title,
      poster_path,
      release_date,
      vote_average,
      vote_count,
      popularity,
      genres,
      overview,
      original_title,
      id,
    } = data;
    let filmObject = {
      img:
        poster_path !== null
          ? `https://image.tmdb.org/t/p/original${poster_path}`
          : notFound,
      title,
      year: release_date === undefined ? 'unknown' : release_date.substr(0, 4),
      vote: vote_average,
      votes: vote_count,
      popularity,
      genres: genres.map(genre => genre.name),
      overview,
      originalTitle: original_title,
      id: id,
    };
    const markup = FilmPageTemplate(filmObject);
    ROOT_DOM.innerHTML = markup;
    const addWatchBtnRef = document.querySelector('.film__buttons--favorite');
    addWatchBtnRef.addEventListener('click', toggleToWatched);
    const addToQueueBtnRef = document.querySelector('.film__buttons--queue');
    addToQueueBtnRef.addEventListener('click', toggleToQueue);
    function toggleToWatched() {
      const filmsWatchedObj = {
        ...filmObject,
      };
      const localStorageData = localStorage.getItem('filmsWatched');
      if (!localStorageData) {
        const filmsWatchedArr = [filmsWatchedObj];
        localStorage.setItem('filmsWatched', JSON.stringify(filmsWatchedArr));
      } else {
        const filmsWatchedArr = JSON.parse(localStorageData);
        filmsWatchedArr.forEach(el => {
          if (el.id !== filmsWatchedObj.id) {
            const newFilmWatchedArr = [filmsWatchedObj, ...filmsWatchedArr];
            localStorage.setItem(
              'filmsWatched',
              JSON.stringify(newFilmWatchedArr),
            );
          }
        });
      }
    }

    function toggleToQueue() {
      const filmsQueueObj = {
        ...filmObject,
      };
      const localStorageData = localStorage.getItem('filmsQueue');
      if (!localStorageData) {
        const filmsQueueArr = [filmsQueueObj];
        localStorage.setItem('filmsQueue', JSON.stringify(filmsQueueArr));
      } else {
        const filmsQueueArr = JSON.parse(localStorageData);
        filmsQueueArr.forEach(el => {
          if (el.id !== filmsQueueObj.id) {
            const newFilmQueueArr = [filmsQueueObj, ...filmsQueueArr];
            localStorage.setItem('filmsQueue', JSON.stringify(newFilmQueueArr));
          }
        });
      }
    }
  });
};

export default FilmPage;

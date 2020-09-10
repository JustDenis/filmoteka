import FilmPageTemplate from '../templates/Film.hbs';
import apiRequestFilm from '../services/apiRequestFilm';
import notFound from '../images/NotFoundActor.png';
import { ROOT_DOM } from '../constants';

const FilmPage = () => {
  let filmObject;
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
    filmObject = {
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
      id,
    };
    const markup = FilmPageTemplate(filmObject);
    ROOT_DOM.innerHTML = markup;
    const addWatchBtnRef = document.querySelector('.film__buttons--favorite');
    addWatchBtnRef.addEventListener('click', toggleToWatched);
    const addToQueueBtnRef = document.querySelector('.film__buttons--queue');
    addToQueueBtnRef.addEventListener('click', toggleToQueue);
  });

  function toggleToWatched() {
    toggleLocalStorage('filmsWatched');
  }

  function toggleToQueue() {
    toggleLocalStorage('filmsQueue');
  }

  function toggleLocalStorage(key) {
    const filmsQueueObj = {
      ...filmObject,
    };

    const localStorageData = localStorage.getItem(key);
    console.log(JSON.parse(localStorageData));
    if (!localStorageData) {
      const filmsQueueArr = [filmsQueueObj];
      localStorage.setItem(key, JSON.stringify(filmsQueueArr));
    } else {
      const filmsQueueArr = JSON.parse(localStorageData);
      const isInclude = filmsQueueArr.some(el => filmsQueueObj.id === el.id);
      console.log(isInclude);
      if (!isInclude) {
        const newFilmQueueArr = [filmsQueueObj, ...filmsQueueArr];
        localStorage.setItem(key, JSON.stringify(newFilmQueueArr));
      }
    }
  }
};

export default FilmPage;

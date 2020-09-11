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
    const addToQueueBtnRef = document.querySelector('.film__buttons--queue');

    checkButtonStatus(filmObject, addWatchBtnRef, 'filmsWatched');
    checkButtonStatus(filmObject, addToQueueBtnRef, 'filmsQueue');

    addWatchBtnRef.addEventListener('click', toggleToWatched);
    addToQueueBtnRef.addEventListener('click', toggleToQueue);
  });

  function checkButtonStatus(filmObject, buttonRef, key) {
    const watchedArr = JSON.parse(localStorage.getItem(key));
    if(!watchedArr){
      return
    }
    const isInclude = watchedArr.some(el => el.id === filmObject.id);
    let btnContent;
    

    if(!isInclude){
      buttonRef.dataset.action = 'add';
      if(key === 'filmsWatched'){
        btnContent = '<i class="fas fa-video icon-blue"></i> Add to watched';
      }
      if(key === 'filmsQueue'){
        btnContent = '<i class="far fa-calendar-plus icon-blue"></i> Add to queue';
      }
      buttonRef.innerHTML = btnContent;
    } else{
      buttonRef.dataset.action = 'remove';
      if(key === 'filmsWatched'){
        btnContent = '<i class="fas fa-trash-alt icon-blue"></i> Remove from watched';
      }
      if(key === 'filmsQueue'){
        btnContent = '<i class="far fa-calendar-times icon-blue"></i> Remove from queue';
      }
      buttonRef.innerHTML = btnContent;
    }
  }

  function toggleToWatched(event) {
    if(event.target.dataset.action === 'add'){
      toggleLocalStorage('filmsWatched');
      event.target.innerHTML = '<i class="fas fa-trash-alt icon-blue"></i> Remove from watched';
      event.target.dataset.action = 'remove';
      return;
    }
    if(event.target.dataset.action === 'remove'){
      deleteFromLocalStorage('filmsWatched')
      event.target.innerHTML = '<i class="fas fa-video icon-blue"></i> Add to watched';
      event.target.dataset.action = 'add';
      return;
    }
  }

  function toggleToQueue(event) {
    // toggleLocalStorage('filmsQueue');
    if(event.target.dataset.action === 'add'){
      toggleLocalStorage('filmsQueue');
      event.target.innerHTML = '<i class="far fa-calendar-times icon-blue"></i> Remove from queue';
      event.target.dataset.action = 'remove';
      return;
    }
    if(event.target.dataset.action === 'remove'){
      deleteFromLocalStorage('filmsQueue')
      event.target.innerHTML = '<i class="far fa-calendar-plus icon-blue"></i> Add to queue';
      event.target.dataset.action = 'add';
      return;
    }
  }

  function deleteFromLocalStorage(key) {
    const filmsWatched = JSON.parse(localStorage.getItem(key));
    const newArray = filmsWatched.filter(el => el.id !== filmObject.id);
    localStorage.setItem(key, JSON.stringify(newArray));
  }

  function toggleLocalStorage(key) {
    const filmsQueueObj = {
      ...filmObject,
    };
    const localStorageData = localStorage.getItem(key);

    if (!localStorageData) {
      const filmsQueueArr = [filmsQueueObj];
      localStorage.setItem(key, JSON.stringify(filmsQueueArr));
    } else {
      const filmsQueueArr = JSON.parse(localStorageData);
      const isInclude = filmsQueueArr.some(el => filmsQueueObj.id === el.id);
      if (!isInclude) {
        const newFilmQueueArr = [filmsQueueObj, ...filmsQueueArr];
        localStorage.setItem(key, JSON.stringify(newFilmQueueArr));
      }
    }
  }
};

export default FilmPage;

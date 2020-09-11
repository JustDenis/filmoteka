import MainPageTemplate from '../templates/Main.hbs';
import listTemplate from '../templates/movieListItem.hbs';

import trendsApi from '../services/apiRequestTrendings';
import tmdbApi from '../services/apiRequestMain';

import notFoundImage from '../images/NotFoundActor.png';

import { ROOT_DOM } from '../constants';

function MainPage() {
  function renderBaseMarkup() {
    const markup = MainPageTemplate();
    ROOT_DOM.innerHTML = markup;
  }
  renderBaseMarkup();

  trendsApi().then(data => dataParser(data));

  const refs = {
    inputForm: document.querySelector('#search-form'),
    moviesList: document.querySelector('.films-list'),
    listControls: document.querySelector('.list-controls'),
  };

  refs.inputForm.addEventListener('submit', inputFormHandler);
  refs.listControls.addEventListener('click', litsControlsHandler);
  refs.moviesList.addEventListener('click', e => {
    e.preventDefault();
    window['router'].navigate(
      e.target.closest('li').querySelector('a').getAttribute('href'),
    );
  });

  const buttonsArrRef = refs.listControls.querySelectorAll('button');

  buttonsArrRef.forEach(btn => (btn.disabled = true));

  buttonsArrRef.forEach(btn => btn.classList.remove('control-btn'));
  buttonsArrRef.forEach(btn => btn.classList.add('non-visible'));
  refs.listControls.classList.add('non-visible');

  function inputFormHandler(e) {
    e.preventDefault();

    refs.listControls.querySelector('.page-number-value').textContent = 1
    refs.listControls.classList.remove('non-visible');

    buttonsArrRef.forEach(btn => (btn.disabled = true));
    buttonsArrRef.forEach(btn => btn.classList.remove('control-btn'));
    buttonsArrRef.forEach(btn => btn.classList.add('non-visible'));

    const input = e.currentTarget.querySelector('input');
    const inputValue = input.value;
    const parsedValue = inputValue.split(' ').join('+');

    if (parsedValue === '') {
      return;
    }

    clearMoviesList();
    tmdbApi.resetPage();
    tmdbApi.searchQuery = parsedValue;

    tmdbApi.fetchRequest().then(data => {
      dataParser(data.results);

      if (data.total_pages === 0) {
        return;
      }

      if (data.page === data.total_pages) {
        return;
      }
     

      buttonsArrRef[1].disabled = false;
      buttonsArrRef[1].classList.remove('non-visible');
      buttonsArrRef[1].classList.add('control-btn');

      
    });
  }

  function clearMoviesList() {
    refs.moviesList.innerHTML = '';
  }

  function dataParser(array) {
    const newArray = array.map(el => {
      const newObj = {
        id: el.id,
        originalTitle: el.original_title,
        img:
          el.poster_path !== null
            ? `https://image.tmdb.org/t/p/original${el.poster_path}`
            : notFoundImage,
        title: el.title,
        year:
          el.release_date === undefined
            ? 'unknown'
            : el.release_date.substr(0, 4),
        vote: el.vote_average,
      };

      return newObj;
    });

    renderMoviesListData(newArray);
  }

  function renderMoviesListData(array) {
    const markup = listTemplate(array);
    refs.moviesList.insertAdjacentHTML('beforeend', markup);
  }

  function litsControlsHandler(e) {
    const actionType = e.target.closest('button').dataset.action;

    if (actionType === 'increment') {
      clearMoviesList();
      nextPageBtnHandler();
    } else {
      clearMoviesList();
      prevPageBtnHandler();

    }
  }

  function nextPageBtnHandler() {
    tmdbApi.incrementPage();
    if (tmdbApi.query === '') {
      return;
    }

    tmdbApi.fetchRequest().then(data => {
      dataParser(data.results);

      const currentPage = data.page;
      const maxPage = data.total_pages;

      buttonLocker(currentPage, maxPage);
    });
  }

  function prevPageBtnHandler() {
    if (tmdbApi.page === 1) {
      return;
    }

    tmdbApi.decrementPage();
    if (tmdbApi.query === '') {
      return;
    }

    tmdbApi.fetchRequest().then(data => {
      dataParser(data.results);

      const currentPage = data.page;
      const maxPage = data.total_pages;

      buttonLocker(currentPage, maxPage);
    });
  }

  function updatePageNumber(num) {
    const pageNumber = refs.listControls.querySelector('.page-number-value');
    pageNumber.textContent = num;
  }

  function buttonLocker(currentPage, maxPage) {
    const prevBtn = buttonsArrRef[0];
    const nextBtn = buttonsArrRef[1];

    updatePageNumber(currentPage, maxPage);

    if (currentPage === 1) {
      prevBtn.disabled = true;
      nextBtn.disabled = false;

      prevBtn.classList.remove('control-btn');
      prevBtn.classList.add('non-visible');

      nextBtn.classList.remove('non-visible');
      nextBtn.classList.add('control-btn');
    } else if (currentPage === maxPage) {
      prevBtn.disabled = false;
      nextBtn.disabled = true;

      nextBtn.classList.remove('control-btn');
      nextBtn.classList.add('non-visible');

      prevBtn.classList.remove('non-visible');
      prevBtn.classList.add('control-btn');
    } else {
      nextBtn.disabled = false;
      prevBtn.disabled = false;

      prevBtn.classList.remove('non-visible');
      nextBtn.classList.remove('non-visible');
      prevBtn.classList.add('control-btn');
      nextBtn.classList.add('control-btn');
    }
  }
}

export default MainPage;

import MainPageTemplate from '../templates/Main.hbs';
import listTemplate from '../templates/movieListItem.hbs';

import tmdbApi from '../services/apiRequestMain';

import { ROOT_DOM } from '../constants';

function MainPage() {
  function renderBaseMarkup() {
    const markup = MainPageTemplate();
    ROOT_DOM.innerHTML = markup;
  }
  renderBaseMarkup();


  const refs = {
    inputForm: document.querySelector('#search-form'),
    moviesList: document.querySelector('.films-list'),
    listControls: document.querySelector('.list-controls'),
  };
  
  refs.inputForm.addEventListener('submit', inputFormHandler);
  refs.listControls.addEventListener('click', litsControlsHandler);
  
  const buttonsArrRef = refs.listControls.querySelectorAll('button');
  buttonsArrRef.forEach(btn => (btn.disabled = true));
  
  function inputFormHandler(e) {
    e.preventDefault();
  
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
      // renderMoviesListData(data.results);
      dataParser(data.results);
  
      buttonsArrRef[1].disabled = false;
    });
  }
  
  function clearMoviesList() {
    refs.moviesList.innerHTML = '';
  }
  
  function dataParser(array) {
    const newArray = array.map(el => {
      const newObj = {
        id: el.id,
        original_title: el.original_title,
        poster_path: el.poster_path,
        title: el.title,
        release_date:
          el.release_date === undefined
            ? 'unknown'
            : el.release_date.substr(0, 4),
        havePoster: el.poster_path ? true : false,
        vote_average: el.vote_average,
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
    const actionType = e.target.dataset.action;
  
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
    const pageNumber = refs.listControls.querySelector('span');
    pageNumber.textContent = num;
  }
  
  function buttonLocker(currentPage, maxPage) {
    const prevBtn = buttonsArrRef[0];
    const nextBtn = buttonsArrRef[1];
  
    updatePageNumber(currentPage);
  
    if (currentPage === 1) {
      nextBtn.disabled = false;
      prevBtn.disabled = true;
    } else if (currentPage === maxPage) {
      prevBtn.disabled = false;
      nextBtn.disabled = true;
    } else {
      nextBtn.disabled = false;
      prevBtn.disabled = false;
    }
  }



}

export default MainPage;

import MainPageTemplate from '../templates/main.hbs';
import { ROOT_DOM } from '../constants';

const MainPage = () => {
  render();
  addEventListeners();
}

const render = () => {
  ROOT_DOM.innerHTML = MainPageTemplate();
}

const addEventListeners = () => {
  const filmLink = document.querySelector('a');

  filmLink.addEventListener('click', navigateToFilmPage)
}

const navigateToFilmPage = (event) => {
  event.preventDefault();
  window['router'].navigate(event.target.getAttribute('href'));
}

export default MainPage;

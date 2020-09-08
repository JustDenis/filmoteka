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
  document.querySelector('a').addEventListener('click', e => {
    e.preventDefault();

    window['router'].navigate(e.target.getAttribute('href'));
  })
}

export default MainPage;

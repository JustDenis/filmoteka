import './styles.css';
import './styles/mainPage.css'

import Router from './utilites/router';

import MainPage from './pages/mainPage';
import FilmPage from './pages/filmDetailPage';

window['router'] = new Router({
  root: '/',
  routes: [
    {
      path: /film\/(.*)/,
      callback: () => {
        FilmPage()
      },
    },
    {
      path: '',
      callback: () => {
        MainPage();
      }
    }],

});

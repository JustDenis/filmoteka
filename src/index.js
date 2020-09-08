import './styles.css';

import Router from './utilites/router';

import MainPage from './pages/main';
import FilmPage from './pages/film';

window['router'] = new Router({
  root: '/',
  routes: [
    {
      path: /film\/(.*)/,
      callback: (id) => {
        FilmPage(id)
      },
    },
    {
      path: 'main',
      callback: () => {
        MainPage();
      }
    }],
  error: {
    callback: () => {
      console.log('404')
    }
  }
});

import './styles.css';
import './styles/library.css';
import './styles/mainPage.css';
import './styles/FilmPage.css';
import './styles/desktopHeaderFooter.css';
import './styles/mobileHeaderFooter.css';
import './styles/tabletHeaderFooter.css';
import Router from './utilites/router';
import MainPage from './pages/mainPage';
import FilmPage from './pages/filmDetailPage';
import libraryPage from './pages/libraryPage.js';
import './utilites/scrollToTop';
import './utilites/navigation';


window['router'] = new Router({
  root: '/',
  routes: [
    {
      path: /film\/(.*)/,
      callback: () => {
        FilmPage();
      },
    },
    {
      path: 'library/watched',
      callback: () => {
        libraryPage();
      },
    },
    {
      path: 'library/queue',
      callback: () => {
        libraryPage();
      },
    },
    {
      path: '',
      callback: () => {
        MainPage();
      },
    },
  ],
});

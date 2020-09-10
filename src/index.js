import './styles.css';
import './styles/mainPage.css';
import './styles/FilmPage.css';
import './styles/desktopHeaderFooter.css';
import './styles/mobileHeaderFooter.css';
import './styles/tabletHeaderFooter.css';
import Router from './utilites/router';
import MainPage from './pages/mainPage';
import FilmPage from './pages/filmDetailPage';
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
      path: '/library/watched',
      callback: () => {
      
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

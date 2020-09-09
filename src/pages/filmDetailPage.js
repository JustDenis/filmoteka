import FilmPageTemplate from '../templates/Film.hbs';
import { ROOT_DOM } from '../constants';

const FilmPage = () => {
  const markup = FilmPageTemplate();

  ROOT_DOM.innerHTML = markup;
}

export default FilmPage;

import FilmPageTemplate from '../templates/Film.hbs';
import apiRequestFilm from '../services/apiRequestFilm';
import notFound from '../images/NotFoundActor.png';
import { ROOT_DOM } from '../constants';

const FilmPage = () => {
  let markup;
  apiRequestFilm().then(data => {
    const {title, poster_path, release_date, vote_average, vote_count, popularity, genres, overview} = data;
    console.log(data);
    const filmObject = {
      img: poster_path !== null? `https://image.tmdb.org/t/p/original${poster_path}` : notFound,
      title,
      year: release_date.substr(0,4),
      vote: vote_average,
      votes: vote_count,
      popularity, 
      genres: genres.map(genre => genre.name),
      overview
    };
    markup = FilmPageTemplate(filmObject);
    ROOT_DOM.innerHTML = markup;
  })
}

export default FilmPage;

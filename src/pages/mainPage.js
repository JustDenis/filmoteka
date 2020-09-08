import MainPageTemplate from '../templates/Main.hbs';
import { ROOT_DOM } from '../constants';



const MainPage = () => {
  render();
}

const render = () => {
  ROOT_DOM.innerHTML = MainPageTemplate();
}






export default MainPage;

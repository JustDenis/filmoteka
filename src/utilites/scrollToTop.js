export default window.onscroll = function buttonUp() {
  document.querySelector('.btnup').style.display =
    window.pageYOffset > '200' ? 'block' : 'none';
};

const buttonUp = document.querySelector('.btnup');
buttonUp.addEventListener('click', scrolling);

function scrolling(e){
    window.scrollTo(
      {
        top: 0,
        behavior: 'smooth',
      });
   };

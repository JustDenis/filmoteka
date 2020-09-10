export default window.onscroll = function buttonUp() {
  document.querySelector('.btnup').style.display =
    window.pageYOffset > '200' ? 'block' : 'none';
};

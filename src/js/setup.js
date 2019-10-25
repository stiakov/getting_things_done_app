import fav from '../img/favicon.ico';

export default setup = {
  counterProj: 0,
  counterTask: 0,

  setFavicon: () => {
    const setFav = document.getElementById('favicon');
    setFav.href = fav;
  }
};

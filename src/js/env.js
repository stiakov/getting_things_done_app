import fav from '../img/favicon.ico'
import {compareAsc, format} from 'date-fns'

const setup = {
  setFavicon: (() => {
    const setFav = document.getElementById('favicon');
    setFav.href = fav;
  })(),
  getDateNow: (() => {
    const date = format(new Date(), 'yyyy-MM-dd');
    return date.split('-');
  })(),
  getMainContainer: () => {
    return document.getElementById('main-container');
  },
  setLayout: (() => {
    const colContainer = document.createElement('div');
    colContainer.className = 'ui three column grid container';
    for (let i = 0; i < 3; i += 1) {
      const col = Object.assign(document.createElement('div'), {className: 'column'}, {id: 'col' + (i + 1) });
      colContainer.appendChild(col);
    }
    document.getElementById('main-container').appendChild(colContainer);
  })(),
};

const env = {};

export default env;

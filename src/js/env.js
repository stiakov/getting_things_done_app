import fav from '../img/favicon.ico'
import {compareAsc, format} from 'date-fns'

const tag = {
  getMainContainer: () => {
    return document.getElementById('main-container');
  },

  getColContainer: () => {
    return document.createElement('div');
  },
};

const createColumn = () => {
  const counter = 1;
  const col = Object.assign(document.createElement('div'), { className: 'column' }, { id: 'col' + ( counter + 1) });
  tag.getColContainer().appendChild(col);
};

const setup = {
  setFavicon: (() => {
    const setFav = document.getElementById('favicon');
    setFav.href = fav;
  })(),

  getDateNow: (() => {
    const date = format(new Date(), 'yyyy-MM-dd');
    return date.split('-');
  })(),

  setLayout: (() => {
    const colContainer = document.createElement('div');
    colContainer.className = 'ui three columns grid container';
    createColumn();
  })(),
};

const cards = {
   layoutCardColumns: (() => {
     const cols = document.getElementsByClassName('column');
       console.log(cols);
     for (const item in cols) {
       const card = Object.assign(document.createElement('div'), { className: 'ui card' });
       const content = Object.assign(document.createElement('div'), { className: 'content' });
       const header = Object.assign(document.createElement('div'), { className: 'header' }, { content: 'Task Example'});
       card.appendChild(content);
       content.appendChild(header);
       tag.getColContainer().appendChild(card);
     }

   })(),

};

const env = {};

export default env;

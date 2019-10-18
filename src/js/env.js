import { compareAsc, format } from 'date-fns';
import fav from '../img/favicon.ico';

const tag = {
  getMainContainer: () => document.getElementById('main-container'),

  getColContainer: () => document.getElementById('colContainer')
};

let counter = 1;
const createColumn = () => {
  const col = Object.assign(
    document.createElement('div'),
    { className: 'column' },
    { id: `col${counter}` }
  );
  counter += 1;
  tag.getColContainer().appendChild(col);
  cards.layoutCardColumns(col);
};

const setup = {
  setFavicon: () => {
    const setFav = document.getElementById('favicon');
    setFav.href = fav;
  },

  getDateNow: () => {
    const date = format(new Date(), 'yyyy-MM-dd');
    return date.split('-');
  },

  setLayout: () => {
    const colContainer = document.createElement('div');
    Object.assign(colContainer, { className: 'ui width centered grid' }, { id: 'colContainer' });
    tag.getMainContainer().appendChild(colContainer);
    createColumn();
  }
};

const cards = {
  layoutCardColumns: (column) => {

    const card = Object.assign(document.createElement('div'),  { className: 'ui card' });
    const content = Object.assign(document.createElement('div'), { className: 'content' });
    const header = Object.assign(
      document.createElement('div'),
      { className: 'header' },
      { innerText: 'Task Example' }
    );
    card.appendChild(content);
    content.appendChild(header);
    column.appendChild(card);
  }
};
const init = () => {
  setup.setFavicon();
  setup.setLayout();
};

init();

const env = {};

export default env;

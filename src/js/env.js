import { compareAsc, format } from 'date-fns';
import fav from '../img/favicon.ico';

const tag = {
  getMainContainer: () => document.getElementById('main-container'),

  getColContainer: () => document.createElement('div')
};

const createColumn = () => {
  const counter = 1;
  const col = Object.assign(
    document.createElement('div'),
    { className: 'column' },
    { id: `col${counter + 1}` }
  );
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
    const main = tag.getMainContainer();
    main.appendChild(colContainer);
    createColumn();
  })()
};

const cards = {
  layoutCardColumns: (() => {
    const cols = document.getElementsByClassName('column');
    createColumn();
    for (const item in cols) {
      const card = Object.assign(document.createElement('div'), {
        className: 'ui card'
      });
      const content = Object.assign(document.createElement('div'), {
        className: 'content'
      });
      const header = Object.assign(
        document.createElement('div'),
        { className: 'header' },
        { content: 'Task Example' }
      );
      card.appendChild(content);
      content.appendChild(header);
      const a = tag.getMainContainer();
      a.appendChild(card);
    }
  })()
};

const env = {};

export default env;

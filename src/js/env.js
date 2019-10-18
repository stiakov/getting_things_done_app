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
    Object.assign(colContainer, { className: 'ui equal width grid' }, { id: 'colContainer' });
    tag.getMainContainer().appendChild(colContainer);
    createColumn();
  }
};

const cards = {
  layoutCardColumns: (column) => {
    const segmentContainer = Object.assign(document.createElement('div'),  { className: 'ui segments' });
    const segment = Object.assign(document.createElement('div'),  { className: 'ui segment' });
    segmentContainer.appendChild(segment);

    const content = Object.assign(document.createElement('div'), { className: 'content' });
    const header = Object.assign(
      document.createElement('div'),
      { className: 'header' },
      { innerText: 'Project Name' }
    );
    const addButton = document.createElement('div');
    Object.assign(addButton,
      { className: 'ui green attached center aligned button' },
      { innerText: 'Add task' }
    );

    addButton.addEventListener('click', () => cards.loadModal());
    segment.appendChild(content);
    content.appendChild(header);
    segmentContainer.appendChild(cards.nestedSegments());
    segmentContainer.appendChild(addButton);
    column.appendChild(segmentContainer);
  },

  loadModal: () => {
    const modal =  document.createElement('div');
    modal.className = 'ui dimmer modals page transition visible active';

    tag.getMainContainer().appendChild(modal);

    const grid = document.createElement('div');
    grid.className = 'ui centered aligned grid';
    grid.style.height = '100%';

    const formContainer = document.createElement('div');
    grid.appendChild(formContainer);
    modal.appendChild(grid);
  },

  nestedSegments: () => {
    let counter = 0;
    const nestedContainer = Object.assign(document.createElement('div'),  { className: 'ui basic segments' });
    for (let i = 0; i < 3; i += 1) {
      const segment = Object.assign(document.createElement('div'),
        { className: 'ui segment' },
        {innerText: `Task ${counter += 1}`}
      );
      nestedContainer.appendChild(segment);
    }
    return nestedContainer;
  }
};
const init = () => {
  setup.setFavicon();
  setup.setLayout();
};

init();

const env = {};

export default env;

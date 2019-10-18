import { compareAsc, format } from 'date-fns';
import fav from '../img/favicon.ico';

const tag = {
  getMainContainer: () => document.getElementById('main-container'),

  getColContainer: () => document.getElementById('colContainer')
};

const setup = {
  counter: 1,

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
    Object.assign(colContainer, { className: 'ui equal width centered grid' }, { id: 'colContainer' });
    tag.getMainContainer().appendChild(colContainer);
    column.createColumn();
  }
};

const segmentGen = {
  nestedSegments: () => {
    let tasks = ['Setup repository', 'Update readme.md', 'Commit your changes'];
    const nestedContainer = Object.assign(document.createElement('div'),  { className: 'ui basic segments' });
    tasks.forEach((item) => {
      const segment = Object.assign(document.createElement('div'),
        { className: 'ui segment' },
        { innerText: item }
      );
      nestedContainer.appendChild(segment);
    });

    return nestedContainer;
  }
};

const modal = {
    formTask: () => {
      const fields = [
        {
          name: 'title',
          type: 'text',
          placeholder: 'Concise title',
          class: ''
        },
        {
          name: 'description',
          type: 'text',
          placeholder: 'Short description',
          class: ''
        },
        {
          name: 'dueDate',
          type: 'date',
          placeholder: 'Due Date',
          class: ''
        },
        {
          name: 'priority',
          type: 'checkbox',
          placeholder: 'mark this if it\'s Important?',
          class: ''
        },
      ];

      fields.forEach((input) => {

      });
    },
    newTask: () => {

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
}

const column = {
  createColumn: () => {
    const col = Object.assign(
      document.createElement('div'),
      { className: 'column project-container' },
      { id: `col${setup.counter}` }
    );
    setup.counter += 1;
    tag.getColContainer().appendChild(col);
    column.setProjSegment(col);
  },

  setProjSegment: (column) => {
    const segmentContainer = Object.assign(document.createElement('div'),  { className: 'ui segments' });
    const segment = Object.assign(document.createElement('div'),  { className: 'ui segment' });
    segmentContainer.appendChild(segment);

    const content = Object.assign(document.createElement('div'), { className: 'content' });
    const header = Object.assign(
      document.createElement('h2'),
      { className: 'header' },
      { innerText: 'Super-secret project' }
    );
    const addButton = document.createElement('div');
    Object.assign(addButton,
      { className: 'ui green attached center aligned button' },
      { innerText: 'Add task' }
    );

    addButton.addEventListener('click', () => column.loadModal());
    segment.appendChild(content);
    content.appendChild(header);
    segmentContainer.appendChild(segmentGen.nestedSegments());
    segmentContainer.appendChild(addButton);
    column.appendChild(segmentContainer);
  },

};

const init = () => {
  setup.setFavicon();
  setup.setLayout();
};

init();

const env = {};

export default env;

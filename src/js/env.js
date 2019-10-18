import { compareAsc, format } from 'date-fns';
import fav from '../img/favicon.ico';

const tag = {
  getMainContainer: () => document.getElementById('main-container'),

  getColContainer: () => document.getElementById('colContainer'),

  getFormContainer: () => document.getElementById('cardCont')
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
    Object.assign(
      colContainer,
      { className: 'ui equal width centered grid' },
      { id: 'colContainer' }
    );
    tag.getMainContainer().appendChild(colContainer);
    column.createColumn();
  }
};

const segmentGen = {
  nestedSegments: () => {
    let tasks = ['Setup repository', 'Update readme.md', 'Commit your changes'];
    const nestedContainer = Object.assign(document.createElement('div'), {
      className: 'ui basic segments'
    });
    tasks.forEach(item => {
      const segment = Object.assign(
        document.createElement('div'),
        { className: 'ui segment' },
        { innerText: item }
      );
      nestedContainer.appendChild(segment);
    });

    return nestedContainer;
  }
};

const formTask = () => {
  const fields = [
    {
      name: 'Title',
      type: 'text',
      placeholder: 'Concise title'
    },
    {
      name: 'Description',
      type: 'text',
      placeholder: 'Short description'
    },
    {
      name: 'Due date',
      type: 'date',
      placeholder: 'Due Date'
    },
    {
      name: 'Priority',
      type: 'checkbox',
      placeholder: "mark this if it's Important"
    }
  ];

  fields.forEach(input => {
    const typeChecker = input.type === 'checkbox' ? 'span' : 'label';
    const label = Object.assign(
      document.createElement(typeChecker),
      {
        innerText: input.name
      },
      { className: 'ui left aligned tiny header' }
    );
    const nameField = Object.assign(
      document.createElement('input'),
      { type: input.type },
      { placeholder: input.placeholder },
      { className: 'field' }
    );
    if (typeChecker === 'span') {
      label.appendChild(nameField);
      tag.getFormContainer().appendChild(label);
    } else {
      tag.getFormContainer().appendChild(label);
      tag.getFormContainer().appendChild(nameField);
    }
  });
  const btn = Object.assign(
    document.createElement('button'),
    { className: 'ui green button' },
    { innerText: 'Submit task' }
  );
  tag.getFormContainer().appendChild(btn);
};

const modal = {
  newTask: () => {},
  loadModal: () => {
    const modalCont = document.createElement('div');
    modalCont.className = 'ui dimmer modals page transition visible active';

    tag.getMainContainer().appendChild(modalCont);

    const card = addCard.createCard();
    const grid = document.createElement('div');
    grid.className = 'ui centered aligned grid';
    grid.style.height = '100%';

    const formContainer = document.createElement('div');
    card.appendChild(formContainer);
    Object.assign(formContainer, { id: 'test' }, { className: 'ui form' });
    grid.appendChild(card);
    modalCont.appendChild(grid);
    formTask();
  }
};

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

  setProjSegment: column => {
    const segmentContainer = Object.assign(document.createElement('div'), {
      className: 'ui segments'
    });
    const segment = Object.assign(document.createElement('div'), {
      className: 'ui segment'
    });
    segmentContainer.appendChild(segment);

    const content = Object.assign(document.createElement('div'), {
      className: 'content ui form'
    });
    const header = Object.assign(
      document.createElement('h2'),
      { className: 'header' },
      { innerText: 'Super-secret project' }
    );
    const addButton = document.createElement('div');
    Object.assign(
      addButton,
      { className: 'ui green attached center aligned button' },
      { innerText: 'Add task' }
    );

    addButton.addEventListener('click', () => modal.loadModal());
    segment.appendChild(content);
    content.appendChild(header);
    segmentContainer.appendChild(segmentGen.nestedSegments());
    segmentContainer.appendChild(addButton);
    column.appendChild(segmentContainer);
  }
};

const addCard = {
  createCard: () => {
    const mainCard = Object.assign(document.createElement('div'), {
      className: 'ui card'
    });
    const cardHeader = Object.assign(
      document.createElement('div'),
      { className: 'ui medium header extra-space' },
      { innerText: 'Write your task' }
    );
    const cardSub = Object.assign(
      document.createElement('div'),
      { className: 'meta' },
      { innerText: 'Project demo' }
    );
    const cardContent = Object.assign(
      document.createElement('div'),
      {
        className: 'content ui form'
      },
      { id: 'cardCont' }
    );
    mainCard.appendChild(cardHeader);
    mainCard.appendChild(cardSub);
    mainCard.appendChild(cardContent);
    return mainCard;
  }
};

const init = () => {
  setup.setFavicon();
  setup.setLayout();
};

init();

const env = {};

export default env;

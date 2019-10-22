import { format } from 'date-fns';
import fav from '../img/favicon.ico';
import systemManager from './logic';
const sm = systemManager;

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
  addTasktoProject: (project, task) => {},
  nestedSegments: () => {
    const tasks = [
      'Setup repository',
      'Update readme.md',
      'Commit your changes'
    ];
    const nestedContainer = Object.assign(document.createElement('div'), {
      className: 'ui basic segments'
    });
    tasks.forEach((item) => {
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

const completedForm = () => {
  const mod = document.getElementById('modal');
  mod.parentNode.removeChild(mod);
};
const formTask = () => {
  const fields = [
    {
      name: 'Title',
      type: 'text',
      id: 'task-title',
      placeholder: 'Concise title'
    },
    {
      name: 'Description',
      type: 'text',
      id: 'task-description',
      placeholder: 'Short description'
    },
    {
      name: 'Due date',
      type: 'date',
      id: 'task-date',
      placeholder: 'Due Date'
    },
    {
      name: 'High priority?',
      type: 'checkbox',
      id: 'task-priority',
      placeholder: ''
    }
  ];

  fields.forEach((input) => {
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
      { className: 'field' },
      { id: input.id }
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
    { className: 'ui button btn-style' },
    { innerText: 'Submit task' },
    { id: 'submit-task' }
  );
  btn.addEventListener('click', () => {
    task.addTask();
    completedForm();
  });
  tag.getFormContainer().appendChild(btn);
};

const task = {
  addTask: () => {
    const task_title = document.getElementById('task-title').value;
    const task_description = document.getElementById('task-description').value;
    const task_date = document.getElementById('task-date').value;
    const task_priority = document.getElementById('task-priority').checked;
    const itm = sm.todoItem(
      2,
      task_title,
      task_description,
      task_date,
      task_priority
    );
    console.log('objeto: ' + JSON.stringify(itm));
  }
};

const modal = {
  removeModal: () => {
    const mod = document.getElementById('modal');
    document.body.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        tag.getMainContainer().removeChild(mod);
      }
    });
  },
  loadModal: (tempcard) => {
    const modalCont = document.createElement('div');
    modalCont.className = 'ui dimmer modals page transition visible active';
    modalCont.id = 'modal';

    tag.getMainContainer().appendChild(modalCont);

    const card = tempcard;
    const grid = document.createElement('div');
    grid.className = 'ui centered aligned grid';
    grid.style.height = '100%';
    const formContainer = document.createElement('div');
    card.appendChild(formContainer);
    grid.appendChild(card);
    modalCont.appendChild(grid);

    modal.removeModal();
  }
};

const formProject = () => {
  const projectFormContainer = document.createElement('div');

  const projectName = Object.assign(
    document.createElement('input'),
    { type: 'text' },
    { placeholder: 'Name your project' },
    { id: 'project-name' }
  );
  const btnProject = Object.assign(
    document.createElement('button'),
    { className: 'ui button btn-style extra-space' },
    { innerText: 'Create Project' },
    { id: 'btn-createProject' }
  );
  tag.getFormContainer().appendChild(projectFormContainer);
  projectFormContainer.appendChild(projectName);
  projectFormContainer.appendChild(btnProject);

  btnProject.addEventListener('click', () => {
    const newProject = document.getElementById('project-name').value;
    const temp = sm.ProjectManager.newProject(setup.counter, newProject);
    completedForm();
    localStorage.setItem(setup.counter, JSON.stringify(temp));
    console.log(temp);
    column.createColumn();
  });
};
const btn_navbar = document.getElementById('btn-project');
btn_navbar.addEventListener('click', () => {
  const projectCard = addCard.createCard('New Project', 'Start a new project');
  modal.loadModal(projectCard);
  formProject();
});

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

    let storage = localStorage.getItem(setup.counter - 1);
    const projectName =
      storage === null ? 'Super secret project' : JSON.parse(storage).name;

    const header = Object.assign(
      document.createElement('h2'),
      { className: 'header' },
      { innerText: projectName }
    );

    const addButton = document.createElement('div');
    Object.assign(
      addButton,
      { className: 'ui attached center aligned button btn-style' },
      { innerText: 'Add task' }
    );

    addButton.addEventListener('click', () => {
      const taskCard = addCard.createCard(
        'Create a new task',
        'Add a new task here'
      );
      modal.loadModal(taskCard);
      formTask();
    });
    segment.appendChild(content);
    content.appendChild(header);
    segmentContainer.appendChild(segmentGen.nestedSegments());
    segmentContainer.appendChild(addButton);
    column.appendChild(segmentContainer);
  }
};

const addCard = {
  createCard: (header, sub) => {
    const mainCard = Object.assign(document.createElement('div'), {
      className: 'ui card'
    });
    const cardHeader = Object.assign(
      document.createElement('div'),
      { className: 'ui medium header extra-space' },
      { innerText: header }
    );
    const cardSub = Object.assign(
      document.createElement('div'),
      { className: 'meta' },
      { innerText: sub }
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

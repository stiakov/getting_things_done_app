import { format } from 'date-fns';
import fav from '../img/favicon.ico';
import systemManager from './logic';
import form from "./forms";
import { column } from './projectLayout';
import { addCard } from './projectLayout';


const sm = systemManager;

export const tag = {
  getMainContainer: () => document.getElementById('main-container'),

  getColContainer: () => document.getElementById('colContainer'),

  getFormContainer: () => document.getElementById('cardCont')
};

export const setup = {
  counterProj: 1,
  counterTask: 1,

  setFavicon: () => {
    const setFav = document.getElementById('favicon');
    setFav.href = fav;
  },

  getDateNow: () => {
    const date = format(new Date(), 'yyyy-MM-dd');
    return date.split('-');
  },

  setLayout: () => {
    const btn_navbar = document.getElementById('btn-project');

    btn_navbar.addEventListener('click', () => {
      const projectCard = addCard.createCard('New Project', 'Start a new project');
      modal.loadModal(projectCard);
      form.newProject();
    });
    const colContainer = document.createElement('div');
    Object.assign(
      colContainer,
      { className: 'ui equal width centered grid' },
      { id: 'colContainer' }
    );
    tag.getMainContainer().appendChild(colContainer);
    setup.getLocalSt();
  },
  getLocalSt: () => {
    if (localStorage.length < 1) {
      modal.userGuide();
    } else {
      const projects = [];
      const keys = Object.keys(localStorage);

      keys.forEach((key) => {
        const proj = JSON.parse(localStorage.getItem(key));
        column.createColumn('localSt', proj);
      });
    }
  }
};

export const task = {
  addTask: (project) => {
    const task_title = document.getElementById('task-title').value;
    const task_description = document.getElementById('task-description').value;
    const task_date = document.getElementById('task-date').value;
    const task_priority = document.getElementById('task-priority').checked;
    const itm = sm.todoItem(
      task_title,
      task_description,
      task_date,
      task_priority
    );
    console.log('objeto: ' + JSON.stringify(itm));
  }
};

export const modal = {
  removeModal: () => {
    const mod = document.getElementById('modal');
    document.body.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        tag.getMainContainer().removeChild(mod);
      }
    });
    // document.addEventListener('click', () =>  tag.getMainContainer().removeChild(mod));
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
  },
  userGuide: () => {
    const modalGuide = document.createElement('div');
    modalGuide.className = 'ui dimmer modals page transition visible active';
    modalGuide.id = 'modalGuide';
    modalGuide.style.marginTop = '50px';
    const arrowCont = document.createElement('div');
    arrowCont.id = 'arrow-text';
    modalGuide.appendChild(arrowCont);

    tag.getMainContainer().appendChild(modalGuide);
    addEventListener('keydown', () => {
      tag.getMainContainer().removeChild(modalGuide);
    });
    addEventListener('click', () => {
      tag.getMainContainer().removeChild(modalGuide);
    });
  }
};

const init = () => {
  setup.setFavicon();
  setup.setLayout();
};

init();


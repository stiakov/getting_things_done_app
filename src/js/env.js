import {format} from 'date-fns';
import fav from '../img/favicon.ico';
import systemManager from './logic';
import form from './forms';
import {column} from './projectLayout';
import {addCard} from './projectLayout';

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
      const projectCard = addCard.createCard(
        'New Project',
        'Start a new project',
        setup.counterProj
      );
      modal.loadModal(projectCard);
      let modalGuide = document.getElementById('modalGuide');
      if (modalGuide) tag.getMainContainer().removeChild(modalGuide);
      modalGuide = null;
      form.newProject();
    });
    const colContainer = document.createElement('div');
    Object.assign(
      colContainer,
      {className: 'ui equal width centered grid'},
      {id: 'colContainer'}
    );
    tag.getMainContainer().appendChild(colContainer);
    setup.getLocalSt();
  },
  getLocalSt: () => {
    if (localStorage.length < 1) {
      modal.userGuide();
    } else {
      const keys = Object.keys(localStorage);
      setup.counterProj = localStorage.length + 1;

      keys.forEach((key) => {
        const proj = JSON.parse(localStorage.getItem(key));
        column.createColumn('localSt', proj);
        setup.counterTask += proj.tasks.length;
        console.log(setup.counterTask);
      });
    }
  }
};

export const task = {
  addTask: (from, idProject) => {
    let task_id = setup.counterTask;
    const task_title = document.getElementById('task-title').value;
    const task_description = document.getElementById('task-description').value;
    const task_date = document.getElementById('task-date').value;
    const itm = sm.todoItem(
      task_id,
      task_title,
      task_description,
      task_date,
    );
    const proj = JSON.parse(localStorage.getItem(idProject));

    console.log('tasks->' + proj.tasks);
    if (from === 'new') {
      proj.tasks.push(itm);
    } else {
      itm.id -= 1;
      let idx;
      for (let i = 0; i < proj.tasks.length; i += 1) {
        if (proj.tasks[i].id === itm.id) {
          idx = i;
          break;
        }
      }
      proj.tasks.splice(1, idx - 1, itm)
    }
    setup.counterTask += 1;
    task.displayTask(from, idProject, itm);
    localStorage.setItem(idProject, JSON.stringify(proj));
  },

  displayTask: (from, idProject, item) => {
    const nestedContainer = document.getElementById(idProject);
    if (from === 'new') {
      const segmentCont = task.cardLoad(idProject, item);
      nestedContainer.appendChild(segmentCont);
    } else {
      const oldCard = document.getElementById(`sg-${item.id}`);
      const content = oldCard.firstChild;
      const children = content.childNodes;
      children[0].innerText = item.title;
      children[1].innerText = item.description;
      children[2].innerText = item.dueDate;
    }
  },
  cardLoad: (idProject, item) => {
    const segmentCont = Object.assign(
      document.createElement('div'),
      {
        className: 'ui segment card'
      },
      {id: `sg-${item.id}`}
    );
    const segment = Object.assign(document.createElement('div'), {
      className: 'content'
    });

    const segmentTitle = Object.assign(
      document.createElement('div'),
      {className: 'ui header medium'},
      {innerText: item.title}
    );
    const segmentDescription = Object.assign(
      document.createElement('div'),
      {className: 'content'},
      {innerText: item.description}
    );
    const segmentDate = Object.assign(
      document.createElement('div'),
      {className: 'meta'},
      {innerText: item.dueDate}
    );
    const segmentBtnCont = Object.assign(
      document.createElement('div'),
      {className: 'meta'},
      {id: `btns-${idProject}`}
    );
    const btnEdit = Object.assign(
      document.createElement('button'),
      {className: 'button btn-style'},
      {innerText: 'Edit'}
    );
    const btnDelete = Object.assign(
      document.createElement('button'),
      {className: 'button btn-style'},
      {innerText: 'Delete'}
    );

    btnDelete.addEventListener('click', () => {
      task.btnDeleteBehaviour(idProject, item);
    });

    btnEdit.addEventListener('click', () => {
      const data = JSON.stringify(item);
      const taskCard = addCard.createCard(
        'Edit your task',
        '',
        idProject
      );
      modal.loadModal(taskCard);
      form.newTask(data);
    });

    segmentCont.appendChild(segment);
    segment.appendChild(segmentTitle);
    segment.appendChild(segmentDescription);
    segment.appendChild(segmentDate);
    segment.appendChild(segmentBtnCont);
    segmentBtnCont.appendChild(btnEdit);
    segmentBtnCont.appendChild(btnDelete);
    return segmentCont;
  },
  btnDeleteBehaviour: (idProject, item) => {
    let tempData = JSON.parse(localStorage.getItem(idProject));
    let tempFilter = tempData.tasks.filter((task) => task.id !== item.id);
    tempData.tasks = tempFilter;
    localStorage.setItem(idProject, JSON.stringify(tempData));
    const principal = document.getElementById(`sg-${item.id}`);
    principal.parentElement.removeChild(principal);
  }
};

export const modal = {
  removeModal: () => {
    let mod = document.getElementById('modal');
    document.body.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        if (mod) tag.getMainContainer().removeChild(mod);
      }
      mod = undefined;
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

    modalGuide.addEventListener('click', () => {
      tag.getMainContainer().removeChild(modalGuide);
    });
  }
};

const init = () => {
  setup.setFavicon();
  setup.setLayout();
};

init();

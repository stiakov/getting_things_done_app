import form from "./forms";
import {tag} from "./env";
import {setup} from "./env"
import {modal} from "./env"

export const segmentGen = {
  addTasktoProject: (project, task) => {
  },
  emptySegments: () => {
    const nestedContainer = Object.assign(document.createElement('div'), {
      className: 'ui basic segments'
    });
    const segment = Object.assign(
      document.createElement('div'),
      {className: 'ui segment'},
      {innerText: item}
    );
    nestedContainer.appendChild(segment);
    return nestedContainer;
  },
  nestedSegments: (tasks) => {

    const nestedContainer = Object.assign(document.createElement('div'), {
      className: 'ui basic segments'
    });
    tasks.forEach((item) => {
      const segment = Object.assign(
        document.createElement('div'),
        {className: 'ui segment'},
        {innerText: JSON.stringify(item)}
      );
      nestedContainer.appendChild(segment);
    });

    return nestedContainer;
  }
};

export const column = {
  createColumn: (from, project) => {
    const col =  Object.assign(
      document.createElement('div'),
      { className: 'column project-container' },
      { id: `col-${project.id }`}
    );
    if (from === 'newProjButton') {
      Object.assign(col, { id: `col-${setup.counterProj}` });
    } else {
      Object.assign(col, { id: `col-${project.id}` });
    }
    tag.getColContainer().appendChild(col);
    column.setProjSegment(from, col, project);
  },

  setProjSegment: (from, column, objProject) => {

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
      {className: 'header'},
    );

    const addButton = document.createElement('div');
    Object.assign(
      addButton,
      {className: 'ui attached center aligned button btn-style'},
      {innerText: 'Add task'},
    );

    if (from === 'newProjButton') {
      header.innerText = objProject;
      addButton.id = `newTaskBtn-${setup.counterProj}`;
    } else {
      header.innerText = objProject.name;
      addButton.id = `newTaskBtn-${objProject.id}`;
    }



    addButton.addEventListener('click', () => {
      const taskCard = addCard.createCard(
        'Create a new task',
        'Add a new task here'
      );
      modal.loadModal(taskCard);
      form.newTask();
    });
    segment.appendChild(content);
    content.appendChild(header);
    if (from === 'localSt') {
      segmentContainer.appendChild(segmentGen.nestedSegments(Object.values(objProject.tasks)));

    }
    segmentContainer.appendChild(addButton);
    column.appendChild(segmentContainer);
    setup.counterProj += 1;
  }
};

export const addCard = {
  createCard: (header, sub) => {
    const mainCard = Object.assign(document.createElement('div'), {
      className: 'ui card'
    });
    const cardHeader = Object.assign(
      document.createElement('div'),
      {className: 'ui medium header extra-space'},
      {innerText: header}
    );
    const cardSub = Object.assign(
      document.createElement('div'),
      {className: 'meta'},
      {innerText: sub}
    );
    const cardContent = Object.assign(
      document.createElement('div'),
      {
        className: 'content ui form'
      },
      {id: 'cardCont'}
    );
    mainCard.appendChild(cardHeader);
    mainCard.appendChild(cardSub);
    mainCard.appendChild(cardContent);
    return mainCard;
  }
};
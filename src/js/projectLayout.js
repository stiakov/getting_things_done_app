import form from "./forms";
import {tag} from "./env";
import {setup} from "./env"
import {modal} from "./env"

export const segmentGen = {
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

export const column = {
  createColumn: () => {
    const col = Object.assign(
      document.createElement('div'),
      { className: 'column project-container' },
      { id: `col-${setup.counterProj}` }
    );
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

    let storage = localStorage.getItem(setup.counterProj);
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
      { innerText: 'Add task' },
      {id: `newTaskBtn-${setup.counterProj}` }
    );

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
    segmentContainer.appendChild(segmentGen.nestedSegments());
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
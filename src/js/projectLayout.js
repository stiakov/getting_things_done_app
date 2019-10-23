import form from './forms';
import { tag } from './env';
import { setup } from './env';
import { modal } from './env';

export const segmentGen = {
  emptySegments: (idParent) => {
    const nestedContainer = Object.assign(document.createElement('div'), {
      className: 'ui basic segments'
    });
    const segment = Object.assign(
      document.createElement('div'),
      {
        className: 'ui basic segments'
      },
      { id: `segments-${idParent}` }
    );
    // tasks.forEach((item) => {
    //   const segment = Object.assign(
    //     document.createElement('div'),
    //     { className: 'ui segment' },
    //     { innerText: JSON.stringify(item) }
    //   );
    nestedContainer.appendChild(segment);
    // });

    return nestedContainer;
  },
  nestedSegments: (idProject, tasks) => {
    const nestedContainer = Object.assign(
      document.createElement('div'),
      {
        className: 'ui basic segments'
      },
      { id: idProject }
    );
    tasks.forEach((item) => {
      const segment = Object.assign(
        document.createElement('div'),
        { className: 'ui segment' },
        { innerText: JSON.stringify(item) }
      );
      nestedContainer.appendChild(segment);
    });

    return nestedContainer;
  }
};

export const column = {
  createColumn: (from, project) => {
    const col = Object.assign(document.createElement('div'), {
      className: 'column project-container'
    });
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

    const header = Object.assign(document.createElement('h2'), {
      className: 'header'
    });

    const addButton = document.createElement('div');
    Object.assign(
      addButton,
      { className: 'ui attached center aligned button btn-style' },
      { innerText: 'Add task' }
    );

    const idProj = from === 'newProjButton' ? setup.counterProj : objProject.id;
    addButton.id = `newTaskBtn-${idProj}`;

    segmentContainer.id = `segments-${column.id.split('-')[1]}`;
    if (from === 'newProjButton') {
      header.innerText = objProject;
    } else {
      header.innerText = objProject.name;
    }

    addButton.addEventListener('click', () => {
      const taskCard = addCard.createCard(
        'Create a new task',
        'Add a new task here',
        idProj
      );
      modal.loadModal(taskCard);
      form.newTask();
    });
    segment.appendChild(content);
    content.appendChild(header);
    if (from === 'localSt') {
      segmentContainer.appendChild(
        segmentGen.nestedSegments(idProj, Object.values(objProject.tasks))
      );
    } else {
      segmentGen.emptySegments(idProj);
    }
    segmentContainer.appendChild(addButton);
    column.appendChild(segmentContainer);
    setup.counterProj += 1;
  }
};

export const addCard = {
  createCard: (header, sub, idProject) => {
    const mainCard = Object.assign(
      document.createElement('div'),
      { className: 'ui card' },
      { id: idProject }
    );
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

    const esc = document.createElement('div');
    Object.assign(esc, { className: 'meta' }, { innerText: 'or press Escape to exit' });

    mainCard.appendChild(cardHeader);
    mainCard.appendChild(cardSub);
    mainCard.appendChild(cardContent);
    mainCard.appendChild(esc);

    return mainCard;
  }
};

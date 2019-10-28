const layout = {
  column: (project) => {
    const colContainer = document.getElementById('colContainer');
    const projectContainer = Object.assign(
      document.createElement('div'),
      { className: 'colum project-container' },
      { id: `col-${project.id}` }
    );
    const mainSegment = Object.assign(
      document.createElement('div'),
      { className: 'ui placeholder segments' },
      { id: `segments-${project.id}` }
    );
    const headerSegment = Object.assign(document.createElement('div'), {
      className: 'ui center aligned segment'
    });
    const headerContent = Object.assign(
      document.createElement('h2'),
      { className: 'header' },
      { innerText: project.name }
    );

    colContainer.appendChild(projectContainer);
    projectContainer.appendChild(mainSegment);
    mainSegment.appendChild(headerSegment);
    headerSegment.appendChild(headerContent);
    return colContainer;
  },
  taskProjectButton: (project) => {
    const mainSegmnt = document.getElementById(`segments-${project.id}`);
    const projectAddTaskBtn = Object.assign(
      document.createElement('div'),
      { className: 'ui attached center aligned button btn-style' },
      { id: `newTaskBtn-${project.id}` },
      { innerText: 'Add Task' }
    );
    mainSegmnt.appendChild(projectAddTaskBtn);
    return mainSegmnt;
  },
  task: (project) => {
    const mainSegmnt = document.getElementById(`segments-${project.id}`);

    const basicSeg = Object.assign(
      document.createElement('div'),
      { className: 'ui segment left-text' },
      { id: `sgc-${project.id}-${project.tasks[0].id}` }
    );
    const sgmCard = Object.assign(
      document.createElement('span'),
      { className: 'task-title' },
      { innerText: project.tasks[0].title }
    );
    const sgmDivider = Object.assign(document.createElement('div'), {
      className: 'ui clearing divider'
    });
    const contentDescription = Object.assign(
      document.createElement('div'),
      { className: 'content' },
      { innerText: project.tasks[0].description }
    );
    const contentDate = Object.assign(
      document.createElement('div'),
      { className: 'meta' },
      { innerText: project.tasks[0].date }
    );
    const contentButtons = Object.assign(
      document.createElement('div'),
      { className: 'meta' },
      { id: `btns-${project.tasks[0].id}` }
    );
    const deleteBtn = Object.assign(
      document.createElement('label'),
      { className: 'ui right icon label delete' },
      { id: `trash-${project.tasks[0].id}` },
      { innerText: 'Delete' }
    );
    const deleteIcon = Object.assign(document.createElement('i'), {
      className: 'trash alternate icon'
    });
    const editBtn = Object.assign(
      document.createElement('label'),
      { className: 'ui right icon label edit' },
      { id: `edit-${project.tasks[0].id}` },
      { innerText: 'Edit' }
    );
    const editIcon = Object.assign(document.createElement('i'), {
      className: 'edit icon'
    });
    const doneBtn = Object.assign(
      document.createElement('label'),
      { className: 'ui right icon label done' },
      { id: `check-${project.tasks[0].id}` },
      { innerText: 'Complete' }
    );
    const doneIcon = Object.assign(document.createElement('i'), {
      className: 'check circle icon'
    });
    mainSegmnt.appendChild(basicSeg);
    basicSeg.appendChild(sgmCard);
    basicSeg.appendChild(sgmDivider);
    basicSeg.appendChild(contentDescription);
    basicSeg.appendChild(contentDate);
    basicSeg.appendChild(contentButtons);
    contentButtons.appendChild(deleteBtn);
    contentButtons.appendChild(editBtn);
    contentButtons.appendChild(doneBtn);
    deleteBtn.appendChild(deleteIcon);
    editBtn.appendChild(editIcon);
    doneBtn.appendChild(doneIcon);
    return basicSeg;
  },
  taskForm: (project) => {
    const mainContainer = document.getElementById('main-container');
    const formSegment = Object.assign(document.createElement('div'), {
      className: 'ui segment'
    });
    const form = Object.assign(document.createElement('form'), {
      className: 'ui form'
    });

    const fields = [
      {
        name: 'Title',
        type: 'text',
        id: 'task-title',
        placeholder: 'Write a title for your task'
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
        placeholder: 'DD/MM/YYYY'
      }
    ];
    const checkboxes = [
      {
        name: 'High priority?',
        type: 'checkbox',
        id: 'task-priority'
      },
      {
        name: 'Done?',
        type: 'checkbox',
        id: 'task-status'
      }
    ];

    fields.forEach((input) => {
      const fieldCont = Object.assign(document.createElement('div'), {
        className: 'field'
      });
      const label = Object.assign(document.createElement('label'), {
        innerText: input.name
      });
      const nameField = Object.assign(
        document.createElement('input'),
        { type: input.type },
        { placeholder: input.placeholder },
        { name: input.name },
        { id: input.id }
      );
      fieldCont.appendChild(label);
      fieldCont.appendChild(nameField);
      return fieldCont;
    });

    checkboxes.forEach((input) => {
      const checkCont = Object.assign(document.createElement('div'), {
        className: 'field'
      });
      const checkField = Object.assign(document.createElement('div'), {
        className: 'ui checkbox'
      });
      const boxField = Object.assign(
        document.createElement('input'),
        { type: input.type },
        { id: input.id }
      );
      const checkLabel = Object.assign(document.createElement('label'), {
        innerText: input.name
      });
      fieldCont.appendChild(checkField);
      checkField.appendChild(boxField);
      checkField.appendChild(checkLabel);
      return checkCont;
    });
    const addTaskBtn = Object.assign(
      document.createElement('button'),
      { className: 'ui button' },
      { type: 'submit' },
      { id: `create-task-${project.id}` }
    );

    mainContainer.appendChild(formSegment);
    formSegment.appendChild(form);
    form.appendChild(fieldCont);
    form.appendChild(checkCont);
    form.appendChild(addTaskBtn);
  },
  loadModal: () => {
    const mainContainer = document.getElementById('main-container');
    const modal = Object.assign(document.createElement('div'), {
      className: 'ui dimmer modals page transition visible active'
    });
    const modalGrid = Object.assign(
      document.createElement('div'),
      { className: 'ui centered grid' },
      { style: 'margin-top:20vh' }
    );
    const card = Object.assign(document.createElement('div'), {
      className: 'ui card extra-space'
    });
    const cardHeader = Object.assign(
      document.createElement('div'),
      {
        className: 'ui medium header extra-space'
      },
      { innerText: 'New Project' }
    );
    const cardSub = Object.assign(
      document.createElement('div'),
      {
        className: 'meta'
      },
      { innerText: 'Start a new Project' }
    );
    const cardContent = Object.assign(
      document.createElement('div'),
      {
        className: 'content ui form extra-space'
      },
      { innerText: 'New Project' },
      { id: 'formCardCont' }
    );
    const cardFields = Object.assign(document.createElement('div'), {
      id: 'card-fields'
    });
    const cardInput = Object.assign(
      document.createElement('input'),
      {
        type: 'text'
      },
      { placeholder: 'Name your project' },
      { id: 'project-name' }
    );
    const cardBtn = Object.assign(
      document.createElement('button'),
      {
        className: 'ui button btn-style extra-space'
      },
      { innerText: 'Create Project' }
    );
    const cardFooter = Object.assign(
      document.createElement('div'),
      {
        className: 'meta'
      },
      { innerText: 'or press Escape to exit' }
    );
    mainContainer.appendChild(modal);
    modal.appendChild(modalGrid);
    modalGrid.appendChild(card);
    card.appendChild(cardHeader);
    card.appendChild(cardSub);
    card.appendChild(cardContent);
    cardContent.appendChild(cardFields);
    cardFields.appendChild(cardInput);
    cardFields.appendChild(cardBtn);
    card.appendChild(cardFooter);
  }
};
export default layout;

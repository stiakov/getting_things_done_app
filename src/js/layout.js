import behaviour from "./behaviour";

const crea = (type, attrib = []) => {
  const elem = document.createElement(type);
  if (attrib.length > 0) {
    attrib.forEach((item) => {
      Object.assign(elem, item)
    });
  }
  return elem
};
const layout = {
  column: (project) => {
    const colContainer = document.getElementById('colContainer');
    const projectContainer = crea('div', [
      { className: 'column project-container' },
      { id: `col-${project.id}` }
    ]);
    const mainSegment = crea('div', [{ className: 'ui placeholder segments' }, { id: `segments-${project.id}` }]);

    const headerSegment = crea('div', [{ className: 'ui center aligned segment' }]);
    const headerContent = crea('h2', [
      { className: 'header edit' },
      { innerText: project.name },
      { contentEditable: 'true' }
    ]);

    colContainer.appendChild(projectContainer);
    projectContainer.appendChild(mainSegment);
    mainSegment.appendChild(headerSegment);
    headerSegment.appendChild(headerContent);
    return colContainer;
  },
  taskProjectButton: (project) => {
    const mainSegmnt = document.getElementById(`segments-${project.id}`);
    const projectAddTaskBtn = crea('div', [
      { className: 'ui attached center aligned button btn-style' },
      { id: `newTaskBtn-${project.id}` },
      { innerText: 'Add Task' }
    ]);
    projectAddTaskBtn.addEventListener('click', () => layout.loadModal('task', layout.formNewTask(project)));
    mainSegmnt.appendChild(projectAddTaskBtn);
    return mainSegmnt;
  },
  cardFields: () => {
    const basicSeg = crea('div', [{ className: 'ui segment left-text' }]);
    const sgmDivider = crea('div', [{ className: 'ui clearing divider' }]);
    const sgmCard = crea('span', [
      { className: 'task-title edit' },
      { contentEditable: 'true' }
    ]);
    const contentDescription = crea('div', [
      { className: 'content edit' },
      { contentEditable: 'true' }
    ]);
    const contentDate = crea('div', [
      { className: 'meta edit' },
      { contentEditable: 'true' }
    ]);
    const contentButtons = crea('div', [{ className: 'meta' }]);
    const deleteBtn = crea('label', [
      { className: 'ui right icon label delete' },
      { innerText: 'Delete' }
    ]);
    const deleteIcon = crea('i', [{ className: 'trash alternate icon' }]);
    const doneBtn = crea('label', [
      { className: 'ui right icon label done' },
      { innerText: 'Complete' }
    ]);
    const doneIcon = crea('i', [{ className: 'check circle icon' }]);

    return { segment: basicSeg,
      divider: sgmDivider,
      title: sgmCard,
      content: contentDescription,
      date: contentDate,
      contentButtons,
      delete: deleteBtn,
      deleteIcon,
      doneButton: doneBtn,
      doneIcon
    }
  },
  task: (project) => {
    const mainSegmnt = document.getElementById(`segments-${project.id}`);
    const card = layout.cardFields();
    card['title'].innerText = project.tasks[0].title;
    card['content'].innerText = project.tasks[0].description;
    card['date'].innerText = project.tasks[0].date;
    card['segment'].id = `sgc-${ project.id}-${project.tasks[0].id }`;
    card['contentButtons'].id = `btns-${project.tasks[0].id}`;
    card['delete'].id = `trash-${ project.tasks[0].id }`;
    card['doneButton'].id = `check-${ project.tasks[0].id }`;

    mainSegmnt.appendChild(card['segment']);
    card['segment'].appendChild(card['title']);
    card['segment'].appendChild(card['divider']);
    card['segment'].appendChild(card['content']);
    card['segment'].appendChild(card['date']);
    card['segment'].appendChild(card['contentButtons']);
    card['contentButtons'].appendChild(card['delete']);
    card['contentButtons'].appendChild(card['doneButton']);
    card['delete'].appendChild(card['deleteIcon']);
    card['doneButton'].appendChild(card['doneIcon']);
    return card['segment'];
  },

  formNewTask: (project) => {
    const fields = [
      {
        name: 'Title',
        type: 'text',
        id: 'task-title',
        placeholder: 'Title'
      },
      {
        name: 'Description',
        type: 'text',
        id: 'task-description',
        placeholder: 'Description'
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

    const formContainer = crea('div', [{ id: 'card-fields' }]);

    fields.forEach((input) => {
      const fieldCont = crea('div', [{ className: 'field' }]);
      const nameField = crea('input',[
        { type: input.type },
        { placeholder: input.placeholder },
        { name: input.name },
        { id: input.id }
      ]);
      fieldCont.appendChild(nameField);
      formContainer.appendChild(fieldCont);
    });

    checkboxes.forEach((input) => {
      const checkCont = crea('div', [{ className: 'field' }]);
      const checkField = crea('div', [{ className: 'ui checkbox' }]);
      const boxField = crea('input', [
        { type: input.type },
        { id: input.id }
      ]);
      const checkLabel = crea('label', [{ innerText: input.name }]);
      checkCont.appendChild(checkField);
      checkField.appendChild(boxField);
      checkField.appendChild(checkLabel);
      formContainer.appendChild(checkCont);
    });
    const addTaskBtn = crea('button', [
      { className: 'ui button btn-style extra-space' },
      { type: 'submit' },
      { id: `create-task-${project.id}` },
      { innerText: 'Submit' }
    ]);

    addTaskBtn.addEventListener('click', () => {
      behaviour.addTaskToProject(project);
      const main = document.getElementById('main-container');
      const modal = document.getElementById('modal');
      main.removeChild(modal);
    });
    formContainer.appendChild(addTaskBtn);

    return formContainer;
  },
  formNewProject: () => {
    const title = crea('input', [
      { type: 'text' },
      { placeholder: 'Name your project' },
      { id: 'project-name' }
    ]);
    const button = crea('button', [
      { className: 'ui button btn-style extra-space' },
      { innerText: 'Create Project' }
    ]);
    button.addEventListener('click', () => behaviour.addNewProject());
    return { title, button}
  },
  loadModal: (from, fields) => {
    // from should be 'project' or 'task'
    const modalTitle = (from === 'project') ? 'New Project' : 'New Task';
    const modalLabel = (from === 'project') ? 'Start a new project' : 'Write a new task';

    const mainContainer = document.getElementById('main-container');
    const modal = crea('div', [
      { className: 'ui dimmer modals page transition visible active underlay' },
      { tabIndex: 1 },
      { id: 'modal'}
    ]);

    document.body.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') mainContainer.removeChild(modal);
    });

    const modalGrid = crea('div', [
      { className: 'ui centered grid' },
      { style: 'margin-top:20vh' }
    ]);
    const card = crea('div', [{ className: 'ui card extra-space overlay' }]);

    const cardHeader = crea('div', [
      { className: 'ui medium header extra-space' },
      { innerText: modalTitle }
    ]);
    const cardSub = crea('div', [
      { className: 'meta' },
      { innerText: modalLabel }
    ]);
    const cardContent = crea('div', [{ className: 'content ui form extra-space' }]);

    const cardFooter = crea('div', [
      { className: 'meta' },
      { innerText: 'or press Escape to exit' }
    ]);
    if  (from === 'project') {
      let cardFields = crea('div', [{ id: 'card-fields' }]);
      cardFields.appendChild(fields['title']);
      cardFields.appendChild(fields['button']);
      cardContent.appendChild(cardFields);
    } else {
      cardContent.appendChild(fields);
    }

    mainContainer.appendChild(modal);
    modal.appendChild(modalGrid);
    modalGrid.appendChild(card);
    card.appendChild(cardHeader);
    card.appendChild(cardSub);
    card.appendChild(cardContent);
    card.appendChild(cardFooter);
  }
};
export default layout;

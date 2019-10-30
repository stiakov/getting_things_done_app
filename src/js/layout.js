import behaviour from './behaviour';

export const getById = (id) => document.getElementById(id);

export const append = (parent, child) => parent.appendChild(child);

export const create = (type, attrib = []) => {
  const elem = document.createElement(type);
  if (attrib.length > 0) {
    attrib.forEach((item) => {
      Object.assign(elem, item);
    });
  }
  return elem;
};

const layout = {
  column: (project) => {
    const colContainer = getById('colContainer');
    const projectContainer = create('div', [
      { className: 'column project-container' },
      { id: `col-${project.id}` }
    ]);
    const mainSegment = create('div', [
      { className: 'ui placeholder segments' },
      { id: `segments-${project.id}` }
    ]);
    const headerSegment = create('div', [
      { className: 'ui center aligned segment' }
    ]);
    const headerContent = create('h2', [
      { className: 'header edit' },
      { innerText: project.name },
      { contentEditable: 'true' }
    ]);
    headerContent.addEventListener('click', () => {
      document.body.addEventListener('click', (e) => {
        if (e.target !== headerContent) {
          const princ = headerContent.parentElement.parentElement.id;
          const projectId = princ.split('-')[1];
          const tempObj = behaviour.getLocal(projectId);
          tempObj.name = headerContent.innerText;
          behaviour.setLocal(projectId, tempObj);
        }
      });
    });
    append(colContainer, projectContainer);
    append(projectContainer, mainSegment);
    append(mainSegment, headerSegment);
    append(headerSegment, headerContent);
    return colContainer;
  },

  taskProjectButton: (project) => {
    const mainSegmnt = getById(`segments-${project.id}`);
    const projectAddTaskBtn = create('div', [
      { className: 'ui attached center aligned button btn-style' },
      { id: `newTaskBtn-${project.id}` },
      { innerText: 'Add Task' }
    ]);
    projectAddTaskBtn.addEventListener('click', () =>
      layout.loadModal('task', layout.formNewTask(project))
    );
    append(mainSegmnt, projectAddTaskBtn);
    return mainSegmnt;
  },

  cardFields: () => {
    const basicSeg = create('div', [
      { className: 'ui segment left-text normal' }
    ]);
    const sgmDivider = create('div', [{ className: 'ui clearing divider' }]);
    const sgmCard = create('span', [
      { className: 'task-title edit' },
      { contentEditable: 'true' }
    ]);
    sgmCard.addEventListener('click', () => {
      behaviour.setEditable(sgmCard, 'title');
    });
    const contentDescription = create('div', [
      { className: 'content edit' },
      { contentEditable: 'true' }
    ]);
    contentDescription.addEventListener('click', () => {
      behaviour.setEditable(contentDescription, 'description');
    });
    const contentDate = create('div', [
      { className: 'meta edit' },
      { contentEditable: 'true' }
    ]);
    contentDate.addEventListener('click', () => {
      behaviour.setEditable(contentDate, 'dueDate');
    });
    const contentButtons = create('div', [{ className: 'meta' }]);
    const deleteBtn = create('label', [
      { className: 'ui right icon label delete' },
      { innerText: 'Delete' }
    ]);
    deleteBtn.addEventListener('click', () => {
      const id = deleteBtn.id.split('-');
      const parent = JSON.parse(localStorage.getItem(id[1]));
      const conTask = parent.tasks.filter((task) => task['id'] == id[2]);
      behaviour.deleteTask(parent, conTask[0]);
    });
    const deleteIcon = create('i', [{ className: 'trash alternate icon' }]);
    const doneBtn = create('label', [
      { className: 'ui right icon label done' },
      { innerText: 'Complete' }
    ]);
    doneBtn.addEventListener('click', () => {
      const id = deleteBtn.id.split('-');
      const parent = JSON.parse(localStorage.getItem(id[1]));
      const conTask = parent.tasks.filter((task) => task['id'] == id[2]);
      behaviour.editStatus(parent, conTask[0]);
    });
    const doneIcon = create('i', [{ className: 'check circle icon' }]);
    return {
      segment: basicSeg,
      divider: sgmDivider,
      title: sgmCard,
      content: contentDescription,
      date: contentDate,
      contentButtons,
      delete: deleteBtn,
      deleteIcon,
      doneButton: doneBtn,
      doneIcon
    };
  },
  loadTask: (project, task = []) => {
    const mainSegmnt = getById(`segments-${project.id}`);
    const taskCollection = task.length === 0 ? project.tasks : [task];
    const addTaskBtn = getById(`newTaskBtn-${project.id}`);
    if (addTaskBtn) mainSegmnt.removeChild(addTaskBtn);

    taskCollection.forEach((task) => {
      const card = layout.cardFields();
      card['title'].innerText = task.title;
      card['content'].innerText = task.description;
      card['date'].innerText = task.dueDate;
      if (task.status) {
        card['segment'].classList.toggle('completed');
      }
      if (task.priority) {
        card['segment'].classList.toggle('important');
        card['segment'].classList.toggle('normal');
      }
      card['segment'].id = `sgc-${task.id}`;
      card['contentButtons'].id = `btns-${task.id}`;
      card['delete'].id = `trash-${project.id}-${task.id}`;
      card['doneButton'].id = `check-${project.id}-${task.id}`;

      card['segment'].appendChild(card['title']);
      card['segment'].appendChild(card['divider']);
      card['segment'].appendChild(card['content']);
      card['segment'].appendChild(card['date']);
      card['segment'].appendChild(card['contentButtons']);
      card['contentButtons'].appendChild(card['delete']);
      card['contentButtons'].appendChild(card['doneButton']);
      card['delete'].appendChild(card['deleteIcon']);
      card['doneButton'].appendChild(card['doneIcon']);
      mainSegmnt.appendChild(card['segment']);
    });
    if (addTaskBtn) append(mainSegmnt, addTaskBtn);
    return mainSegmnt;
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
        id: 'task-date'
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

    const formContainer = create('div', [{ id: 'card-fields' }]);

    fields.forEach((input) => {
      const fieldCont = create('div', [{ className: 'field' }]);
      const nameField = create('input', [
        { type: input.type },
        { placeholder: input.placeholder },
        { name: input.name },
        { id: input.id }
      ]);
      append(fieldCont, nameField);
      append(formContainer, fieldCont);
    });

    checkboxes.forEach((input) => {
      const checkCont = create('div', [{ className: 'field' }]);
      const checkField = create('div', [{ className: 'ui checkbox' }]);
      const boxField = create('input', [
        { type: input.type },
        { id: input.id }
      ]);
      const checkLabel = create('label', [{ innerText: input.name }]);
      append(checkCont, checkField);
      append(checkField, boxField);
      append(checkField, checkLabel);
      append(formContainer, checkCont);
    });
    const addTaskBtn = create('button', [
      { className: 'ui button btn-style extra-space' },
      { type: 'submit' },
      { id: `create-task-${project.id}` },
      { innerText: 'Submit' }
    ]);

    addTaskBtn.addEventListener('click', () => {
      behaviour.addTaskToProject(project);
      const main = getById('main-container');
      const modal = getById('modal');
      main.removeChild(modal);
    });

    append(formContainer, addTaskBtn);
    return formContainer;
  },
  formNewProject: () => {
    const title = create('input', [
      { type: 'text' },
      { placeholder: 'Name your project' },
      { id: 'project-name' }
    ]);
    const button = create('button', [
      { className: 'ui button btn-style extra-space' },
      { innerText: 'Create Project' }
    ]);
    button.addEventListener('click', () => behaviour.addNewProject());
    return { title, button };
  },
  loadModal: (from, fields) => {
    // from must be 'project' or 'task'
    const modalTitle = from === 'project' ? 'New Project' : 'New Task';
    const modalLabel =
      from === 'project' ? 'Start a new project' : 'Write a new task';

    const mainContainer = getById('main-container');
    let modal = create('div', [
      { className: 'ui dimmer modals page transition visible active underlay' },
      { tabIndex: 1 },
      { id: 'modal' }
    ]);

    document.body.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        if (modal) mainContainer.removeChild(modal);
        modal = undefined;
      }
    });

    const modalGrid = create('div', [
      { className: 'ui centered grid' },
      { style: 'margin-top:20vh' }
    ]);
    const card = create('div', [{ className: 'ui card extra-space overlay' }]);
    const cardHeader = create('div', [
      { className: 'ui medium header extra-space' },
      { innerText: modalTitle }
    ]);
    const cardSub = create('div', [
      { className: 'meta' },
      { innerText: modalLabel }
    ]);
    const cardContent = create('div', [
      { className: 'content ui form extra-space' }
    ]);
    const cardFooter = create('div', [
      { className: 'meta' },
      { innerText: 'or press Escape to exit' }
    ]);

    if (from === 'project') {
      let cardFields = create('div', [{ id: 'card-fields' }]);
      append(cardFields, fields['title']);
      append(cardFields, fields['button']);
      append(cardContent, cardFields);
    } else {
      append(cardContent, fields);
    }

    append(mainContainer, modal);
    append(modal, modalGrid);
    append(modalGrid, card);
    append(card, cardHeader);
    append(card, cardSub);
    append(card, cardContent);
    append(card, cardFooter);
  }
};
export default layout;

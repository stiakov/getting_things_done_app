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
      { className: 'ui right icon label' },
      { id: `trash-${project.tasks[0].id}` },
      { innerText: 'Delete' }
    );
    const deleteIcon = Object.assign(document.createElement('i'), {
      className: 'trash alternate icon'
    });
    const editBtn = Object.assign(
      document.createElement('label'),
      { className: 'ui right icon label' },
      { id: `edit-${project.tasks[0].id}` },
      { innerText: 'Edit' }
    );
    const editIcon = Object.assign(document.createElement('i'), {
      className: 'edit icon'
    });
    const doneBtn = Object.assign(
      document.createElement('label'),
      { className: 'ui right icon label' },
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
  }
};
export default layout;

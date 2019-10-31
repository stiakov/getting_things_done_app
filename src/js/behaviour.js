import layout from './layout';
import setup from './setup';
import systemManager from './logic';
import { getById } from './layout';

const sm = systemManager;

const behaviour = {
  getTaskData: () => {
    let task_id = setup.getTaskCounter();
    const task_title = getById('task-title').value;
    const task_description = getById('task-description').value;
    const task_date = getById('task-date').value;
    const task_priority = getById('task-priority').checked;
    const task_status = getById('task-status').checked;
    const item = sm.todoItem(
      task_id,
      task_title,
      task_description,
      task_date,
      task_priority,
      task_status
    );
    return item;
  },
  addTaskToProject: (project, item = behaviour.getTaskData()) => {
    const proj = JSON.parse(localStorage.getItem(project.id));
    proj.tasks.push(item);
    layout.loadTask(proj, item);
    localStorage.setItem(project.id, JSON.stringify(proj));
  },
  deleteTask: (project, item) => {
    let tempData = JSON.parse(localStorage.getItem(project.id));
    let tempFilter = tempData.tasks.filter((task) => task.id !== item.id);
    tempData.tasks = tempFilter;
    localStorage.setItem(project.id, JSON.stringify(tempData));
    const principal = getById(`sgc-${item.id}`);
    principal.parentElement.removeChild(principal);
  },
  removeModal: () => {
    const main = getById('main-container');
    const modal = getById('modal');
    main.removeChild(modal);
  },
  editStatus: (project, item) => {
    project.tasks.map((task) => {
      if (task.id == item.id) {
        task.status = !task.status ? true : false;
        localStorage.setItem(project.id, JSON.stringify(project));
        const card = getById(`sgc-${item.id}`);
        card.classList.toggle('completed');
      }
    });
  },
  getNewProjectData: () => {
    let project_id = setup.counterProj;
    const project_name = getById('project-name').value;
    const project = sm.ProjectManager.newProject(project_id, project_name);
    return project;
  },
  addNewProject: (project = behaviour.getNewProjectData()) => {
    localStorage.setItem(setup.counterProj, JSON.stringify(project));
    setup.setColumnInit(project);
  },
  deleteProject: (id) => {
    localStorage.removeItem(id);
    const column = getById(`col-${id}`);
    column.parentElement.removeChild(column);
  },
  getLocal: (id) => JSON.parse(localStorage.getItem(id)),
  setLocal: (id, project) => localStorage.setItem(id, JSON.stringify(project)),
  setEditable: (segment, key) => {
    document.body.addEventListener('click', (e) => {
      if (e.target !== segment) {
        const segmentCard = segment.parentElement;
        const taskId = segmentCard.id.split('-')[1];
        const project = segmentCard.parentElement;
        const projectId = project.id.split('-')[1];
        const tempObj = behaviour.getLocal(projectId);

        tempObj.tasks.map((task) => {
          if (taskId == task.id) {
            task[key] = segment.innerText;
            behaviour.setLocal(projectId, tempObj);
          }
        });
      }
    });
  }
};

export default behaviour;

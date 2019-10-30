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
    const item = sm.todoItem(task_id, task_title, task_description, task_date);

    return item;
  },
  addTaskToProject: (project, item = behaviour.getTaskData()) => {
    const proj = JSON.parse(localStorage.getItem(project.id));
    console.log('item' + JSON.stringify(item));
    proj.tasks.push(item);
    layout.loadTask(proj, item);
    localStorage.setItem(project.id, JSON.stringify(proj));
    // setup.counterTask += 1;
  },
  deleteTask: (project, item) => {
    let tempData = JSON.parse(localStorage.getItem(project.id));
    let tempFilter = tempData.tasks.filter((task) => task.id !== item.id);
    tempData.tasks = tempFilter;
    localStorage.setItem(project.id, JSON.stringify(tempData));
    const principal = getById(`sgc-${item.id}`);
    principal.parentElement.removeChild(principal);
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
    const project = sm.newProject(project_id, project_name);
    return project;
  },
  addNewProject: (project = behaviour.getNewProjectData()) => {
    localStorage.setItem(setup.counterProj, JSON.stringify(project));
    setup.setColumnInit(project);
  }
};

export default behaviour;

import layout from "./layout";
import setup from "./setup";
import systemManager from "./logic";

const sm = systemManager;

const behaviour = {
  getTaskData: () => {
    let task_id = setup.counterTask += 1;
    const task_title = document.getElementById('task-title').value;
    const task_description = document.getElementById('task-description').value;
    const task_date = document.getElementById('task-date').value;
    const item = sm.todoItem(task_id, task_title, task_description, task_date);

    return item;
  },
  addTaskToProject: (project, item = behaviour.getTaskData()) => {
    const proj = JSON.parse(localStorage.getItem(project.id));
    console.log('item' + JSON.stringify(item));
    proj.tasks.push(item);
    layout.task(proj);
    localStorage.setItem(project.id, JSON.stringify(proj));
  },
  deleteTask: () => {
    let tempData = JSON.parse(localStorage.getItem(project.id));
    let tempFilter = tempData.tasks.filter((task) => task.id !== item.id);
    tempData.tasks = tempFilter;
    localStorage.setItem(idProject, JSON.stringify(tempData));
    const principal = document.getElementById(`sgc-${project.id}-${item.id}`);
    principal.parentElement.removeChild(principal);
  },
  editStatus: (project, item) => {
    let tempData = JSON.parse(localStorage.getItem(project.id));
    tempData.tasks[item.id].status = true;
  },
  getNewProjectData: () => {
    let project_id = setup.counterProj;
    const project_name = document.getElementById('project-name').value;
    const project = sm.newProject(project_id, project_name);
    return project;
  },
  addNewProject: (project = behaviour.getNewProjectData()) => {
    localStorage.setItem(setup.counterProj, JSON.stringify(project));
    setup.setColumnInit(project)
  }
};

export default behaviour;

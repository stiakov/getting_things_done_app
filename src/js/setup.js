import fav from '../img/favicon.ico';
import layout from '../js/layout';
import systemManager from '../js/logic';

const sm = systemManager;

let array = [];
const setup = {
  counterProj: 0,
  counterTask: 0,

  setFavicon: () => {
    const setFav = document.getElementById('favicon');
    setFav.href = fav;
  },
  setProjectInit: () => {
    const demo = sm.ProjectManager.newProject(
      setup.counterProj,
      'Project Demo'
    );
    setup.getProjectsNum();
    const taskInit = sm.todoItem(
      setup.counterTask,
      'Test task',
      'Hi!',
      '2019-12-12'
    );
    // buscar fecha por defecto
    demo.tasks.push(taskInit);
    // setup.counterTask += 1;
    // taskInit.title = 'Hello hello';
    // taskInit.id = setup.counterTask;
    // task.description = 'Testing';
    // task.dueDate = '2020-12-24';
    // demo.tasks.push(taskInit);
    localStorage.setItem(setup.counterProj, JSON.stringify(demo));
    return demo;
  },
  setColumnInit: (project) => {
    layout.column(project);
    layout.task(project);
    layout.taskProjectButton(project);
  },
  getProjectsNum: () => {
    setup.counterProj = localStorage.length + 1;
  },
  getTaskNum: () => {
    const keys = Object.keys(localStorage);
    keys.forEach((key) => {
      const proj = JSON.parse(localStorage.getItem(key));
      setup.counterTask += proj.tasks.length;
    });
    setup.counterTask += 1;
  }
};

export default setup;

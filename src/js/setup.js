import fav from '../img/favicon.ico';
import layout from '../js/layout';
import systemManager from '../js/logic';

const sm = systemManager;

const setup = {
  counterProj: 1,
  counterTask: 1,

  setFavicon: () => {
    const setFav = document.getElementById('favicon');
    setFav.href = fav;
  },
  setProjectInit: () => {
    const demo = sm.ProjectManager.newProject(
      setup.counterProj,
      'Project Demo'
    );

    if (localStorage.length < 1) {
      const taskInit = sm.todoItem(
        setup.counterTask,
        'Test task',
        'Hi! Click on me to edit',
        '2029-10-01'
      );
      demo.tasks.push(taskInit);
      localStorage.setItem(setup.counterProj, JSON.stringify(demo));
      setup.setColumnInit(demo);
    } else {
      if (localStorage.length > 0) {
        const keys = Object.keys(localStorage);
        keys.sort().forEach((key) => {
          setup.setColumnInit(JSON.parse(localStorage.getItem(key)));
        });
      }
    }
    setup.getProjectsNum();
    setup.loadTaskNum();
    return demo;
  },
  setColumnInit: (project) => {
    layout.column(project);
    layout.loadTask(project);
    layout.taskProjectButton(project);
  },
  getProjectsNum: () => {
    setup.counterProj = localStorage.length + 1;
  },
  getTaskCounter: () => (setup.counterTask += 1),
  loadTaskNum: () => {
    const keys = Object.keys(localStorage);
    keys.forEach((key) => {
      const proj = JSON.parse(localStorage.getItem(key));
      setup.counterTask += proj.tasks.length;
    });
    return setup.counterTask;
  }
};

export default setup;

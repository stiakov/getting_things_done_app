import behaviour from './behaviour';

const trigger = {
  setDelete: (project, item) => {
    const btnsDel = Array.from(document.getElementsByClassName('delete'));
    btnsDel.forEach((btn) => {
      btn.addEventListener('click', () => {
        // remove function
        behaviour.deleteTask();
      });
    });
  },
  setEdit: (project, item) => {
    const fields = Array.from(document.getElementsByClassName('edit'));
    fields.forEach((field) => {
      field.addEventListener('click', () => {
        // edit function
      });
    });
  },

  setDone: (project, item) => {
    const btnsDone = document.getElementsByClassName('done');
    [...btnsDone].forEach((btn) => {
      btn.addEventListener('click', () => {
        // done function
        behaviour.editStatus(project, item);
      });
    });
  },
  setAddTaskBtn: (project) => {
    const btnsAddTask = document.getElementsByClassName('attached');
    btnsAddTask.forEach((btn) => {
      btn.addEventListener('click', () => {
        // addtask function
        behaviour.getTaskData();
        behaviour.addTaskToProject(project, item);
      });
    });
  },
  setAddProjectBtn: () => {
    const btnsAddProjectBtn = document.getElementsByClassName('add-proj');
    btnsAddProjectBtn.forEach((btn) => {
      btn.addEventListener('click', () => {
        // addproject function
        getNewProjectData();
        addNewProject();
      });
    });
  }
};

export default trigger;

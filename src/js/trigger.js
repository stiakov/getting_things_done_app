import behaviour from './behaviour';

const trigger = {
  setDelete: (project, item) => {
    const btnsDel = Array.from(document.getElementsByClassName('delete'));
    btnsDel.forEach((btn) => {
      btn.addEventListener('click', () => {
        // remove function
        console.log('in deleting item listener...');
        deleteTask();
      });
    });
  },
  setEdit: (project, item) => {
    const btnsEdit = Array.from(document.getElementsByClassName('edit'));
    btnsEdit.forEach((btn) => {
      btn.addEventListener('click', () => {
        // edit function
        console.log('Editing item..');
      });
    });
  },

  setDone: (project, item) => {
    const btnsDone = document.getElementsByClassName('done');
    btnsDone.forEach((btn) => {
      btn.addEventListener('click', () => {
        // done function
        editStatus(project, item);
      });
    });
  },
  setAddTaskBtn: (project) => {
    const btnsAddTask = document.getElementsByClassName('attached');
    btnsAddTask.forEach((btn) => {
      btn.addEventListener('click', () => {
        // addtask function
        getTaskData();
        addTaskToProject(project, item);
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

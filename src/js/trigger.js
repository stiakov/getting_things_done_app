const trigger = {
  setDelete: (project) => {
    const btnsDel = document.getElementsByClassName('delete');
    btnsDel.forEach((btn) => {
      btn.addEventListener('click', () => {
        localStorage.removeItem();
        // remove function
      });
    });
  },
  setEdit: (project) => {
    const btnsEdit = document.getElementsByClassName('edit');
    btnsEdit.forEach((btn) => {
      btn.addEventListener('click', () => {
        // edit function
      });
    });
  },

  setDone: (project) => {
    const btnsDone = document.getElementsByClassName('done');
    btnsDone.forEach((btn) => {
      btn.addEventListener('click', () => {
        // done function
      });
    });
  }
};

export default trigger;

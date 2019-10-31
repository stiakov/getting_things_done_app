const systemManager = {
  todoItem: (id, title, description, dueDate, priority = 0, status = false) => {
    return {
      id,
      title,
      description,
      dueDate,
      priority,
      status
    };
  },

  ProjectManager: {
    newProject: (id, name, tasks = []) => ({ id, name, tasks })
  }
};
export default systemManager;

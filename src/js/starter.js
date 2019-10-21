const systemManager = {
  todoItem: (id, title, description, dueDate, priority = 0, status = false) => {
    return {
      id,
      todo: {
        title,
        description,
        dueDate,
        priority,
        status
      }
    };
  },

  ProjectManager: {
    newProject: (id, name, tasks = {}) => ({ id, name, tasks }),
    addToProject: (project, item) => {
      project.tasks[item.id] = item.todo;
    }
  }
};
export default systemManager;

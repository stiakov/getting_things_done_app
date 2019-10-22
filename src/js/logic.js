const systemManager = {
  todoItem: (title, description, dueDate, priority = 0, status = false) => {
    return {
      title,
      description,
      dueDate,
      priority,
      status
    };
  },

  ProjectManager: {
    newProject: (id, name, tasks = {}) => ({id, name, tasks}),
    addToProject: (project, item) => {
      project.tasks[item.id] = item.todo;
    }
  }
};
export default systemManager;

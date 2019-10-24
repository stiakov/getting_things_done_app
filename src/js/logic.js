const systemManager = {
  todoItem: (id, title, description, dueDate, status = false) => {
    return {
      id,
      title,
      description,
      dueDate,
      status
    };
  },

  ProjectManager: {
    newProject: (id, name, tasks = []) => ({ id, name, tasks }),
    addToProject: (project, item) => {
      project.tasks[item.id] = item.todo;
    }
  }
};
export default systemManager;

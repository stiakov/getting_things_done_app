import env from './js/env';
import '../semantic/dist/semantic.js';
import '../semantic/dist/semantic.css';
import '../src/css/style.css';

const todoItem = (id, title, description, dueDate, priority) => {
  return {id, todo: { title, description, dueDate, priority } };
};

const ProjectManager = {
  newProject: (name, tasks = {}) => {
    return { name, tasks };
    },
  addToProject: (project, item) => project.tasks[item.id] = item.todo
};

import env from './js/env';
import '../semantic/dist/semantic.js';
import '../semantic/dist/semantic.css';
import '../src/css/style.css';
import { compareAsc, format } from 'date-fns'


const todoItem = (id, title, description, dueDate, priority = 0, status = false) => {
  return {id, todo: { title, description, dueDate, priority, status } };
};

const ProjectManager = {
  newProject: (name, tasks = {}) => {
    return { name, tasks };
    },
  addToProject: (project, item) => project.tasks[item.id] = item.todo
};



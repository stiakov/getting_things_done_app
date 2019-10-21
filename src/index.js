import { compareAsc, format } from 'date-fns';
import env from './js/env';
import '../semantic/dist/semantic';
import '../semantic/dist/semantic.css';
import './css/style.css';

const todoItem = (
  id,
  title,
  description,
  dueDate,
  priority = 0,
  status = false
) => {
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
};

const ProjectManager = {
  newProject: (name, tasks = {}) => ({ name, tasks }),
  addToProject: (project, item) => {
    project.tasks[item.id] = item.todo;
  }
};

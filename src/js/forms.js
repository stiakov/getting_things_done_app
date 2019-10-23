import * as Env from './env';
import systemManager from './logic';
import { setup } from './env';
import { tag } from './env';
import { column } from './projectLayout';
import { segmentGen } from './projectLayout';

const seg = segmentGen;
const form = {
  closeForm: () => {
    const mod = document.getElementById('modal');
    mod.parentElement.removeChild(mod);
  },

  newTask: () => {
    const fields = [
      {
        name: 'Title',
        type: 'text',
        id: 'task-title',
        placeholder: 'Concise title'
      },
      {
        name: 'Description',
        type: 'text',
        id: 'task-description',
        placeholder: 'Short description'
      },
      {
        name: 'Due date',
        type: 'date',
        id: 'task-date',
        placeholder: 'Due Date'
      },
      {
        name: 'High priority?',
        type: 'checkbox',
        id: 'task-priority',
        placeholder: ''
      }
    ];

    fields.forEach((input) => {
      const typeChecker = input.type === 'checkbox' ? 'span' : 'label';
      const label = Object.assign(
        document.createElement(typeChecker),
        {
          innerText: input.name
        },
        { className: 'ui left aligned tiny header' }
      );
      const nameField = Object.assign(
        document.createElement('input'),
        { type: input.type },
        { placeholder: input.placeholder },
        { className: 'field' },
        { id: input.id }
      );
      if (typeChecker === 'span') {
        label.appendChild(nameField);
        Env.tag.getFormContainer().appendChild(label);
      } else {
        Env.tag.getFormContainer().appendChild(label);
        Env.tag.getFormContainer().appendChild(nameField);
      }
    });
    const btn = Object.assign(
      document.createElement('button'),
      { className: 'ui button btn-style' },
      { innerText: 'Submit task' },
      { id: 'submit-task' }
    );
    Env.tag.getFormContainer().appendChild(btn);
    const idProj = btn.parentElement.parentElement.id;
    btn.addEventListener('click', () => {
      Env.task.addTask(idProj);
      form.closeForm();
    });
  },

  newProject: () => {
    const projectFormContainer = document.createElement('div');

    const projectName = Object.assign(
      document.createElement('input'),
      { type: 'text' },
      { placeholder: 'Name your project' },
      { id: 'project-name' }
    );
    const btnProject = Object.assign(
      document.createElement('button'),
      { className: 'ui button btn-style extra-space' },
      { innerText: 'Create Project' },
      { id: 'btn-createProject' }
    );
    Env.tag.getFormContainer().appendChild(projectFormContainer);
    projectFormContainer.appendChild(projectName);
    projectFormContainer.appendChild(btnProject);

    const buttonBehaviour = () => {
      const projectTitle = document.getElementById('project-name').value;
      const temp = systemManager.ProjectManager.newProject(
        setup.counterProj,
        projectTitle
      );
      form.closeForm();
      localStorage.setItem(setup.counterProj, JSON.stringify(temp));
      column.createColumn('newProjButton', projectTitle);
      // seg.emptySegments(setup.counterProj);
    };

    btnProject.addEventListener('click', () => buttonBehaviour());
    projectName.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        buttonBehaviour();
      }
    });
  }
};

export default form;

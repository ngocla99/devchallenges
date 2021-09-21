'use strict';

const btnAdd = document.querySelector('.btn-add');
const input = document.querySelector('.input');
const listTasks = document.querySelector('.list-tasks');

// Add trash to the end of task.
const addClose = function (task) {
  const tool = document.createElement('span');
  tool.classList.add('tool');
  tool.innerHTML = `
    <i class="fas fa-pen pen"></i>
    <i class="fas fa-trash-alt trash"></i>`;
  task.appendChild(tool);
};

const createTask = function (content = '') {
  const task = document.createElement('li');
  task.classList.add('task');
  //   if (content) task.textContent = content;
  //   else task.textContent = input.value;
  if (content)
    task.innerHTML = `
    <label class='task-content'>${content}</label>`;
  else
    task.innerHTML = `
  <label class='task-content'>${input.value}</label>`;
  listTasks.appendChild(task);
  addClose(task);
  return task;
};

const checkedTask = function (task) {
  task.classList.toggle('checked');
  updateList();
};

const deleteTask = function (task) {
  task.remove();
  updateList();
};

const editTask = function (task) {
  const content = task.textContent;
  console.log(task);
  task.innerHTML = `<input class="input-edit" type="text"/>`;
  const inputEdit = document.querySelector('.input-edit');
  inputEdit.value = content.trim();
  inputEdit.focus();
  inputEdit.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      task.innerHTML = `<label class='task-content'>${inputEdit.value}</label>`;
      updateList();
    }
  });
};

const addTask = function () {
  if (input.value.trim() !== '') {
    createTask();
    input.value = '';
  }
};

const updateList = function () {
  const storeTasks = [];
  const tasks = document.querySelectorAll('.task');
  tasks.forEach((task) => {
    storeTasks.push({
      task: task.textContent.replace(/\r?\n|\r/g, ''),
      completed: task.classList.contains('checked'),
    });
  });
  localStorage.setItem('tasks', JSON.stringify(storeTasks));
};
// Load data from Local Storage
const loadList = JSON.parse(localStorage.getItem('tasks'));
if (loadList) {
  loadList.forEach((todo) => {
    const taskEl = createTask(todo.task);
    if (todo.completed) taskEl.classList.toggle('checked');
  });
}

btnAdd.addEventListener('click', () => {
  addTask();
  updateList();
});

input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    addTask();
    updateList();
  }
});

listTasks.addEventListener('click', (e) => {
  if (e.target.classList.contains('trash')) {
    deleteTask(e.target.parentElement.parentElement);
  } else if (e.target.classList.contains('pen')) {
    editTask(e.target.parentElement.previousElementSibling);
    console.log(1);
  } else {
    checkedTask(e.target);
  }
});

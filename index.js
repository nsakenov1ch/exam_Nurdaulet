const tasks = JSON.parse(localStorage.getItem('tasks')) || { todo: [], inProgress: [], done: [] };
let nextTaskId = tasks.todo.length + tasks.inProgress.length + tasks.done.length;

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function addTask() {
  const text = document.getElementById('newTaskText').value.trim();
  if (text === '') return;

  const newTask = { id: nextTaskId++, text };
  tasks.todo.push(newTask);
  saveTasks();
  renderTasks();
  document.getElementById('newTaskText').value = '';
}

function deleteTask(column, id) {
  const index = tasks[column].findIndex(task => task.id === id);
  tasks[column].splice(index, 1);
  saveTasks();
  renderTasks();
}

function moveTask(id, from, to) {
  const task = tasks[from].find(task => task.id === id);
  tasks[to].push(task);
  deleteTask(from, id);
  saveTasks();
  renderTasks();
}

function renderTasks() {
  const todoColumn = document.getElementById('todo');
  const inProgressColumn = document.getElementById('inProgress');
  const doneColumn = document.getElementById('done');

  todoColumn.innerHTML = '<h3>To Do</h3>';
  tasks.todo.forEach((task, index) => {
    const taskElem = createTaskElement(task, 'todo', index);
    todoColumn.appendChild(taskElem);
  });

  inProgressColumn.innerHTML = '<h3>In Progress</h3>';
  tasks.inProgress.forEach((task, index) => {
    const taskElem = createTaskElement(task, 'inProgress', index);
    inProgressColumn.appendChild(taskElem);
  });

  doneColumn.innerHTML = '<h3>Done</h3>';
  tasks.done.forEach((task, index) => {
    const taskElem = createTaskElement(task, 'done', index);
    doneColumn.appendChild(taskElem);
  });
}

function createTaskElement(task, column, index) {
  const taskElem = document.createElement('div');
  taskElem.classList.add('task');
  taskElem.textContent = task.text;

  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'X';
  deleteButton.classList.add('deleteButton');
  deleteButton.onclick = () => deleteTask(column, task.id);
  taskElem.appendChild(deleteButton);

  if (column !== 'done') {
    const nextButton = document.createElement('button');
    nextButton.textContent = 'Next';
    nextButton.classList.add('nextButton');
    nextButton.onclick = () => moveTask(task.id, column, column === 'todo' ? 'inProgress' : 'done');
    taskElem.appendChild(nextButton);
  }

  return taskElem;
}

renderTasks();








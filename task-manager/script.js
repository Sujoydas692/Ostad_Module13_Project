const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");
const taskCount = document.getElementById("task-count");
const alertPlaceholder = document.getElementById("alert-placeholder");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function showAlert(message, type = "success") {
  alertPlaceholder.innerHTML = `
    <div class="alert alert-${type} alert-dismissible fade show" role="alert">
      ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    </div>
  `;
  setTimeout(() => alertPlaceholder.innerHTML = '', 2500);
}

function updateTaskCount() {
  taskCount.textContent = tasks.length;
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = `list-group-item d-flex justify-content-between align-items-center`;

    const span = document.createElement("span");
    span.textContent = task.text;
    if (task.completed) span.classList.add("text-decoration-line-through", "text-muted");

    span.style.cursor = "pointer";
    span.addEventListener("click", () => toggleTask(index));

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "btn btn-sm btn-danger";
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => deleteTask(index));

    li.appendChild(span);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });

  updateTaskCount();
  saveTasks();
}

function addTask(text) {
  tasks.push({ text, completed: false });
  renderTasks();
  showAlert("Task added successfully!", "success");
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
  showAlert("Task deleted!", "danger");
}

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
}

taskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const taskText = taskInput.value.trim();
  if (!taskText) {
    showAlert("Please enter a task!", "warning");
    return;
  }
  addTask(taskText);
  taskInput.value = "";
});

renderTasks();
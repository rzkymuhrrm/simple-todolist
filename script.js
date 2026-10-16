const todoList = document.querySelector(".todo-list");
const input = document.querySelector(".input-todo");
const buttonAdd = document.querySelector(".button-add");

let todos = [];

if (localStorage.getItem("todos")) {
  todos = JSON.parse(localStorage.getItem("todos"));
}

buttonAdd.addEventListener("click", () => {
  const value = input.value.trim();
  if (!value) return;

  todos.push({
    name: value,
    completed: false
  });

  input.value = "";

  saveAndRender();
  console.log(todos)

});

function saveAndRender() {
  localStorage.setItem("todos", JSON.stringify(todos));
  renderTodos();
}

function renderTodos() {
  todoList.innerHTML = "";

  todos.forEach((todo, index) => {
    const card = document.createElement("div");
    card.className = "card-todo";
    
    if (todo.completed) {
      card.classList.add("done");
    }

    card.innerHTML = `
      <h1 class="title ${todo.completed ? "done" : ""}">${todo.name}</h1>
      <button class="button-done" data-index="${index}">done</button>
      <button class="button-delete" data-index="${index}">delete</button>
    `;
    todoList.appendChild(card);
  });
}

todoList.addEventListener("click", (event) => {
  const index = event.target.getAttribute("data-index");

  if (event.target.classList.contains("button-done")) {
    todos[index].completed = !(todos[index].completed)
  }

  if (event.target.classList.contains("button-delete")) {
    todos.splice(index, 1);
  }

  saveAndRender();
});

renderTodos();
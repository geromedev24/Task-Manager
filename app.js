// Step 1 - target elements
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const filterOption = document.querySelector(".filter-todo");
const todoList = document.querySelector(".todo-list");

// Event Listeners
todoButton.addEventListener("click", addTodo);
filterOption.addEventListener("change", filterTodos);
todoList.addEventListener("click", manipulateTodo);

function addTodo(e) {
  // console.log(e.type); type of event
  // console.log(e.target); target element

  // Prevent form submission
  e.preventDefault();

  if (todoInput.value.trim() !== "") {
    // Create the todo card.

    // Create a new todo div.
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    // Create a new list item
    const newTodo = document.createElement("li");
    newTodo.classList.add("todo-item");
    newTodo.textContent = todoInput.value.trim();
    todoDiv.appendChild(newTodo);

    // Create a button to mark the task as completed
    const completeButton = document.createElement("button");
    completeButton.classList.add("complete-btn");
    completeButton.innerHTML = `<i class="fa-solid fa-check"></i>`;
    todoDiv.appendChild(completeButton);

    // Create a button to edit the task
    const editButton = document.createElement("button");
    editButton.classList.add("edit-btn");
    editButton.innerHTML = `<i class="fa-solid fa-pen-to-square"></i>`;
    todoDiv.appendChild(editButton);

    // Create a button to delete the task
    const trashButton = document.createElement("button");
    trashButton.classList.add("trash-btn");
    trashButton.innerHTML = `<i class="fa-solid fa-trash"></i>`;
    todoDiv.appendChild(trashButton);

    todoList.appendChild(todoDiv);
    todoInput.value = "";
  }
}

function getTodosFromLocalStorage() {
  let todosArray = null;
  if (localStorage.getItem("todos") === null) {
    todosArray = [];
  } else {
    todosArray = JSON.parse(localStorage.getItem("todos"));
  }

  return todosArray;
}

function manipulateTodo() {}
function filterTodos() {}

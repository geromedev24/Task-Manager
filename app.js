// Step 1 - target elements
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const filterOption = document.querySelector(".filter-todo");
const todoList = document.querySelector(".todo-list");

// Event Listeners
todoButton.addEventListener("click", addTodo);
filterOption.addEventListener("change", filterTodos);
todoList.addEventListener("click", manipulateTodo);
document.addEventListener("DOMContentLoaded", renderTodos);

function addTodo(e) {
  // console.log(e.type); type of event
  // console.log(e.target); target element

  // Prevent form submission
  e.preventDefault();

  if (todoInput.value.trim() !== "") {
    // Create the todo card.

    // Allows to add the task to the todoArray
    saveLocalToDos(todoInput.value.trim());

    // Create a new todo div.
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    // Create a new list item
    const newTodo = document.createElement("li");
    newTodo.classList.add("todo-item");
    newTodo.textContent = todoInput.value.trim();
    todoDiv.appendChild(newTodo);

    // Create a button to mark the task as completed
    // const completeButton = document.createElement("button");
    // completeButton.classList.add("complete-btn");
    // completeButton.innerHTML = `<i class="fa-solid fa-check"></i>`;

    const completeButton = document.createElement("button");
    completeButton.className = "complete-btn";
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

// Storing data in Local Storage even after refresh
function saveLocalToDos(todo) {
  const todosArray = getTodosFromLocalStorage();
  const toDoObject = { todo: todo, status: "Uncompleted" };
  todosArray.push(toDoObject);
  localStorage.setItem("todos", JSON.stringify(todosArray));
}

function renderTodos() {
  const todosArray = getTodosFromLocalStorage();
  todosArray.forEach((toDoObject) => {
    // Create a new todo div.
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    // Create a new list item
    const newTodo = document.createElement("li");
    newTodo.classList.add("todo-item");
    newTodo.textContent = toDoObject.todo;
    todoDiv.appendChild(newTodo);

    // Create a button to mark the task as completed
    // const completeButton = document.createElement("button");
    // completeButton.classList.add("complete-btn");
    // completeButton.innerHTML = `<i class="fa-solid fa-check"></i>`;

    const completeButton = document.createElement("button");
    completeButton.className = "complete-btn";
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

    if (toDoObject.status != "Uncompleted") {
      todoDiv.classList.add("completed");
    }

    todoList.appendChild(todoDiv);
  });
}

function manipulateTodo(e) {
  const target = e.target;
  if (target.classList.contains("complete-btn")) {
    const todoDiv = target.parentElement;
    if (todoDiv.classList.contains("completed")) {
      // Mark it as uncompleted
      const task = todoDiv.innerText;
      updateToDoStatus(task, "Uncompleted");
      todoDiv.classList.remove("completed");
    } else {
      // Mark it as completed
      const task = todoDiv.innerText;
      updateToDoStatus(task, "Completed");
      todoDiv.classList.add("completed");
    }
  }

  if (target.classList.contains("trash-btn")) {
    const todoDiv = target.parentElement;
    todoDiv.classList.add("fall");
    todoDiv.addEventListener("transitionend", () => {
      todoDiv.remove();
    });
    const task = todoDiv.innerText;
    deleteTodo(task);
  }
}

// Function that updates the ToDoStatus
function updateToDoStatus(todo, newStatus) {
  const todosArray = getTodosFromLocalStorage();
  const toDoObject = todosArray.find((toDoObject) => {
    return toDoObject.todo === todo;
  });
  toDoObject.status = newStatus;
  localStorage.setItem("todos", JSON.stringify(todosArray));
}

// Delete ToDo
function deleteTodo(todo) {
  const todosArray = getTodosFromLocalStorage();
  const todoObjectIndex = todosArray.findIndex((toDoObject) => {
    return toDoObject.todo === todo;
  });
  todosArray.splice(todoObjectIndex, 1);
  localStorage.setItem("todos", JSON.stringify(todosArray));
}

function filterTodos(e) {
  const filterValue = e.target.value;
  console.log("Filter:", filterValue);
  const todos = todoList.childNodes;
  console.log("Todos", todos);

  todos.forEach((todoDiv) => {
    switch (filterValue) {
      case "all":
        todoDiv.style.display = "flex";
        break;
      case "completed":
        if (todoDiv.classList.contains("completed")) {
          todoDiv.style.display = "flex";
        } else {
          todoDiv.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todoDiv.classList.contains("completed")) {
          todoDiv.style.display = "flex";
        } else {
          todoDiv.style.display = "none";
        }
    }
  });
}

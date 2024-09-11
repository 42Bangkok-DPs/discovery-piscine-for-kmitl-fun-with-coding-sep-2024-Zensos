let list = [];
const toDoEl = document.getElementById("ft_list");
const addBtn = document.getElementById("addBtn");

const render = () => {
  toDoEl.innerHTML = "";
  if (!list.length) {
    const empty_list = document.createElement("div");
    empty_list.innerHTML = "No ToDos";
    empty_list.style = "color: white;font-size: 20px;text-align: center;";
    empty_list.classList.add("emptyMessage");
    toDoEl.appendChild(empty_list);
    return;
  }

  list.forEach((value, index) => {
    const toDoItem = createTodoElement(value);
    toDoItem.addEventListener("click", () => {
      removeTodo(index);
    });
    toDoEl.appendChild(toDoItem);
  });
};

const createTodoElement = (value) => {
  const button = document.createElement("button");
  button.classList.add("todoItem");
  button.textContent = value;
  return button;
};

const addTodo = (value) => {
  list.push(value);
  updateCookie(JSON.stringify(list));
  render();
};

const removeTodo = (index) => {
  list.splice(index, 1);
  updateCookie(JSON.stringify(list));
  render();
};

const updateCookie = (value) => {
  setCookie("toDo", value, 7);
};

const setCookie = (key, value, days) => {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = `expires=${date.toUTCString()}`;
  document.cookie = `${key}=${value};${expires};path=/`;
};

const getCookie = (key) => {
  const cookies = document.cookie.split(";");

  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith(key + "=")) {
      return cookie.substring(key.length + 1);
    }
  }
  return null;
};

addBtn.addEventListener("click", () => {
  const newTodo = prompt("New ToDo");
  if (newTodo && newTodo.trim().length > 0) {
    addTodo(newTodo);
  }
});

const oldToDo = getCookie("toDo");
if (oldToDo) {
  list = JSON.parse(oldToDo);
}

render();

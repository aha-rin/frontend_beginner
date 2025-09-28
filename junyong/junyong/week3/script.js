let todos = [
  { id: 1, text: "아침 운동가기", completed: false },
  { id: 2, text: "물 2리터 마시기", completed: false },
  { id: 3, text: "수업 시간에 졸지 않기", completed: true },
  { id: 4, text: "기타 연습하기", completed: false }
];

const todoList = document.getElementById("todoList");

function renderTodos(filter = "all") {
  todoList.innerHTML = "";

  let filtered = todos;
  if (filter === "done") filtered = todos.filter(t => t.completed);
  if (filter === "todo") filtered = todos.filter(t => !t.completed);

  filtered.forEach(todo => {
    const div = document.createElement("div");
    div.classList.add("todo");
    if (todo.completed) div.classList.add("completed");

    const span = document.createElement("span");
    span.textContent = todo.text;

    const btnGroup = document.createElement("div");
    btnGroup.style.display = "flex";
    btnGroup.style.gap = "6px";

    const toggleBtn = document.createElement("button");
    toggleBtn.textContent = todo.completed ? "완료됨" : "완료";
    toggleBtn.classList.add("done");
    toggleBtn.onclick = () => toggleTodo(todo.id);

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "삭제";
    deleteBtn.classList.add("delete");
    deleteBtn.onclick = () => deleteTodo(todo.id);

    btnGroup.appendChild(toggleBtn);
    btnGroup.appendChild(deleteBtn);

    div.style.display = "flex";
    div.style.justifyContent = "space-between";
    div.style.alignItems = "center";

    div.appendChild(span);
    div.appendChild(btnGroup);

    todoList.appendChild(div);
  });
}

function toggleTodo(id) {
  todos = todos.map(todo =>
    todo.id === id ? { ...todo, completed: !todo.completed } : todo
  );
  renderTodos();
}

function deleteTodo(id) {
  todos = todos.filter(todo => todo.id !== id);
  renderTodos();
}

document.getElementById("showAll").onclick = () => renderTodos("all");
document.getElementById("showDone").onclick = () => renderTodos("done");
document.getElementById("showTodo").onclick = () => renderTodos("todo");

renderTodos();
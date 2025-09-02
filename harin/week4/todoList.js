const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const list = document.getElementById("todo-list");
const count = document.getElementById("todo-count");
const filterButtons = document.querySelectorAll(".todo-app__filter-btn");

let todos = [
  { id: 1, text: "아침 명상하기", completed: false },
  { id: 2, text: "물 2리터 마시기", completed: true },
]; // 미리 정의된 할 일 리스트
let currentFilter = "all"; // '전체' 필터를 기본값으로 설정
renderTodos(todos);

// 반짝이는 애니메이션
function updateSparkle() {
  const isEmpty = input.value.trim() === "";
  const isFocused = document.activeElement === input;

  if (isEmpty && !isFocused) {
    input.classList.add("input--sparkle");
  } else {
    input.classList.remove("input--sparkle");
  }
}

// 입력값 변화 감지
input.addEventListener("input", updateSparkle);

// 포커스 시 애니메이션 제거
input.addEventListener("focus", () => {
  input.classList.remove("input--sparkle");
});

// 포커스가 해제되면 애니메이션 재실행
input.addEventListener("blur", updateSparkle);

// 페이지 로드시 초기 상태 확인
window.addEventListener("DOMContentLoaded", updateSparkle);

// 할 일 추가
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (text === "") return;

  const newTodo = {
    id: Date.now(),
    text,
    completed: false,
  };

  todos.push(newTodo);
  input.value = "";
  updateSparkle();
  renderTodos();
});

// 할 일 렌더링
function renderTodos(todoArray) {
  list.innerHTML = "";

  const filtered = todos.filter((todo) => {
    if (currentFilter === "active") return !todo.completed;
    if (currentFilter === "completed") return todo.completed;
    return true;
  });

  filtered.forEach((todo) => {
    const li = document.createElement("li");
    li.className = "todo-app__item";

    const checkGroup = document.createElement("div");
    checkGroup.className = "todo-checkboxes";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;
    checkbox.className = "todo-checkbox";
    checkbox.addEventListener("change", () => toggleComplete(todo.id));

    const span = document.createElement("span");
    span.textContent = todo.text;
    span.className = todo.completed ? "completed" : "";

    checkGroup.appendChild(checkbox);
    checkGroup.appendChild(span);

    const delBtn = document.createElement("button");
    delBtn.textContent = "삭제";
    delBtn.className = "delete-btn";
    delBtn.addEventListener("click", () => deleteTodo(todo.id));

    li.appendChild(checkGroup);
    li.appendChild(delBtn);
    list.appendChild(li);
  });

  updateCount(todoArray);
}

// 완료/미완료 설정
function toggleComplete(id) {
  todos = todos.map((todo) =>
    todo.id === id ? { ...todo, completed: !todo.completed } : todo
  );
  renderTodos();
}

// 삭제
function deleteTodo(id) {
  const target = todos.find((todo) => todo.id === id);
  const confirmDelete = confirm(`'${target.text}' 퀘스트를 포기하시겠습니까?`);

  if (confirmDelete) {
    todos = todos.filter((todo) => todo.id !== id);
    renderTodos();
  }
}

// 필터 버튼
filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    currentFilter = btn.dataset.filter;
    renderTodos();
  });
});

// 남은 할 일 수 업데이트
function updateCount() {
  const remaining = todos.filter((todo) => !todo.completed).length;
  count.textContent = `오늘의 퀘스트 완료까지 앞으로 ${remaining}개!`;
}
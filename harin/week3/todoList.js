const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const list = document.getElementById("todo-list");
const count = document.getElementById("todo-count");
const filterButtons = document.querySelectorAll(".todo-app__filter-btn");

let todos = [
  { id: 1, text: "아침 명상하기", completed: false },
  { id: 2, text: "물 2리터 마시기", completed: true },
  { id: 3, text: "30분 걷기 퀘스트", completed: false },
  { id: 4, text: "책 10페이지 읽기", completed: true },
  { id: 5, text: "코딩 연습 1시간", completed: false },
  { id: 6, text: "친구에게 안부 메시지 보내기", completed: false },
  { id: 7, text: "냉장고 정리하기", completed: true },
  { id: 8, text: "오늘의 감사 3가지 적기", completed: false },
  { id: 9, text: "유튜브 대신 TED 보기", completed: false },
  { id: 10, text: "밤 11시 전에 잠들기", completed: false }
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

/* 
할 일 렌더링
이미 있는 배열을 매개변수로 받아 화면에 렌더링하는 기능
*/
function renderTodos(todoArray) {
  list.innerHTML = "";

  const filtered = todoArray.filter((todo) => {
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
    checkbox.disabled=true; // 체크박스 토글 비활성화 (다음 주차 과제에서 활성화 예정)

    const span = document.createElement("span");
    span.textContent = todo.text;
    span.className = todo.completed ? "completed" : "";

    checkGroup.appendChild(checkbox);
    checkGroup.appendChild(span);

    const delBtn = document.createElement("button");
    delBtn.textContent = "삭제";
    delBtn.className = "delete-btn";

    li.appendChild(checkGroup);
    li.appendChild(delBtn);
    list.appendChild(li);
  });

  updateCount(todoArray);
}

// 필터 버튼
filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    currentFilter = btn.dataset.filter;
    renderTodos(todos);
  });
});

// 남은 할 일 수 업데이트
function updateCount(todoArray) {
  const remaining = todoArray.filter((todo) => !todo.completed).length;
  count.textContent = `오늘의 퀘스트 완료까지 앞으로 ${remaining}개!`;
}
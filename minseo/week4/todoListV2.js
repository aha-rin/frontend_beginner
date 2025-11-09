// 할 일 목록 데이터 (JSON에서 로드)
let todos = [];

// 현재 필터 상태 ("all", "pending", "completed")
let currentFilter = "all";

// DOM 요소들 (재할당 없음)
const todoListElement = document.getElementById("todoList"); // 할 일 목록 컨테이너
const filterButtons = document.querySelectorAll(".filter-btn"); // 필터 버튼들

// 상태 카운트 요소들
const totalCountElement = document.getElementById("totalCount");
const completedCountElement = document.getElementById("completedCount");
const pendingCountElement = document.getElementById("pendingCount");

// JSON 파일에서 할 일 목록을 로드하는 함수
// async & await 사용을 통한 json 데이터 로드
async function loadTodos() {
  try {
    const response = await fetch("todosV2.json");
    if (!response.ok) throw new Error("파일을 불러올 수 없습니다");

    const data = await response.json();
    todos = data.todos;
    renderTodos();
  } catch (err) {
    console.error("에러 발생:", err);
    alert("할 일 목록을 불러오는 데 실패했습니다.");
  }
}

// 초기화 및 이벤트 리스너 설정
document.addEventListener("DOMContentLoaded", () => {
    loadTodos();
    setupEventListeners();
    setupAddTodo();
});

// 이벤트 리스너 설정 함수
function setupEventListeners() {
    // 필터 버튼 클릭 이벤트
    // forEach : 배열의 각 요소에 대해 주어진 함수를 호출
    filterButtons.forEach(button => {
        button.addEventListener("click", function () {
            // 클릭된 버튼의 data-filter 속성 값 가져오기
            const filter = this.getAttribute("data-filter");

            // 활성 필터 설정 및 렌더링
            setActiveFilter(filter);
            renderTodos();
        });
    });
}

// 할 일 추가 입력창/버튼 이벤트
function setupAddTodo() {
    const addBtn = document.getElementById("addTodoBtn");
    const input = document.getElementById("newTodoInput");

    addBtn.addEventListener("click", () => {
        addTodo();
    });

    input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            addTodo();
        }
    });
}

// 할 일 추가 함수
function addTodo() {
    const input = document.getElementById("newTodoInput");
    const text = input.value.trim();

    if (!text)
        return;

    // 고유 id 생성 (가장 큰 id + 1)
    const maxId = todos.length > 0 ? Math.max(...todos.map(t => t.id)) : 0;
    const newTodo = {
        id: maxId + 1,
        text,
        completed: false
    };

    todos.push(newTodo);
    input.value = "";
    
    renderTodos();
}

// 활성 필터 설정
function setActiveFilter(filter) {
    // 현재 필터 업데이트
    currentFilter = filter;

    // 버튼 활성화 상태 업데이트
    filterButtons.forEach(btn => btn.classList.remove("active"));

    // 활성화된 버튼에 "active" 적용
    const activeButton = document.querySelector(`[data-filter = "${filter}"]`);

    if (activeButton)
        activeButton.classList.add("active");
}

// 필터링
function getFilteredTodos() {
    // 필터에 따른 todos 반환
    if (currentFilter === "completed")
        return todos.filter(t => t.completed);

    if (currentFilter === "pending")
        return todos.filter(t => !t.completed);

    return todos;
}

// 렌더링
function renderTodos() {
    // 필터링된 할 일 목록 가져오기
    const filteredTodos = getFilteredTodos();

    // 목록이 비어있을 때 처리
    if (filteredTodos.length === 0) {
        todoListElement.innerHTML =
        `
            <div class = "empty-message">
                ${getEmptyMessage()}
            </div>
        `;

        updateStatusCounts();
    }

    // 할 일 목록 HTML 생성 및 삽입
    // map : 배열의 각 요소에 대해 주어진 함수를 호출하고, 그 결과로 새로운 배열을 생성
    const todoHTML = filteredTodos.map(createTodoHTML).join("");
    todoListElement.innerHTML = todoHTML;

    // 상태 카운트 업데이트
    updateStatusCounts();
}

// 개별 Todo HTML
function createTodoHTML(todo) {
    return`
        <div class = "todo-item ${todo.completed ? "completed" : ""}" data-id = "${todo.id}">
            <div class="todo-content">
                <div class = "todo-checkbox ${todo.completed ? "checked" : ""}" onclick = "toggleTodo(${todo.id})"></div>
                <span class = "todo-text">${todo.text}</span>
            </div>
            <span class = "status-badge">${todo.completed ? "완료" : "미완료"}</span>
            <button class="delete-btn" onclick="deleteTodo(${todo.id})">삭제</button>
        </div>
    `;
}

// 빈 목록 메시지
function getEmptyMessage() {
    if (currentFilter === "completed")
        return "완료된 할 일이 없습니다.";

    if (currentFilter === "pending")
        return "모든 할 일을 완료했습니다!";

    return "등록된 할 일이 없습니다.";
}

// 완료 토글
function toggleTodo(id) {
    const todo = todos.find(t => t.id === id);
    if (todo) {
        todo.completed = !todo.completed;
        renderTodos();
    }
}

// 할 일 삭제 함수
function deleteTodo(id) {
    todos = todos.filter(t => t.id !== id);
    renderTodos();
}

// 상태 카운트
function updateStatusCounts() {
    // 전체, 완료, 미완료 개수 계산
    const totalCount = todos.length;
    const completedCount = todos.filter(t => t.completed).length;
    const pendingCount = totalCount - completedCount;

    // 상태 카운트 표시 업데이트
    totalCountElement.textContent = `전체: ${totalCount}개`;
    completedCountElement.textContent = `완료: ${completedCount}개`;
    pendingCountElement.textContent = `미완료: ${pendingCount}개`;
}
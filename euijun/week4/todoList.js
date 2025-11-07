// DOM 요소 선택
const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const list = document.getElementById("todo-list");
const count = document.getElementById("todo-count");
const filterButtons = document.querySelectorAll(".todo-page__filter-btn");

// todo 리스트 기본 도전과제 설정
let todos = [
    { number: 1, text: "학교 수업 빠지지 않고 듣기", completed: false },
    { number: 2, text: "일본어 JLPT 자격증 공부하기", completed: false },
    { number: 3, text: "GdGoc 이번 주 과제 완료하기", completed: true },
    { number: 4, text: "가슴 운동", completed: true },
    { number: 5, text: "어깨 운동", completed: false },
    { number: 6, text: "등 운동", completed: true },
    { number: 7, text: "하체 운동", completed: false },
];

// 맨 처음 필터를 전체로 설정하여 기본 도전과제 출력
let currentFilter = "all";
renderList(todos);

// 새로 입력받은 도전과제 추가하기
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (text != "") {
        todos.push({ number: Date.now(), text: text, completed: false });
        input.value = "";
        renderList();
        const newLi = list.lastChild;
        if (newLi) {    // 새로 추가된 도전과제로 포커스 이동
            newLi.tabIndex = -1;
            newLi.scrollIntoView({ behavior: "smooth", block: "center" });
        }
    }
});

// 필터 버튼 클릭 시 필터링된 도전과제 출력
filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        currentFilter = button.getAttribute("data-filter");
        renderList();
        list.focus();   //리스트로 포커스 이동
        list.scrollIntoView({ behavior: "smooth", block: "center" });
    });
});

// 리스트 렌더링
function renderList(todoList) {
    list.innerHTML = "";    //리스트 초기화
    // 필터링된 새로운 리스트 생성
    let filteredTodos = todos.filter(todo => {
        if (currentFilter === "continuing") return !todo.completed;
        else if (currentFilter === "completed") return todo.completed;
        else return true;
    })
    // 남은 도전과제 개수 업데이트
    const remaining = todos.filter(todo => !todo.completed).length;
    document.getElementById("todo-count-num").textContent = remaining;
    // 필터링된 리스트를 기반으로 도전과제 렌더링
    filteredTodos.forEach(todo => {
        //  li 요소 생성
        const li = document.createElement("li");
        li.classList.add("todo-page__li");
        //  도전과제 텍스트 생성
        const span = document.createElement("span");
        span.textContent = todo.text;
        if (todo.completed) {
            span.classList.add("completed");
        }
        // 버튼 박스 생성
        const btnBox = document.createElement("div");
        btnBox.className = "todo-page__btnBox";

        //  완료 버튼 생성
        const completeBtn = document.createElement("button");
        completeBtn.classList.add("todo-page__complete-btn");
        completeBtn.textContent = todo.completed ? "아직.." : "완료!";
        completeBtn.classList.toggle("todo-page__complete-btn--completed", todo.completed);
        completeBtn.classList.toggle("todo-page__complete-btn--continuing", !todo.completed);
        completeBtn.addEventListener("click", () => {
            todo.completed = !todo.completed;
            renderList();
        });
        // 삭제 버튼 생성
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "포기";
        deleteBtn.classList.add("todo-page__delete-btn");
        deleteBtn.addEventListener("click", () => {
            if (confirm("정말 포기하시겠나요ㅠㅠ?")) {
                todos = todos.filter(t => t !== todo);
                renderList();
            }
        });
        // 버튼 박스에 완료, 삭제 버튼 추가
        btnBox.appendChild(completeBtn);
        btnBox.appendChild(deleteBtn);
        // li 요소에 텍스트, 버튼박스 추가
        li.appendChild(span);
        li.appendChild(btnBox);
        // ul 요소에 li 요소 추가
        list.appendChild(li);
    })
}
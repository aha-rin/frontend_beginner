const listElement = document.getElementById("todo-list");
const form = document.getElementById("todo-form");
const input = document.getElementById("todo__input");
const filterButtons = document.querySelectorAll(".todo__filter-btn");

let todos = [
  {id: 1, text: "전공 강의 듣기", completed: false},
  {id: 2, text: "오늘 들은 강의 복습", completed: true},
  {id: 3, text: "늦잠 자지 않기", completed: true},
  {id: 4, text: "프론트엔드 공부", completed: true},
  {id: 5, text: "오늘까지인 과제 완료", completed: true},
  {id: 6, text: "유튜브 시청 1시간 미만", completed: false},
  {id: 7, text: "게임 참기", completed: false},
  {id: 8, text: "알찬 하루 보내기", completed: false},
  {id: 9, text: "물 많이 마시기", completed: false}
];

let currentFilter = "all";

// submit = 입력창에서 Enter를 누를 대 발생하는 이벤트
// 익명 콜백 약간 C에서 람다함수랑 비슷한 느낌인 듯
form.addEventListener("submit", function (e) { // function (e) {...} 콜백 함수 => 이벤트가 실제로 일어났을 때 *나중에* 브라우저가 호출하는 함수. e를 넘겨줌
    e.preventDefault(); // 폼의 기본 동작(페이지 이동/새로고침으로 서버 전송)을 막아줌
    const text = input.value.trim();
    if (text === "") return;

    // Date.now() => 현재 시간을 숫자로 반환하는 표준함수
    // 해당 코드에서는 간단하게 고유 ID를 만드는 용도로 사용
    todos.push({ id: Date.now(), text: text, completed: false });
    input.value = "";
    renderTodos();
});

function renderTodos() {
    listElement.innerHTML = "";

    const filtered = []; // .filter메서드를 활용해도 되는거 같음
    for (let i = 0; i < todos.length; i++){
        const todo = todos[i];
        if (currentFilter === "notYet" && !todo.completed) {
            filtered.push(todo); 
            continue;
        }
        if (currentFilter === "completed" && todo.completed){
            filtered.push(todo);
            continue;
        }
        if (currentFilter !== "notYet" && currentFilter !== "completed"){
            filtered.push(todo);
        }
    }
    // .forEach메서드 => 배열의 각 요소에 대해 한 번씩 함수를 실행해주는 배열 메서드
    filtered.forEach(function (todo) {
        const li = document.createElement("li");
        li.className = "todo__item";

        const checkGroup = document.createElement("div");
        checkGroup.className = "todo-checkboxes";

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = todo.completed;
        checkbox.className = "todo__checkbox";
        // .addEventListener메서드 => 특정 이벤트가 발생하면 함수를 실행
        checkbox.addEventListener("change", function () {
            toggleComplete(todo.id);
        });

        const span = document.createElement("span");
        span.textContent = todo.text;
        span.className = todo.completed ? "completed" : "";

        checkGroup.appendChild(checkbox);
        checkGroup.appendChild(span);

        const delBtn = document.createElement("button");
        delBtn.type = "button";
        delBtn.textContent = "삭제";
        delBtn.className = "todo__delete-button";
        delBtn.addEventListener("click", function () {
            deleteTodo(todo.id);
        });

        li.appendChild(checkGroup);
        li.appendChild(delBtn);
        listElement.appendChild(li);
    });
  updateActiveFilterButton();
}

function toggleComplete(id) {
    // map 메서드 => 배열의 각 요소를 변환해서 같은 길이의 새 배열을 만드는 자바스크립트 배열 메서드
    todos = todos.map(function (todo) {
    if (todo.id === id) {
      return { id: todo.id, text: todo.text, completed: !todo.completed };
    }
    return todo;
    });
    renderTodos();
}

function deleteTodo(id) {
    const target = todos.find(function (t) { return t.id === id; });
    if (!target) return;
    // confirm 함수 => 브라우저가 제공하는 모달 확인 대화상자를 띄우는 전역함수
    // alert와의 차이점 => alert는 확인 버튼만 있는 알림임.
    const ok = confirm("'" + target.text + "' 퀘스트를 삭제할까요?");
    if (!ok) return;

    todos = todos.filter(function (t) { return t.id !== id; });
    renderTodos();
}

filterButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
    currentFilter = btn.dataset.filter;
    renderTodos();
    });
});

function updateActiveFilterButton() {
    filterButtons.forEach(function (btn) {
        // remove("클래스")를 통하여 클래스를 제거함
        btn.classList.remove("todo__filter-btn--active");
        if (btn.dataset.filter === currentFilter) {
            btn.classList.add("todo__filter-btn--active");
        }
    });
}

renderTodos();

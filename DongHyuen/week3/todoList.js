const listElement = document.getElementById("todo-list");

// var보다는 let이 기능적으로 더 좋다고 함 + 최신 트렌드?
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

function render() {
    listElement.innerHTML = ''; // 화면 비우기

    for (let i = 0; i < todos.length; i++) {
        let todo = todos[i];

        if (currentFilter === "notYet" && todo.completed === true) continue;
        if (currentFilter === "completed" && todo.completed === false) continue;

        // createElement(): 지정한 tagName의 HTML 요소를 만들어서 반환
        let listEl = document.createElement("li");
        // .className: 특정 엘리먼트의 클래스 속성의 값을 가져오거나 설정할 수 있다
        listEl.className = 'todo__item';

        let span = document.createElement("span");
        span.textContent = todo.text;

        if (todo.completed === true) {
            span.className = "completed";
        }
        // appendChild(): 한 노드를 특정 부모 노드의 자식 노드 리스트 중 마지막 자식으로 붙임
        listEl.appendChild(span);
        listElement.appendChild(listEl);
    }
}

// button.addEventListener("click", 실행할 함수);로 추후에 변경 가능
function changeFilter(fil){
    currentFilter = fil;
    render();
}

render();

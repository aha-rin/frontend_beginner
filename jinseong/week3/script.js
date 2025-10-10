var todos = [
    { text: "밥먹기", completed: false },
    { text: "축구하기", completed: false },
    { text: "수영하기", completed: false },
    { text: "배드민턴하기", completed: false },
    { text: "영화보기", completed: false }
];

var list = document.getElementById('list');
var input = document.getElementById('input');
var checkButton = document.getElementById('check');
var incompleteButton = document.getElementById('incomplete');

var showOnlyIncomplete = false;

function renderTodos() {
    list.innerHTML = "";

    todos.forEach((todo, index) => {
        if (showOnlyIncomplete && todo.completed) return;

        var li = document.createElement('li');
        li.className = 'todo-list__item';

        var checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'todo-list__checkbox';
        checkbox.checked = todo.completed;

        var span = document.createElement('span');
        span.textContent = todo.text;
        span.className = 'todo-list__text';
        if (todo.completed) {
            span.style.textDecoration = 'line-through';
            span.style.color = 'lightgray';             
        } else {
            span.style.textDecoration = 'none';
            span.style.color = 'white';
        }

       
        checkbox.addEventListener('change', function() {
            todo.completed = checkbox.checked;
            renderTodos();
        });

        li.appendChild(checkbox);
        li.appendChild(span);
        list.appendChild(li);
    });
}

incompleteButton.addEventListener('click', function() {
    showOnlyIncomplete = !showOnlyIncomplete;
     if (showOnlyIncomplete) {
        incompleteButton.textContent = "전체보기";
    } else {
        incompleteButton.textContent = "미완료";
    }
    renderTodos();
});


renderTodos();

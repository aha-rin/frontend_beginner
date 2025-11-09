var todos = [];
var list = document.getElementById('list');
var input = document.getElementById('input');
var checkButton = document.getElementById('check');
var incompleteButton = document.getElementById('incomplete');
var showOnlyIncomplete = false;



function renderTodos() {
    list.innerHTML = ''; 

    todos.forEach((todo, index) => {
        if (showOnlyIncomplete && todo.completed) return;

        var li = document.createElement('li');
        li.className = 'todo-list__item';

        var checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = todo.completed;

        var span = document.createElement('span');
        span.textContent = todo.text;
        span.className = 'todo-list__text';
        updateTodoStyle(span, todo.completed);

        var deleteButton = document.createElement('button');
        deleteButton.textContent = '삭제';
        deleteButton.className = 'todo-list__delete';

     
        deleteButton.addEventListener('click', function() {
            todos.splice(index, 1);
            renderTodos();
        });

      
        checkbox.addEventListener('change', function() {
            todo.completed = checkbox.checked;
            updateTodoStyle(span, todo.completed);
        });

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(deleteButton);
        list.appendChild(li);
    });
}

function updateTodoStyle(span, completed) {
    if (completed) {
        span.style.textDecoration = 'line-through';
        span.style.color = 'lightgray';
    } else {
        span.style.textDecoration = 'none';
        span.style.color = 'white';
    }
}


checkButton.addEventListener('click', function() {
    var text = input.value.trim();
    if (text === '') {
        alert('할 일을 입력해주세요');
        return;
    }
    todos.push({ text: text, completed: false });
    input.value = '';
    renderTodos();
});


incompleteButton.addEventListener('click', function() {
    showOnlyIncomplete = !showOnlyIncomplete;
    incompleteButton.textContent = showOnlyIncomplete ? '전체보기' : '미완료';
    renderTodos();
});

renderTodos();
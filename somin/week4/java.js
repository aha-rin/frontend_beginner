var todos = ['응용수학 강의듣기', '디지털회로실험 예비보고서 적기'];
var finish = [false, false];

function addTodo() {
    var inputElement = document.getElementById('inputBox');
    var value = inputElement.value;
    todos.push(value);
    finish.push(false);
    drawlists();
    alert('좋아! 해보자!');
}

function deleteTodo(index) {
    todos.splice(index, 1);
    finish.splice(index, 1);
    drawlists();
    alert('정말 안 해도 돼?');
}

//색 night day
function finish_yet_Handler(button, index) {
    var target = document.querySelector('#text' + index);
    if (finish[index] === false) {
        target.style.backgroundColor = 'powderblue';
        target.style.color = 'white';
        button.innerHTML = 'finished.html';
        finish[index] = true;
    } else {
        target.style.backgroundColor = '#e7d0ff';
        target.style.color = 'black';
        button.innerHTML = 'yet.html';
        finish[index] = false;
    }
}

var currentPage = window.location.pathname;

function drawlists() {
    var i = 0;
    var html = '';
    while (i < todos.length) {
        var shouldShow = false;

        if (currentPage.includes('total.html')) {
            shouldShow = true;
        } else if (currentPage.includes('미완료test.html')) {
            shouldShow = (finish[i] === false);
        } else if (currentPage.includes('완료.html')) {
            shouldShow = (finish[i] === true);
        }

        if (shouldShow) {
            html = html + '<li><button onclick="finish_yet_Handler(this,' + i + ')">미완료</button> <span id="text' + i + '" style="background-color: #e7d0ff;">' + todos[i] + '</span> <button onclick="deleteTodo(' + i + ')">삭제</button></li>';
        }

        i = i + 1;
    }
    document.getElementById('todoList').innerHTML = html;
}

drawlists();
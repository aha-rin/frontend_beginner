const input = document.getElementById("todo-input");
const addBtn = document.getElementById("add-btn");
const list = document.getElementById("todo-list");
const filterBtns = document.querySelectorAll(".filter-btn");

let todos = [
    { id: 1, text: "기타 연습하기", completed: false},
    { id: 2, text: "하루 물 2리터 마시기", completed: true}
]; 
let filter = "all";

// 할 일 추가
addBtn.addEventListener("click", () => {
  const text = input.value.trim();
  if (text === "") {
    alert("할 일을 입력하세요!");
    return;
  }

  todos.push({ text: text, done: false });
  input.value = "";
  showList();
});

// 필터 버튼 클릭
filterBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    filter = btn.dataset.filter;
    filterBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    showList();
  });
});

// 리스트 표시
function showList() {
  list.innerHTML = "";

  let filtered = todos;
  if (filter === "active") {
    filtered = todos.filter(t => !t.done);
  } else if (filter === "completed") {
    filtered = todos.filter(t => t.done);
  }

  filtered.forEach((todo, index) => {
    const li = document.createElement("li");
    if (todo.done) li.classList.add("done");

    // 완료/미완료 체크박스
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.done;
    checkbox.addEventListener("change", () => {
      todo.done = !todo.done;
      showList();
    });

    // 텍스트
    const span = document.createElement("span");
    span.textContent = todo.text;

    // 삭제 버튼
    const delBtn = document.createElement("button");
    delBtn.textContent = "삭제";
    delBtn.className = "del-btn";
    delBtn.addEventListener("click", () => {
      const ok = confirm("정말 삭제하시겠습니까?");
      if (오케이) {
        todos.splice(index, 1);
        alert("삭제되었습니다.");
        showList();
      }
    });

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(delBtn);
    list.appendChild(li);
  });
}

// 초기 화면 표시
showList();
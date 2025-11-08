import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  //할 일 목록을 useState. todo_list는 현재 상태 값, setTodoList는 상태 변경 함수
  const [todo_list, setTodoList] = useState([
    { text: "독서하기", completed: false },
    { text: "공부하기", completed: false },
    { text: "물 2L 마시기", completed: false },
  ]);

  const [currentFilter, setCurrentFilter] = useState("all");
  const [text, setText] = useState("");

  const renderTodo = () => {
    return todo_list.filter((item) => {
      if (currentFilter === "active") return !item.completed;
      if (currentFilter === "completed") return item.completed;
      return true;
    });
  };
  const handleAdd = (e) => {
    e.preventDefault();
    if (text.trim() === "") {
      alert("할 일을 입력해주세요.");
      return;
    }
    setTodoList([...todo_list, { text: text, completed: false }]);
    setText("");
  };

  const toggleCompleted = (index) => {
    const updated = [...todo_list];
    updated[index].completed = !updated[index].completed;
    setTodoList(updated);
  };

  const handleDelete = (index) => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      const updated = todo_list.filter((_, i) => i !== index);
      setTodoList(updated);
    }
  }

  const handleFilterChange = (filterType) => {
    setCurrentFilter(filterType);
  };


  return (
    // 여기에는 html 내용 
    <div id="total">
      <h2>To Do LIST</h2>

      <form id="addForm" onSubmit={handleAdd}>
        <input
          type="text"
          id="new-todo"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button type="submit" id="addbutton">
          추가
        </button>
      </form>

      <div className="button">
        <input
          type="button"
          id="all"
          value="전체"
          onClick={() => handleFilterChange("all")}
        />
        <input
          type="button"
          id="completed"
          value="완료"
          onClick={() => handleFilterChange("completed")}
        />
        <input
          type="button"
          id="active"
          value="미완료"
          onClick={() => handleFilterChange("active")}
        />
      </div>

      <ul id="todo">
        {renderTodo().map((item, index) => (
          <li key={index}>
            <input
              type="checkbox"
              checked={item.completed}
              onChange={() => toggleCompleted(index)}
            />
            {/* 리액트에서 class는 className으로  */}
            <span className={item.completed ? "done" : ""}>{item.text}</span>
            <button onClick={() => handleDelete(index)}>삭제</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

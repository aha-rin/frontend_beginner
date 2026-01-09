import { useState, useMemo } from "react";
import "./App.css";

export default function App() {
  const [todos, setTodos] = useState([
    { id: 1, text: "전공 강의 듣기", completed: false },
    { id: 2, text: "오늘 들은 강의 복습", completed: true },
    { id: 3, text: "늦잠 자지 않기", completed: true },
    { id: 4, text: "프론트엔드 공부", completed: true },
    { id: 5, text: "오늘까지인 과제 완료", completed: true },
    { id: 6, text: "유튜브 시청 1시간 미만", completed: false },
    { id: 7, text: "게임 참기", completed: false },
    { id: 8, text: "알찬 하루 보내기", completed: false },
    { id: 9, text: "물 많이 마시기", completed: false },
  ]);

  const [text, setText] = useState("");
  const [filter, setFilter] = useState("all");

  const addTodo = () => {
    const t = text.trim();
    if (!t) return;
    setTodos((prev) => [...prev, { id: Date.now(), text: t, completed: false }]);
    setText("");
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") addTodo();
  };

  const toggleComplete = (id) => {
    setTodos((prev) =>
      prev.map((it) => (it.id === id ? { ...it, completed: !it.completed } : it))
    );
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((it) => it.id !== id));
  };

  const filtered = useMemo(() => {
    if (filter === "completed") return todos.filter((t) => t.completed);
    if (filter === "notYet") return todos.filter((t) => !t.completed);
    return todos;
  }, [todos, filter]);

  return (
    <main className="todo" role="main">
      <header className="todo__header">
        <h1 className="todo__title">Have to do</h1>

        <div className="todo__controls">
          <label htmlFor="todo-input" className="todo__sr-only">
            
          </label>
          <input
            id="todo-input"
            className="todo__input"
            type="text"
            placeholder="할 일을 입력하고 Enter 또는 추가 버튼"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={onKeyDown}
          />
          <button type="button" className="todo__filter-btn" onClick={addTodo}>
            추가
          </button>
        </div>

        <div className="todo__filter">
          <button
            type="button"
            className={`todo__filter-btn ${
              filter === "all" ? "todo__filter-btn--active" : ""
            }`}
            onClick={() => setFilter("all")}
          >
            전체
          </button>
          <button
            type="button"
            className={`todo__filter-btn ${
              filter === "completed" ? "todo__filter-btn--active" : ""
            }`}
            onClick={() => setFilter("completed")}
          >
            완료
          </button>
          <button
            type="button"
            className={`todo__filter-btn ${
              filter === "notYet" ? "todo__filter-btn--active" : ""
            }`}
            onClick={() => setFilter("notYet")}
          >
            미완료
          </button>
        </div>
      </header>

      <div className="todo__list">
        <h3 className="todo__list-title">Today</h3>

        <div className="todo__footer">
          <span id="todo-count" aria-live="polite" className="todo__notYet">
            총 {filtered.length}개
          </span>
        </div>

        <ul id="todo-list" className="todo__list-element">
          {filtered.map((todo) => (
            <li key={todo.id} className="todo__item">
              <label className="todo-checkboxes">
                <input
                  type="checkbox"
                  className="todo__checkbox"
                  checked={todo.completed}
                  onChange={() => toggleComplete(todo.id)}
                />
                <span className={todo.completed ? "completed" : ""}>
                  {todo.text}
                </span>
              </label>

              <button
                type="button"
                className="todo__delete-button"
                onClick={() => deleteTodo(todo.id)}
              >
                삭제
              </button>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}

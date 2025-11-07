import React, { useState, useRef, useEffect } from "react";
import "./TodoApp.css";

export default function App() {
  // 도전과제 초기화
  const [todos, setTodos] = useState([
    { id: 1, text: "학교 수업 빠지지 않고 듣기", completed: false },
    { id: 2, text: "일본어 JLPT 자격증 공부하기", completed: false },
    { id: 3, text: "GdGoc 이번 주 과제 완료하기", completed: true },
    { id: 4, text: "가슴 운동", completed: true },
    { id: 5, text: "어깨 운동", completed: false },
    { id: 6, text: "등 운동", completed: true },
    { id: 7, text: "하체 운동", completed: false },
  ]);

  // 필터 초기화
  const [filter, setFilter] = useState("all");

  // 입력값 초기화
  const [input, setInput] = useState("");

  // DOM 접근용 ref
  const listRef = useRef(null);

  // 마지막에 추가된 항목을 useEffect에서 포커스 이동
  const lastAddedIdRef = useRef(null);

  // 필터링된 목록
  const filteredTodos = todos.filter((todo) => {
    if (filter === "continuing") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  // 남은 도전과제 개수
  const remaining = todos.filter((todo) => !todo.completed).length;

  // 도전과제 추가
  const addTodo = (e) => {
    e.preventDefault();
    const text = input.trim();
    if (text === "") return;

    const newTodo = { id: Date.now(), text, completed: false };
    setTodos((prev) => [...prev, newTodo]);
    setInput("");

    lastAddedIdRef.current = newTodo.id;
  };

  // 새 도전과제 추가 시 해당 도전과제로 스크롤/포커스
  useEffect(() => {
    const newId = lastAddedIdRef.current;
    if (!newId) return;

    const ul = listRef.current;
    if (!ul) {
      lastAddedIdRef.current = null;
      return;
    }

    const newLi = ul.querySelector(`#todo-${newId}`);
    if (newLi) {
      newLi.tabIndex = -1;
      newLi.scrollIntoView({ behavior: "smooth", block: "center" });
      newLi.focus();
    }

    lastAddedIdRef.current = null;
  }, [todos]);

  // 완료버튼으로 토글
  const toggleComplete = (id) => {
    setTodos((prev) => prev.map((todo) => (
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    )));
  };

  // 포기버튼으로 삭제
  const deleteTodo = (id) => {
    if (window.confirm("정말 포기하시겠나요ㅠㅠ?")) {
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
    }
  };

  return (
    <>
      <header className="todo-page__header" role="banner">
        <h1 className="todo-page__title">나의 이번 주 도전과제</h1>
      </header>

      <main className="todo-page" role="main">
        <section className="todo-page__form-section">
          <form id="todo-form" className="todo-page__form" autoComplete="off" onSubmit={addTodo}>
            <label htmlFor="todo-input" className="todo-page__phrase">매 주 도전과제를 만들어 성취하자!</label>

            <div className="todo-page__filters">
              <button
                type="button"
                className={`todo-page__filter-btn ${filter === "all" ? "todo-page__filter-btn--active" : ""}`}
                data-filter="all"
                onClick={() => setFilter("all")}
              >
                전체 도전과제
              </button>

              <button
                type="button"
                className={`todo-page__filter-btn ${filter === "continuing" ? "todo-page__filter-btn--active" : ""}`}
                data-filter="continuing"
                onClick={() => setFilter("continuing")}
              >
                진행중인 도전과제
              </button>

              <button
                type="button"
                className={`todo-page__filter-btn ${filter === "completed" ? "todo-page__filter-btn--active" : ""}`}
                data-filter="completed"
                onClick={() => setFilter("completed")}
              >
                완료한 도전과제
              </button>
            </div>

            <input
              id="todo-input"
              className="todo-page__input"
              type="text"
              placeholder="Enter키를 눌러 새로운 도전과제를 추가하세요!"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </form>
        </section>

        <section className="todo-page__list-section">
          <h3 className="todo-page__lists">도전과제 목록</h3>
          <img src="challenges-trophy.jpg" alt="트로피 이미지" className="todo-page__image" />

          <ul id="todo-list" className="todo-page__list" ref={listRef} tabIndex={-1}>
            {filteredTodos.map((todo) => (
              <li key={todo.id} id={`todo-${todo.id}`} className="todo-page__li" tabIndex={-1}>
                <span className={`todo-page__text ${todo.completed ? "completed" : ""}`}>{todo.text}</span>
                <div className="todo-page__btnBox">
                  <button
                    className={`todo-page__complete-btn ${todo.completed ? "todo-page__complete-btn--completed" : "todo-page__complete-btn--continuing"}`}
                    onClick={() => toggleComplete(todo.id)}
                  >
                    {todo.completed ? "아직.." : "완료!"}
                  </button>

                  <button className="todo-page__delete-btn" onClick={() => deleteTodo(todo.id)}>포기</button>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </main>

      <footer className="todo-page__footer">
        <span id="todo-count" className="todo-page__count">앞으로 남은 도전과제 <span id="todo-count-num" className="todo-page__count-num">{remaining}</span>개!</span>
      </footer>
    </>
  );
}

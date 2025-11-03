// React 훅과 CSS 파일 불러오기
import { useState, useEffect } from 'react';
import './App.css';

function App() {
  // 초기 할 일 목록 설정
  const [todos, setTodos] = useState([
    { id: 1, text: '아침 명상하기', completed: false },
    { id: 2, text: '물 2리터 마시기', completed: true },
  ]);

  const [filter, setFilter] = useState('all');
  // 입력 초기화
  const [input, setInput] = useState('');

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  // 완료되지 않은 할 일 개수 계산
  const remaining = todos.filter(todo => !todo.completed).length;

  const addTodo = e => {
    e.preventDefault();
    const text = input.trim();
    if (text === '') return;
    const newTodo = { id: Date.now(), text, completed: false };
    setTodos(prev => [...prev, newTodo]);
    setInput('');
  };

  // 할 일 완료 여부 토글 - prev를 통해 이전의 완료/미완료 상태를 전달
  const toggleComplete = id => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // 할 일 삭제
  const deleteTodo = id => {
    const target = todos.find(todo => todo.id === id);
    if (window.confirm(`'${target.text}' 퀘스트를 포기하시겠습니까?`)) {
      setTodos(prev => prev.filter(todo => todo.id !== id));
    }
  };

  const updateSparkle = () => {
    const inputEl = document.getElementById('todo-input');
    const isEmpty = input.trim() === '';
    const isFocused = document.activeElement === inputEl;
    if (inputEl) {
      if (isEmpty && !isFocused) {
        inputEl.classList.add('input--sparkle');
      } else {
        inputEl.classList.remove('input--sparkle');
      }
    }
  };

  // 포커스/블러 이벤트 리스너를 통한 반짝이 효과 제어
  useEffect(() => {
    const inputEl = document.getElementById('todo-input');
    if (!inputEl) return;

    // 최초 렌더링 시 useEffect 실행
    updateSparkle();

    const handleFocus = () => inputEl.classList.remove('input--sparkle');
    const handleBlur = () => updateSparkle(); // 다시 포커스되면 실행

    // useEffect는 최초 마운트 시에만 실행되지만, DOM에 등록된 이벤트 리스너는 소멸하지 않음
    inputEl.addEventListener('focus', handleFocus);
    inputEl.addEventListener('blur', handleBlur);

    return () => {
      // 컴포넌트 언마운트(화면에서 사라짐) 시 이벤트 리스너도 삭제
      inputEl.removeEventListener('focus', handleFocus);
      inputEl.removeEventListener('blur', handleBlur);
    };
  }, []);

  // UI를 렌더링하는 return문(이 안에 JSX 표현식 작성)
  return (
    <main className="todo-app" role="main">
      <header className="todo-app__header">
        <h1 className="todo-app__title">오늘의 퀘스트</h1>
        <form className="todo-app__form" onSubmit={addTodo} autoComplete="off">
          <label htmlFor="todo-input" className="todo-app__phrase">
            * 어떤 퀘스트를 완료해볼까요? *
          </label>

          {/* 필터 */}
          <div className="todo-app__filters">
            <button
              type="button"
              className="todo-app__filter-btn"
              onClick={() => setFilter('all')}
            >
              전체
            </button>
            <button
              type="button"
              className="todo-app__filter-btn"
              onClick={() => setFilter('active')}
            >
              미완료
            </button>
            <button
              type="button"
              className="todo-app__filter-btn"
              onClick={() => setFilter('completed')}
            >
              완료
            </button>
          </div>

          {/* 할 일 입력창 */}
          <input
            id="todo-input"
            className="todo-app__input"
            type="text"
            placeholder="Enter를 눌러 새로운 퀘스트 등록"
            value={input}
            onChange={e => setInput(e.target.value)}
          />
        </form>
      </header>

      <section className="todo-app__list-section">
        <h3 className="todo-app__lists">퀘스트 목록</h3>
        <ul className="todo-app__list">
          {filteredTodos.map(todo => (
            <li key={todo.id} className="todo-app__item">
              <div className="todo-checkboxes">
                <input
                  type="checkbox"
                  className="todo-checkbox"
                  checked={todo.completed}
                  onChange={() => toggleComplete(todo.id)}
                />
                <span className={todo.completed ? 'completed' : ''}>
                  {todo.text}
                </span>
              </div>
              <button className="delete-btn" onClick={() => deleteTodo(todo.id)}>
                삭제
              </button>
            </li>
          ))}
        </ul>
      </section>

      <footer className="todo-app__footer">
        <span className="todo-app__count">
          오늘의 퀘스트 완료까지 앞으로 {remaining}개!
        </span>
      </footer>
    </main>
  );
}

export default App;
// React 훅과 CSS 파일 불러오기
import { useState } from 'react';
import './App.css';

function App() {
  // =====================
  // 1. 상태 정의
  // =====================
  // id를 4부터 시작 (초기 할 일 3개가 1,2,3)
  const [id, setId] = useState(4);

  // 초기 할 일 목록 상태
  const [todos, setTodos] = useState([
    { id: 1, text: "GDGoC 5주차 React 학습", completed: true },
    { id: 2, text: "GDGoC 6주차 React 학습", completed: false },
    { id: 3, text: "GDGoC 6주차 React 실습", completed: false },
  ]);

  // 입력창 값 상태
  const [input, setInput] = useState('');
  // 필터 상태 ('all', 'active', 'completed')
  const [filter, setFilter] = useState('all');

  // =====================
  // 2. 필터링된 목록 계산
  // =====================
  const filteredTodos = todos.filter(todo => {
    if (filter === 'active')
      return !todo.completed;

    if (filter === 'completed')
      return todo.completed;
    
    return true;
  });

  // =====================
  // 3. 이벤트 핸들러 함수
  // =====================
  // 할 일 추가
  const addTodo = (e) => {
    e.preventDefault();
    const text = input.trim();

    if (!text)
      return;
    const newTodo = { id: id, text, completed: false };

    setTodos(prev => [...prev, newTodo]);
    setId(prev => prev + 1); // id 1 증가
    setInput('');
  };

  // 할 일 완료 토글
  const toggleComplete = (id) => {
    setTodos(prev => prev.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  // 할 일 삭제
  const deleteTodo = (id) => {
    const target = todos.find(todo => todo.id === id);

    if (window.confirm(`'${target.text}' 퀘스트를 삭제합니다. 계속 하시겠습니까?`)) {
      setTodos(prev => prev.filter(todo => todo.id !== id));
    }
  };

  // 필터 버튼 클릭
  const handleFilter = (value) => setFilter(value);

  // =====================
  // 4. 렌더링 (JSX)
  // =====================
  return (
    <div className = "container">
      {/* 헤더 */}
      <h1>📝 Todo List</h1>

      {/* 할 일 추가 입력창 */}
      <form className = "add-todo-box" onSubmit={addTodo}>
        <input
          type = "text"
          id = "newTodoInput"
          placeholder = "할 일을 입력하세요"
          value = {input}
          onChange = {e => setInput(e.target.value)}
        />
        <button id = "addTodoBtn" type = "submit">추가</button>
      </form>

      {/* 필터 버튼 */}
      <div className = "filter-buttons">
        <button
          className = {`filter-btn${filter === 'all' ? ' active' : ''}`}
          onClick = {() => handleFilter('all')}
        >전체</button>

        <button
          className = {`filter-btn${filter === 'active' ? ' active' : ''}`}
          onClick = {() => handleFilter('active')}
        >미완료</button>

        <button
          className = {`filter-btn${filter === 'completed' ? ' active' : ''}`}
          onClick = {() => handleFilter('completed')}
        >완료</button>
      </div>

      {/* Todo 목록 */}
      <div className = "todo-list">
        {filteredTodos.length === 0 ? (
          <div className="empty-message">
            {filter === 'completed'
              ? '완료된 할 일이 없습니다.'
              : filter === 'active'
                ? '모든 할 일을 완료했습니다!'
                : '등록된 할 일이 없습니다.'}
          </div>
        ) : (
          filteredTodos.map(todo => (
            <div
              key = {todo.id}
              className = {`todo-item${todo.completed ? ' completed' : ''}`}
            >
              <div className = "todo-content">
                <div
                  className = {`todo-checkbox${todo.completed ? ' checked' : ''}`}
                  onClick = {() => toggleComplete(todo.id)}
                  tabIndex = {0}
                  role = "button"
                  aria-pressed = {todo.completed}
                />
                <span className = "todo-text">{todo.text}</span>
              </div>
              <span className = "status-badge">{todo.completed ? '완료' : '미완료'}</span>
              <button className = "delete-btn" onClick={() => deleteTodo(todo.id)}>삭제</button>
            </div>
          ))
        )}
      </div>

      {/* 상태 정보 */}
      <div className = "status-info">
        <span>전체: {todos.length}개</span>
        <span>완료: {todos.filter(t => t.completed).length}개</span>
        <span>미완료: {todos.filter(t => !t.completed).length}개</span>
      </div>
    </div>
  );
}

export default App;
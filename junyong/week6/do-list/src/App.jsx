import { useMemo, useState } from "react";

export default function TodoApp() {
  const [todos, setTodos] = useState([
    { id: 1, text: "기타 연습하기", done: false },
    { id: 2, text: "하루 물 2리터 마시기", done: true },
  ]);
  const [filter, setFilter] = useState("all");
  const [text, setText] = useState("");
  const [nextId, setNextId] = useState(3);

  const filtered = useMemo(() => {
    if (filter === "active") return todos.filter((t) => !t.done);
    if (filter === "completed") return todos.filter((t) => t.done);
    return todos;
  }, [todos, filter]);

  const addTodo = () => {
    const value = text.trim();
    if (value === "") {
      alert("할 일을 입력하세요!");
      return;
    }
    setTodos((prev) => [...prev, { id: nextId, text: value, done: false }]);
    setNextId((n) => n + 1);
    setText("");
  };

  const toggleTodo = (id) => {
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  };

  const deleteTodo = (id) => {
    const ok = window.confirm("정말 삭제하시겠습니까?");
    if (!ok) return;
    setTodos((prev) => prev.filter((t) => t.id !== id));
    alert("삭제되었습니다.");
  };

  return (
    <div className="mx-auto max-w-md p-4 space-y-4">
      <h1 className="text-2xl font-bold">Todo List</h1>

      {/* 입력 */}
      <div className="flex gap-2">
        <input
          id="todo-input"
          className="flex-1 border rounded px-3 py-2"
          type="text"
          placeholder="할 일을 입력하세요"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTodo()}
        />
        <button id="add-btn" className="px-4 py-2 rounded bg-black text-white" onClick={addTodo}>
          추가
        </button>
      </div>

      {/* 필터 버튼 */}
      <div className="flex gap-2">
        {[
          { key: "all", label: "전체" },
          { key: "active", label: "미완료" },
          { key: "completed", label: "완료" },
        ].map((f) => (
          <button
            key={f.key}
            className={`filter-btn px-3 py-1 rounded border ${filter === f.key ? "bg-black text-white" : "bg-white"}`}
            onClick={() => setFilter(f.key)}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* 리스트 */}
      <ul id="todo-list" className="space-y-2">
        {filtered.map((todo) => (
          <li
            key={todo.id}
            className={`flex items-center justify-between gap-2 rounded border px-3 py-2 ${
              todo.done ? "opacity-70 line-through" : ""
            }`}
          >
            <label className="flex items-center gap-2 flex-1">
              <input type="checkbox" checked={todo.done} onChange={() => toggleTodo(todo.id)} />
              <span className="break-words">{todo.text}</span>
            </label>
            <button className="del-btn px-2 py-1 rounded bg-red-600 text-white" onClick={() => deleteTodo(todo.id)}>
              삭제
            </button>
          </li>
        ))}

        {filtered.length === 0 && (
          <li className="text-center text-sm text-gray-500 py-6">표시할 항목이 없습니다.</li>
        )}
      </ul>
    </div>
  );
}


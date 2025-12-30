import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ListPage() {
  const [title, setTitle] = useState(""); //제목
  const [content, setContent] = useState(""); //내용

  const [posts, setPosts] = useState([]); //글 목록
  const navigate = useNavigate();

  // 글 추가
  const handleAddPost = () => {
    if (title.trim() === "" || content.trim() === "") {
      alert("제목과 내용을 입력하세요.");
      return;
    }

    const newPost = {
      id: Date.now(),
      title: title,
      content: content,
      createdAt: new Date().toLocaleString(),
    };

    setPosts([newPost, ...posts]);
    setTitle("");
    setContent("");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>To.Future</h1>

      <h3>글 작성하기</h3>

      <input
        type="text"
        placeholder="제목 입력"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{
          display: "block",
          width: "100%",
          padding: "10px",
          marginBottom: "10px",
        }}
      />

      <textarea
        placeholder="내용 입력"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        style={{
          display: "block",
          width: "100%",
          height: "120px",
          padding: "10px",
          marginBottom: "10px",
        }}
      />

      <button onClick={handleAddPost}>추가</button>

      <hr />

      <h3>글 목록</h3>

      {posts.length === 0 && <p>작성한 글이 없습니다.</p>}

      <ul style={{ listStyle: "none", padding: 0 }}>
        {posts.map((post) => (
          <li key={post.id} style={{ marginBottom: "12px" }}>
            <div
              onClick={() =>
                navigate(`/post/${post.id}`, { state: post })
              }
              style={{
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              <strong>{post.title}</strong>
              <br />
              <small>{post.createdAt}</small>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListPage;

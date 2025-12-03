//글 목록과 글 작성 화면을 나타내는 페이지 
import { useState, useEffect } from "react"; //useEffect: 값이 바뀔 때 발생하는 작업들(저장, 로그 등)을 처리 하는 함수 
import { useNavigate } from "react-router-dom"; //useNavigate : 페이지 이동을 할 수 있게 하는 라우터 함수 

function ListPage() {
  const [title, setTitle] = useState("");//제목, setTitle은 제목 바꾸는 함수, 초기값은 빈 문자열  
  const [content, setContent] = useState(""); //내용 

  //열람 시간 설정할지 확인하는 체크박스, false = 열람 시간 설정 안한다는 의미 
  const [useUnlockTime, setUseUnlockTime] = useState(false);

  //선택한 시간 
  const [unlockTime, setUnlockTime] = useState("");

  //posts 초기값을 localStorage에서 불러오기, 저장해둔 글 있으면 목록에 나타내고 없으면 비어있음 
  const [posts, setPosts] = useState(() => { //usestate에 함수를 넣으면 처음 화면 만들어질 때 함수를 실행해달라는 뜻 
    const saved = localStorage.getItem("posts");  //저장되어 있는 "posts"의 키 값을 가져옴 
    return saved ? JSON.parse(saved) : []; 
  });

  const navigate = useNavigate(); //navigate: 페이지 이동

  // posts 바뀔 때마다 localStorage 갱신, 새로고침해도 글 삭제 안되게 만듦
  //useEffect: 값이 바뀔 때 실행되는 코드를 넣는 곳 
  useEffect(() => {
    localStorage.setItem("posts", JSON.stringify(posts));
  }, [posts]);

  // 글 추가
  const handleAddPost = () => {
    if (title.trim() === "" || content.trim() === "") {
      alert("제목과 내용을 입력하세요."); //제목과 내용 안쓰면 경고 
      return;
    }

    if (useUnlockTime && !unlockTime) {
      alert("열람 시간을 선택해주세요!"); //열람시간 설정 true 했는데 설정 안하면 경고 
      return;
    }

    //새 글 객체 
    const newPost = {
      id: Date.now(),
      title,
      content,
      createdAt: new Date().toLocaleString(),
      unlockTime: useUnlockTime ? unlockTime : null,
    };

    setPosts((prev) => [newPost, ...prev]); //posts에 새 글 추가 

    // 서버 전송(보안 기능 추가를 위한 연습용 코드)
    fetch("http://127.0.0.1:9000", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPost),
    })
      .then((res) => console.log("서버 응답:", res))
      .catch((err) => console.error("서버 오류:", err));

    // 입력창 초기화
    setTitle("");
    setContent("");
    setUseUnlockTime(false);
    setUnlockTime("");
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

      {/* 열람 시간 설정 */}
      <label style={{ display: "block", marginBottom: "10px" }}>
        <input
          type="checkbox"
          checked={useUnlockTime}
          onChange={(e) => setUseUnlockTime(e.target.checked)}
        />
        &nbsp; 이 글의 열람 가능 시간을 설정하세요 
      </label>

        {/*열람 시간 설정 체크 했을 때만 입력창 나타남 */}
      {useUnlockTime && (
        <input
          type="datetime-local"
          value={unlockTime}
          onChange={(e) => setUnlockTime(e.target.value)}
          style={{
            display: "block",
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
          }}
        />
      )}

      {/* 글 추가 버튼, 버튼 클릭시 handleAddPost 함수 실행 */}
      <button onClick={handleAddPost}>추가</button>

      <hr />

      <h3>글 목록</h3>

      {posts.length === 0 && <p>작성한 글이 없습니다.</p>}

      {/* 글 목록 렌더링 */}
      <ul style={{ listStyle: "none", padding: 0 }}>
        {posts.map((post) => (
          <li key={post.id} style={{ marginBottom: "12px" }}>
            <div
              onClick={() => navigate(`/post/${post.id}`, { state: post })}
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
              <br />

              {post.unlockTime ? (
                <small style={{ color: "blue" }}>
                  🔒 {post.unlockTime} 이후 열람 가능
                </small>
              ) : (
                <small style={{ color: "green" }}>🟢 즉시 열람 가능</small>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListPage;

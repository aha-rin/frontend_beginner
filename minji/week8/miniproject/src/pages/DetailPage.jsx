//목록에 있는 글 선택시 DetailPage로 이동한 후 글을 수정, 삭제, 잠금 시간 체크할 수 있는 페이지
//useParms(): URL에 있는 파라미터를 가져옴 (ex) 글을 작성하면 localStorage에 id : 123 .. 저장됨. 글을 클릭하면 URL은 /post/123이 되고 DetailPage에서는 123(id)를 보고 localStorage에서 맞는 글을 찾아옴 
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function DetailPage() {
  const { id } = useParams();  //id = URL에 있는 글에 할당된 번호 
  const location = useLocation(); 
  const navigate = useNavigate();

  const [post, setPost] = useState(location.state || null); //DetailPage에서 보여주는 현재 글의 정보 

  const [isEditing, setIsEditing] = useState(false); //수정, false: 수정x, true: 수정 o
  const [editTitle, setEditTitle] = useState(""); //수정 중인 제목 임시 저장
  const [editContent, setEditContent] = useState("");// 내용 임시 저장 

  useEffect(() => { //post가 없다면 localStorage에서 찾기 
    if (post) {
      setEditTitle(post.title);
      setEditContent(post.content);
      return;
    }

    const saved = JSON.parse(localStorage.getItem("posts") || "[]");
    const found = saved.find((p) => p.id === Number(id));

    if (found) {
      setPost(found);
      setEditTitle(found.title);
      setEditContent(found.content);
    }
  }, [id, post]);

  if (!post) { //작성한 글이 없을 때 
    return (
      <div style={{ padding: "20px" }}>
        <h2>작성한 글이 없습니다.</h2>
        <button onClick={() => navigate("/")}>메인으로 돌아가기</button>
      </div>
    );
  }

  // 글 잠금 여부 계산 
  let isLocked = false; //기본값은 잠금 x
  if (post.unlockTime) { 
    const now = new Date(); 
    const unlockDate = new Date(post.unlockTime); 
    isLocked = unlockDate > now; 
  }  //글 잠금 설정을 했을 때 그 시간이 미래라면 잠금 상태 

  // 삭제
  const handleDelete = () => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return; //window.confirm : 진짜 삭제할건지 확인 

    const saved = JSON.parse(localStorage.getItem("posts") || "[]");
    const updated = saved.filter((p) => p.id !== post.id);

    localStorage.setItem("posts", JSON.stringify(updated));
    navigate("/");
  };

  // 수정 저장
  const handleSave = () => {
    if (editTitle.trim() === "" || editContent.trim() === "") {
      alert("제목과 내용을 입력하세요.");
      return;
    }

    const saved = JSON.parse(localStorage.getItem("posts") || "[]");

    const updated = saved.map((p) =>
      p.id === post.id
        ? { ...p, title: editTitle, content: editContent }
        : p
    );

    localStorage.setItem("posts", JSON.stringify(updated));
    setPost({ ...post, title: editTitle, content: editContent });
    setIsEditing(false);
  };

  const boxStyle = {
    border: "1px solid #ddd",
    borderRadius: "12px",
    padding: "20px",
    marginBottom: "20px",
    backgroundColor: "#fafafa"
  };

  const buttonStyle = {
    padding: "8px 15px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer"
  };

  return (
    <div style={{ padding: "20px", maxWidth: "700px", margin: "0 auto" }}>
      {/* 열람 시간 표시 */}
      <div style={{ marginBottom: "15px", color: "gray" }}>
        {post.unlockTime ? (
          <p>🔒 열람 가능 시간: {post.unlockTime}</p>
        ) : (
          <p>🟢 즉시 열람 가능</p>
        )}
      </div>

      {/* 잠금 상태일 경우 */}
      {isLocked ? (
        <div style={boxStyle}>
          <h2>🔒 아직 열람할 수 없습니다</h2>
          <p>이 글은 아래 시간 이후 열람 가능합니다:</p>
          <p style={{ fontWeight: "bold" }}>{post.unlockTime}</p>

          <button
            onClick={() => navigate("/")}
            style={{ ...buttonStyle, background: "#ddd" }}
          >
            메인으로 돌아가기
          </button>
        </div>
      ) : (
        <>
          {isEditing ? (
            <div style={boxStyle}>
              <h3>✏ 글 수정하기</h3>

              <input
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "6px",
                  marginBottom: "10px"
                }}
              />

              <textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                style={{
                  width: "100%",
                  height: "140px",
                  padding: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "6px"
                }}
              />

              <div style={{ marginTop: "15px" }}>
                <button
                  onClick={handleSave}
                  style={{ ...buttonStyle, background: "#4CAF50", color: "white" }}
                >
                  저장
                </button>

                <button
                  onClick={() => setIsEditing(false)}
                  style={{
                    ...buttonStyle,
                    background: "#aaa",
                    marginLeft: "10px"
                  }}
                >
                  취소
                </button>
              </div>
            </div>
          ) : (
            <div style={boxStyle}>
              <h1 style={{ marginBottom: "10px" }}>{post.title}</h1>
              <hr />
              <p style={{ whiteSpace: "pre-line", marginTop: "15px" }}>
                {post.content}
              </p>

              <p style={{ fontSize: "12px", color: "gray", marginTop: "10px" }}>
                작성일: {post.createdAt}
              </p>

              <div style={{ marginTop: "20px" }}>
                <button
                  onClick={() => navigate("/")}
                  style={{ ...buttonStyle, background: "#ddd" }}
                >
                  뒤로 가기
                </button>

                <button
                  onClick={() => setIsEditing(true)}
                  style={{
                    ...buttonStyle,
                    background: "#2196F3",
                    color: "white",
                    marginLeft: "10px"
                  }}
                >
                  수정하기
                </button>

                <button
                  onClick={handleDelete}
                  style={{
                    ...buttonStyle,
                    background: "#E74C3C",
                    color: "white",
                    marginLeft: "10px"
                  }}
                >
                  삭제하기
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default DetailPage;

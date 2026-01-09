import { useState } from 'react'

// 글 추가/수정/삭제 컴포넌트
function ArticleEditor({ notes, onAdd, onUpdate, onDelete }) {
  // 편집 중인 글 ID (null이면 새 글 작성 모드)
  const [editingId, setEditingId] = useState(null)
  
  // 새 글 작성 폼 표시 여부
  const [showForm, setShowForm] = useState(false)
  
  // 폼 입력 상태
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  // 새 글 작성 시작
  const handleStartAdd = () => {
    setEditingId(null)
    setTitle('')
    setContent('')
    setShowForm(true)
  }

  // 수정 시작
  const handleStartEdit = (note) => {
    setEditingId(note.id)
    setTitle(note.title)
    setContent(note.content)
    setShowForm(true)
  }

  // 저장 (추가 또는 수정)
  const handleSave = () => {
    if (!title.trim() || !content.trim()) {
      alert('제목과 내용을 모두 입력해주세요.')
      return
    }

    if (editingId) {
      onUpdate(editingId, title, content)
    } else {
      onAdd(title, content)
    }

    setShowForm(false)
    setTitle('')
    setContent('')
    setEditingId(null)
  }

  // 취소
  const handleCancel = () => {
    setShowForm(false)
    setTitle('')
    setContent('')
    setEditingId(null)
  }

  // 삭제
  const handleDelete = (id) => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      onDelete(id)
    }
  }

  return (
    <div className="article-editor">
      {/* 새 글 추가 버튼 */}
      {!showForm && (
        <button onClick={handleStartAdd} className="add-btn">
          + 새 글 추가
        </button>
      )}

      {/* 글 작성/수정 폼 */}
      {showForm && (
        <div className="note-form">
          <h3>{editingId ? '글 수정' : '새 글 작성'}</h3>
          <input
            type="text"
            placeholder="제목을 입력하세요"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="내용을 입력하세요"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={5}
          />
          <div className="buttons">
            <button onClick={handleSave}>저장</button>
            <button onClick={handleCancel}>취소</button>
          </div>
        </div>
      )}

      {/* 글 목록 */}
      <div className="note-list">
        {notes.length === 0 ? (
          <p className="empty-msg">작성된 글이 없습니다.</p>
        ) : (
          notes.map(note => (
            <div key={note.id} className="note-item">
              <h3>{note.title}</h3>
              <p>{note.content}</p>
              <div className="buttons">
                <button onClick={() => handleStartEdit(note)}>수정</button>
                <button onClick={() => handleDelete(note.id)}>삭제</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default ArticleEditor
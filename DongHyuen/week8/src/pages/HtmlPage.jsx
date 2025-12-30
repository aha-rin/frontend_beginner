import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { NotesContext } from '../context/NotesContext'
import ArticleEditor from '../components/ArticleEditor'

function HtmlPage() {
  const { getNotesByCategory, addNote, updateNote, deleteNote } = useContext(NotesContext)
  const navigate = useNavigate()

  // HTML 카테고리 글만 가져오기
  const htmlNotes = getNotesByCategory('HTML')

  // 글 추가
  const handleAdd = (title, content) => {
    addNote('HTML', title, content)
  }

  // 글 수정
  const handleUpdate = (id, title, content) => {
    updateNote(id, title, content)
  }

  // 글 삭제
  const handleDelete = (id) => {
    deleteNote(id)
  }

  return (
    <div className="topic-page">
      <button onClick={() => navigate('/')}>홈으로</button>
      
      <h1>HTML</h1>
      <p>HyperText Markup Language</p>

      <ArticleEditor
        notes={htmlNotes}
        onAdd={handleAdd}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
      />
    </div>
  )
}

export default HtmlPage
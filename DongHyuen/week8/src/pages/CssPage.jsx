import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { NotesContext } from '../context/NotesContext'
import ArticleEditor from '../components/ArticleEditor'

function CssPage() {
  const { getNotesByCategory, addNote, updateNote, deleteNote } = useContext(NotesContext)
  const navigate = useNavigate()

  // CSS 카테고리 글만 가져오기
  const cssNotes = getNotesByCategory('CSS')

  const handleAdd = (title, content) => {
    addNote('CSS', title, content)
  }

  const handleUpdate = (id, title, content) => {
    updateNote(id, title, content)
  }

  const handleDelete = (id) => {
    deleteNote(id)
  }

  return (
    <div className="topic-page">
      <button onClick={() => navigate('/')}>홈으로</button>
      
      <h1>CSS</h1>
      <p>Cascading Style Sheets</p>

      <ArticleEditor
        notes={cssNotes}
        onAdd={handleAdd}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
      />
    </div>
  )
}

export default CssPage
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { NotesContext } from '../context/NotesContext'
import ArticleEditor from '../components/ArticleEditor'

function JsPage() {
  const { getNotesByCategory, addNote, updateNote, deleteNote } = useContext(NotesContext)
  const navigate = useNavigate()

  // JS 카테고리 글만 가져오기
  const jsNotes = getNotesByCategory('JS')

  const handleAdd = (title, content) => {
    addNote('JS', title, content)
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
      
      <h1>JavaScript</h1>
      <p>The Language of the Web</p>

      <ArticleEditor
        notes={jsNotes}
        onAdd={handleAdd}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
      />
    </div>
  )
}

export default JsPage
/* 
야간모드 & 글 목록 관리
*/

import { createContext, useState, useEffect } from 'react'

// Context 생성
export const NotesContext = createContext()

// Provider 컴포넌트
export function NotesProvider({ children }) {
  // 다크모드 상태
  const [darkMode, setDarkMode] = useState(false)

  // 글 목록 (배열로 여러 개 저장)
  const [notes, setNotes] = useState([])

  // 다음 ID (자동 증가)
  const [nextId, setNextId] = useState(1)

  // 초기 데이터 설정
  useEffect(() => {
    setNotes([
      { id: 1, category: 'HTML', title: 'HTML 기초', content: 'HTML은 웹 페이지의 구조를 만드는 언어입니다.' },
      { id: 2, category: 'CSS', title: 'CSS 기초', content: 'CSS는 웹 페이지를 꾸미는 언어입니다.' },
      { id: 3, category: 'JS', title: 'JavaScript 기초', content: 'JavaScript는 웹 페이지에 기능을 추가하는 언어입니다.' }
    ])
    setNextId(4)
  }, [])

  // 다크모드가 바뀔 때 body에 클래스 추가/제거
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark')
    } else {
      document.body.classList.remove('dark')
    }
  }, [darkMode])

  // 다크모드 토글
  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  // Create: 새 글 추가
  const addNote = (category, title, content) => {
    const newNote = {
      id: nextId,
      category,
      title,
      content
    }
    setNotes([...notes, newNote])
    setNextId(nextId + 1)
  }

  // Update: 글 수정
  const updateNote = (id, title, content) => {
    setNotes(notes.map(note =>
      note.id === id ? { ...note, title, content } : note
    ))
  }

  // Delete: 글 삭제
  const deleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id))
  }

  // 카테고리별 글 필터링
  const getNotesByCategory = (category) => {
    return notes.filter(note => note.category === category)
  }

  return (
    <NotesContext.Provider value={{
      darkMode,
      toggleDarkMode,
      notes,
      addNote,
      updateNote,
      deleteNote,
      getNotesByCategory
    }}>
      {children}
    </NotesContext.Provider>
  )
}
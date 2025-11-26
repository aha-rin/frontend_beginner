/*
페이지 구조 & 공통 Layout
*/

import { Routes, Route, Link } from 'react-router-dom'
import { useContext } from 'react'
import { NotesProvider, NotesContext } from './context/NotesContext'
import HomePage from './pages/HomePage'
import HtmlPage from './pages/HtmlPage'
import CssPage from './pages/CssPage'
import JsPage from './pages/JsPage'

// 네비게이션 바 컴포넌트
function NavBar() {
  const { darkMode, toggleDarkMode } = useContext(NotesContext) // React 훅: React에서 상태/기능을 쓰기 위한 특별한 함수   
                                                                // useContext => 전역데이터 관리 => NotesContext의 값들 꺼내기
  return (
    <nav className="navbar">  {/* nav태그: 네비게이션(메뉴) 영역을 의미 */}
      <Link to="/" className="nav-title">Web Study</Link> {/* React Router 전용 링크 컴포넌트 */}
      
      <div className="nav-links">
        <Link to="/html">HTML</Link>
        <Link to="/css">CSS</Link>
        <Link to="/js">JavaScript</Link>
      </div>

      {/* 다크모드 토글 버튼 */}
      <button onClick={toggleDarkMode} className="mode-btn">
        {darkMode ? '주간 모드' : '야간 모드'}
      </button>
    </nav>
  )
}

function App() {
  return (
    <NotesProvider> {/* 안에 있는 애들은 전부 Context를 쓸 수 있게 감싸주는 태그? */}
      <div className="app">
        <NavBar />  {/* 앞에서 만든 NavBar함수를 컴포넌트로 사용 */}
        
        <main className="content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/html" element={<HtmlPage />} />   {/* 주소창에 /html이 뜰 때 <HtmlPage /> 컴포넌트를 렌더링 */}
            <Route path="/css" element={<CssPage />} />
            <Route path="/js" element={<JsPage />} />
          </Routes>
        </main>

        <footer className="footer">
          <p>Web Study Notes</p>
        </footer>
      </div>
    </NotesProvider>
  )
}

export default App
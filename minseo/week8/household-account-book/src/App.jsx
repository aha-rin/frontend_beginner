// App.jsx: 앱의 메인 컴포넌트(전체 구조 담당)
// Context Provider와 라우터 구조를 포함

import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { AccountBookProvider } from "./context/AccountBookContext";
import InputPage from "./pages/InputPage";
import ListPage from "./pages/ListPage";

function App() {
  return (
    // AccountBookProvider로 전체 앱을 감싸서 context 사용 가능하게 함
    <AccountBookProvider>

      {/* BrowserRouter로 라우팅 설정 */}
      <BrowserRouter>
        {/* 네비게이션 메뉴 */}
        <nav style = {{ margin: "1rem 0" }}>
          <Link to = "/" style={{ marginRight: "1rem" }}>입력</Link>
          <Link to = "/list">내역</Link>
        </nav>

        {/* 페이지 라우팅 */}
        <Routes>
          <Route path = "/" element={<InputPage />} />
          <Route path = "/list" element={<ListPage />} />
        </Routes>
      </BrowserRouter>
    </AccountBookProvider>
  );
}

export default App;

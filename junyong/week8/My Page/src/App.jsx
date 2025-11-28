// src/App.jsx
import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import SongAnalyzer from "./pages/SongAnalyzer";
import Practice from "./pages/Practice";

function App() {
  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>🎸 기타 연습 도우미</h1>
      <nav style={{ marginBottom: "16px" }}>
        <Link to="/" style={{ marginRight: "8px" }}>곡 분석</Link>
        <Link to="/practice">연습 페이지</Link>
      </nav>

      <Routes>
        <Route path="/" element={<SongAnalyzer />} />
        <Route path="/practice" element={<Practice />} />
      </Routes>
    </div>
  );
}

export default App;

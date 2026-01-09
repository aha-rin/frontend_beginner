/*
웹 페이지에서 리액트 앱을 실제로 띄우는 파일
*/

import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'

// BrowserRouter로 감싸서 라우팅 기능 활성화
ReactDOM.createRoot(document.getElementById('root')).render(
  // 이상 패턴 감지하는 React 탬플릿
  <React.StrictMode>   
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
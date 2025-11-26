// AccountBookContext.jsx: 거래 내역 관리를 위한 Context와 Provider 정의
// 전역 상태로 거래 내역을 관리(Context API)하고 추가 기능을 제공

import React, { createContext, useState } from "react";

// Context 생성: 거래 내역을 전역에서 공유할 수 있게 해주는 Context 객체
export const AccountBookContext = createContext();

// Provider 컴포넌트: 거래 내역 상태와 추가 함수를 하위 컴포넌트에 제공
export function AccountBookProvider({ children }) {
  // 상태 관리: 거래 내역(수입/지출)을 배열로 관리
  const [transactions, setTransactions] = useState([]);

  // 거래 추가 함수: 기존 내역에 새 거래를 추가
  const addTransaction = (transaction) =>
    setTransactions([...transactions, transaction]);

  // Provider로 상태와 함수를 하위 컴포넌트에 제공하여 다시 렌더링
  return (
    <AccountBookContext.Provider value = {{ transactions, addTransaction }}>
      {children}
    </AccountBookContext.Provider>
  );
}

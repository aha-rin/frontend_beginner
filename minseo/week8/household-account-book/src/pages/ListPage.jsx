// ListPage.jsx: 내역(거래 리스트) 페이지
// 거래 내역 리스트 컴포넌트를 포함

import React from "react";
import TransactionList from "../components/TransactionList";

export default function ListPage() {
	return (
		<div>
			<h2>내역</h2>
			{/* 거래 내역 리스트 컴포넌트 */}
			<TransactionList />
		</div>
	);
}

// InputPage.jsx: 수입/지출 입력 페이지
// 입력 폼 컴포넌트를 포함

import React from "react";
import TransactionForm from "../components/TransactionForm";

export default function InputPage() {
	return (
		<div>
			<h2>수입/지출 입력</h2>
			{/* 입력 폼 컴포넌트 */}
			<TransactionForm />
		</div>
	);
}

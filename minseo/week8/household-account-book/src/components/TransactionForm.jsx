// TransactionForm.jsx: 수입/지출 입력 폼 컴포넌트
// 입력값을 받아 context로 전달하여 거래 내역을 추가

import React, { useState, useContext } from "react";
import { AccountBookContext } from "../context/AccountBookContext";

export default function TransactionForm() {
	// Context에서 거래 추가 함수 가져오기
	const { addTransaction } = useContext(AccountBookContext);

	// 입력값 상태 관리
	const [text, setText] = useState("");       // 내용
	const [amount, setAmount] = useState("");   // 금액

	// 폼 제출 핸들러
	const handleSubmit = (e) => {
		e.preventDefault();

        // 값이 없으면 추가하지 않음
		if (!text || !amount)
            return;

        // Context로 거래 추가
		addTransaction({ text, amount: Number(amount) });
		setText("");
		setAmount("");
	};

	return (
		<form onSubmit = {handleSubmit}>
			<input
				value = {text}
				onChange = {e => setText(e.target.value)}
				placeholder = "내용"
			/>

			<input
				value = {amount}
				onChange = {e => setAmount(e.target.value)}
				placeholder = "금액"
				type = "number"
			/>

			<button type = "submit">추가</button>
		</form>
	);
}

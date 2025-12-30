// TransactionList.jsx: 거래 내역 리스트 컴포넌트
// context에서 거래 내역을 받아와 리스트로 표시
// 금액이 음수면 빨간색, 양수면 파란색으로 조건부 렌더링

import React, { useContext } from "react";
import { AccountBookContext } from "../context/AccountBookContext";

export default function TransactionList() {
	// Context에서 거래 내역 배열 가져오기
	const { transactions } = useContext(AccountBookContext);

	return (
		<ul>
			{transactions.length === 0 ? (
				<li>내역이 없습니다.</li>
			) : (
				transactions.map((t, i) => (
					<li
						key = {i}
						style = {{ color: t.amount < 0 ? "red" : "blue" }}
					>

						{t.text}: {t.amount}원
					</li>
				))
			)}
		</ul>
	);
}

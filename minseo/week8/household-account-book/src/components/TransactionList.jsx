// TransactionList.jsx: 거래 내역 리스트 컴포넌트
// context에서 거래 내역을 받아와 리스트로 표시
// 금액이 음수면 빨간색, 양수면 파란색으로 조건부 렌더링

import React, { useContext } from "react";
import { AccountBookContext } from "../context/AccountBookContext";

export default function TransactionList() {
	// Context에서 거래 내역 배열 가져오기
	const { transactions } = useContext(AccountBookContext);

	// 총액 계산
	const total = transactions.reduce((sum, t) => sum + t.amount, 0);

	return (
		<div>
			<div
				style={{
					fontWeight: "bold",
					fontSize: "1.15rem",
					marginBottom: "12px",
					color:
						total === 0 ? "#222" : total > 0 ? "#38a169" : "#e53e3e",
				}}
			>
				총액: {total}원
			</div>

			<ul>
				{transactions.length === 0 ? (
					<li className="empty">내역이 없습니다.</li>
				) : (
					transactions.map((t, i) => (
						<li
							key={i}
							className={t.amount < 0 ? "expense" : "income"}
						>
							{t.text}: {t.amount < 0 ? `-${Math.abs(t.amount)}` : t.amount}원
						</li>
					))
				)}
			</ul>
		</div>
	);
}

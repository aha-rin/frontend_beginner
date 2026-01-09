# 가계부

## 01. 구상
- 입력 페이지: 수입/지출 입력
- 내역 페이지: 리스트로 표시
- 페이지 간 데이터 공유: context 활용
- 조건부 렌더링: 금액이 음수면 빨간색, 양수면 파란색
- 이벤트: onChange로 값 입력, onClick으로 추가

## 02. 구조
```
household-account-book/
├── public/
├── src/
│   ├── components/
│   │   ├── TransactionForm.jsx
│   │   └── TransactionList.jsx
│   ├── context/
│   │   └── AccountBookContext.jsx
│   ├── pages/
│   │   ├── InputPage.jsx
│   │   └── ListPage.jsx
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## 03. 프로젝트 과정

#### ~~1. 프로젝트 구조 설계 및 폴더/파일 생성~~ (완료)
> 필요한 폴더(components, pages, context 등)와 파일을 미리 만듦

#### ~~2. Context(전역 상태) 설계 및 구현~~ (완료)
> 데이터 구조와 상태 관리 방식(Context, useState 등)부터 정의
> 예: AccountBookContext.jsx

#### ~~3. App.jsx에서 Context Provider와 라우터 설정~~ (완료)
> Context로 앱을 감싸고, 페이지 라우팅 구조를 만듦

#### ~~4.각 페이지 컴포넌트 구현~~ (완료)
> 페이지별로 필요한 UI와 기능을 설계

#### ~~5. 재사용 컴포넌트 구현~~ (완료)
> 페이지에서 사용할 작은 단위 컴포넌트 작성<br>
> 예 : 입력 폼, 리스트 등

#### ~~6. 스타일링~~ (완료)
> 전역 스타일(index.css)과 각 컴포넌트별 스타일(App.css 등) 적용

#### ~~7. 기능 테스트 및 디버깅~~ (완료)
> 데이터 흐름, 이벤트, 조건부 렌더링 등 정상 동작 확인

#### 8. 추가 기능(삭제, 수정 등) 및 리팩토링
> 필요시 CRUD, 커스텀 훅, 유틸 함수 등 확장
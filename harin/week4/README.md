# 📝 4주차 과제: Todo List 제작 (2)

웹 프론트엔드 커리큘럼의 **네 번째 주차 과제**입니다.  
지난 주차에는 배열에 존재하는 할 일 목록을 화면에 출력하고, 완료/미완료 상태로 필터링하는 기능을 구현했습니다.  
이번 주차는 여기서 한 단계 더 나아가, **직접 할 일을 추가/삭제하고, 완료 상태를 설정할 수 있는 기능**을 구현해봅시다.  

https://github.com/user-attachments/assets/76cc9550-627f-4eb6-be1e-cbc6b2f1841f

---

## 📌 과제 요구사항

1. **Todo list 생성**
   - 아무것도 없는 상태(또는 3주차의 배열을 유지한 상태에서 추가하셔도 됩니다.) 사용자가 직접 입력한 할 일을 추가할 수 있도록 구현
2. **할 일 관리 기능**
   - 등록된 할 일을 삭제할 수 있는 기능 추가
   - 등록된 할 일을 완료/미완료 상태로 설정할 수 있는 기능 추가

---

## 🎨 구현 예시 아이디어

- 초기 데이터를 처음에 받아 렌더링하고 새로운 객체를 아래에 추가로 적재
- form submit 이벤트에서 input이 비어있지 않으면 새로운 객체를 생성하여 추가
- change 이벤트 리스너를 통한 완료 체크박스 활성화
- click 이벤트 리스너, alert를 통한 경고-삭제 기능 구현

---

## 📂 제출 방식

- 본인 이름 폴더에서 우클릭-추가 옵션 표시-'open git bash here'

**작업 전**
- git checkout main  
- git pull origin main (브랜치 최신 작업 상태 반영, 매번 작업을 할 때마다 입력해주세요!)  
- mkdir week4  
- cd week4  
- git checkout -b 본인이름_week4  

**작업 후**
- git add .  
- git commit -m "feat: week4 투두리스트 제작 (2)"  
- git push origin 본인이름_week4  

---

## 🧑‍💻 클래스 네이밍 규칙

CSS  
- **BEM(Block Element Modifier)** 규칙에 따라 작성합니다.  
- BEM 규칙이란: https://velog.io/@nemo/bem  

JavaScript  
- **camelCase** 규칙에 따라 작성합니다.  
- camelCase란: 첫 단어는 소문자로, 이후 단어의 첫 글자는 대문자로 작성하는 방식입니다.  
- 추후 배울 React.js에서는 컴포넌트 이름을 `PascalCase` 방식으로 작성합니다.  

**앞으로는 주로 사용되는 네이밍 규칙을 습관화해주시길 바랍니다. 협업 시 코드 이해도를 높이는 데 큰 도움이 됩니다.**

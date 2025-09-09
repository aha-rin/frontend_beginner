# 🌱 Frontend Beginner Repository

2025-2 GDGoC 프론트엔드 비기너 과제 제출용 레포지토리  
단계별로 과제를 수행하며 함께 성장해봅시다!

---

## 🧩 제출 방식

- git bash를 활용하여 과제를 github에 제출합니다.  
(다운로드: 윈도우-https://gitforwindows.org/ 맥-https://velog.io/@diduya/git-%EC%82%AC%EC%9A%A9%EB%B2%95-for-Mac)
- 각자 본인의 이름으로 된 폴더를 생성한 뒤, 주차별 과제 폴더를 만들어 각 주차에 맞는 과제를 제출해주세요.
- 예시 구조
frontend-beginner/

├── harin/  
│   ├── week1/  
│   │   ├── index.html  
│   │   ├── style.css  
│   │   └── README.md  
│   ├── week2/  
│   └── week3/  
├── sangeun/  
...

🌿 브랜치 및 PR 제출 방식
- 각 과제는 **개인 브랜치에서 작업 후 PR(Pull Request)**을 통해 제출합니다.
- 멘토들이 과제 확인 후 병합할 수 있도록 main 브랜치에 바로 업로드 하지 말고 아래의 흐름을 따라 작업해주세요.

📌 브랜치 이름 규칙
- 이름_week1 형식으로 생성
예: harin_week1

🛠️ 작업 흐름
- main 브랜치에서 개인 브랜치 생성
- 브랜치에서 과제 작업 및 커밋
- 작업 완료 후 PR 생성
- 리뷰 후 main 브랜치에 머지

🛠️ 작업 흐름(git bash 명령어 포함)

    **작업 전**

    # 저장소 최초 클론(클론 이후부터는 frontend_beginner 내부에서 git bash 열어주세요)
    - git clone https://github.com/aha-rin/frontend_beginner.git
    - cd frontend_beginner

    # 원격 최신 상태 가져오기 (파일은 안 내려받음, 충돌 방지)
    - git fetch origin

    # 최신 main 기준으로 본인 브랜치 생성
    - git switch -c 본인이름_week1 origin/main

    # 주차별 폴더 만들기
    - mkdir -p 본인이름/week1
    - cd 본인이름/week1


    **작업 후**

    - git add .
    - git commit -m "feat: week1 프로필 페이지 제작"
    - git push origin 본인이름_week1

✏️ 커밋 & PR 메시지 예시
- 커밋 메시지: feat: week1 프로필 페이지 제작
- PR 제목: [week1_하린] 프로필 페이지 과제 제출
- PR 설명: 작업한 내용 간단 요약 (사용한 CSS 요소, 페이지 구성 등)

---

궁금한 점이 있다면 부담 없이 멘토에게 연락주세요!

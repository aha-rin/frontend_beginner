    // 초기 할 일 배열: text는 할 일 내용, completed는 완료 여부
    let todo_list = [
        {text: "독서하기", completed: false},
        {text: "공부하기", completed: false},
        {text: "물 2L 마시기", completed: false}
    ];
    let currentFilter = "all"; // 현재 필터 상태 전체로 

    function renderTodo(){
        const ul = document.getElementById("todo"); // ul 태그 가져오기
        ul.innerHTML = ""; // 기존 내용 초기화

        // 현재 필터에 맞게 목록 필터링
        let filtered = todo_list.filter(item => {
            if(currentFilter === "active") return !item.completed; // 미완료
            if(currentFilter === "completed") return item.completed; // 완료
            return true; // 전체
        });

        // forEach를 이용해 배열 출력
        filtered.forEach(item => {
            const li = document.createElement("li");

            
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.checked = item.completed; 
            checkbox.addEventListener("change", () => { 
                item.completed = checkbox.checked;
                renderTodo(); 
            });

           
            const span = document.createElement("span"); // 체크박스 옆에 리스트 출력
            span.textContent = item.text;
            if(item.completed) span.classList.add("done"); // 완료 상태에 취소선 표시

          
            const deleteBtn = document.createElement("button"); //삭제 버튼 생성
            deleteBtn.textContent = "삭제";
            deleteBtn.addEventListener("click", () => { 
                if(confirm("정말 삭제하시겠습니까?")){
                    const idx = todo_list.indexOf(item); 
                    if(idx > -1) todo_list.splice(idx,1); // 배열에서 삭제
                    renderTodo(); 
                }
            });

            // li에 요소 추가
            li.appendChild(checkbox);
            li.appendChild(span);
            li.appendChild(deleteBtn);
            ul.appendChild(li);
        });
    }

    
    document.getElementById("all").addEventListener("click", () => { 
        currentFilter="all"; 
        renderTodo(); 
    });
    document.getElementById("active").addEventListener("click", () => { 
        currentFilter="active"; 
        renderTodo(); 
    });
    document.getElementById("completed").addEventListener("click", () => { 
        currentFilter="completed"; 
        renderTodo(); 
    });

    // 새로운 할 일 추가
    document.getElementById("addForm").addEventListener("submit", (e) => {
        e.preventDefault(); 
        const input = document.getElementById("new-todo"); 
        const text = input.value.trim();
        if(text !== ""){
            todo_list.push({text: text, completed: false}); 
            input.value = ""; 
            renderTodo();
        } else {
            alert("할 일을 입력해주세요."); 
        }
    });

    renderTodo(); 
 let todo_list = [
            {text: "독서하기", completed: false},
            {text: "공부하기", completed: false},
            {text: "물 2L 마시기", completed: false},
            {text: "과제하기", completed: false}
        ]
        let currentFilter = "all";
        //let : 변수를 다른 값으로 바꿀 수 있음, const: 변수에 새 값 할당 X (객체 내부의 속성은 바꿀 수 있음)
        
        function renderTodo(){
            const ul = document.getElementById("todo"); // ul 태그 가져오기 
            ul.innerHTML=""; //기존 내용 초기화
            let filtered = todo_list.filter(function(item){
            if (currentFilter === "active"){
                return !item.completed; // 미완료
            }
            else if (currentFilter === "completed"){
                return item.completed; //완료
            }
            else{
                return true; // 전체 
            }

        });

        // forEach를 이용해 배열 출력하기 
            filtered.forEach(function(item){
                const li = document.createElement("li");

                const checkbox = document.createElement("input");
                checkbox.type = "checkbox";
                checkbox.checked = item.completed;
                
                const label = document.createElement("span");//체크박스 옆에 리스트 출력하기 위한 <span>태그
                label.textContent = item.text;
                
                //완료 상태 클래스추가 (취소선 위해서)
                if(item.completed){
                    label.classList.add("done");
                }
                //체크했을 떄 상태 변경
                checkbox.addEventListener("change", function(){
                    const idx = todo_list.indexOf(item);
                    todo_list[idx].completed = checkbox.checked;
                    renderTodo();
                });

                li.appendChild(checkbox);
                li.appendChild(label);
                ul.appendChild(li);
            });
        }
        document.getElementById("all").addEventListener("click",function(){
            currentFilter = "all";
            renderTodo();
        });
        document.getElementById("active").addEventListener("click", function(){
            currentFilter = "active";
            renderTodo();
        });
        document.getElementById("completed").addEventListener("click",function(){
            currentFilter = "completed";
            renderTodo();
        });
        renderTodo();
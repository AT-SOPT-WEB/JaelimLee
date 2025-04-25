let todos = JSON.parse(localStorage.getItem("Todo")) || [
  {
    id: 1,
    title: "과제하기",
    completed: false,
    priority: 1,
  },
  {
    id: 2,
    title: "밥 먹기",
    completed: false,
    priority: 2,
  },
  {
    id: 3,
    title: "스터디 준비하기",
    completed: true,
    priority: 1,
  },
  {
    id: 4,
    title: "세미나 듣기",
    completed: false,
    priority: 3,
  },
  {
    id: 5,
    title: "운동 가기",
    completed: false,
    priority: 2,
  },
  {
    id: 6,
    title: "방 청소하기",
    completed: true,
    priority: 2,
  },
  {
    id: 7,
    title: "책 읽기",
    completed: false,
    priority: 1,
  },
  {
    id: 8,
    title: "행복하기",
    completed: false,
    priority: 3,
  },
];

// nav 헤더
const liElements = document.querySelectorAll(".nav-ul li");
liElements.forEach((li) => {
  li.addEventListener("click", function () {
    liElements.forEach((item) => item.classList.remove("active"));

    // 클릭한 li에 active 클래스 추가
    this.classList.add("active");
  });
});

// 입력 로직
const additionBtn = document.querySelector(".addition-bar .addition-btn");
const additionTxt = document.querySelector(".addition-bar .addition-input");
const additionSelect = document.querySelector(".addition-bar .addition-select");
additionBtn.addEventListener("click", function () {
  if (additionSelect.value == "score-default" || additionTxt.value === "") {
    alert("입력조건을 확인해주세요 (할 일 입력 및 중요도 지정)");
  } else {
    console.log(additionTxt.value);

    todos.push({
      id: todos.length + 1,
      title: additionTxt.value,
      completed: false,
      priority: parseInt(additionSelect.value),
    });
    console.log(todos);
    localStorage.setItem("Todo", JSON.stringify(todos));
  }
  renderTodos();
  additionTxt.value = "";
});

// HTML 요소 선택
const allLi = document.getElementById("all-li");
const completeLi = document.getElementById("complete-li");
const incompleteLi = document.getElementById("incomplete-li");
const selectLi = document.getElementById("select-li");
const selectToggle = document.querySelector(".select-toggle");

selectLi.addEventListener("click", () => {
  // select-toggle을 보이게 함
  selectToggle.style.display =
    selectToggle.style.display === "block" ? "none" : "block";
});

// 중요도 버튼 클릭 시 필터링
const selectToggleButtons = document.querySelectorAll(".select-toggle div");

selectToggleButtons.forEach((button) => {
  button.addEventListener("click", () => {
    selectToggle.style.display = "none"; // 선택 후 toggle 숨기기
    const priority = parseInt(button.id.replace("select-toggle-", "")); // button의 id에서 중요도 추출
    const filteredTodos = todos.filter((todo) => todo.priority === priority); // 중요도로 필터링
    renderTodos(filteredTodos); // 필터링된 todos 렌더링
  });
});

// nav 리스트에 클릭 이벤트 추가
allLi.addEventListener("click", () => {
  renderTodos(todos); // 전체 목록 렌더링
});

completeLi.addEventListener("click", () => {
  const filteredTodos = todos.filter((todo) => todo.completed); // 완료된 항목만 필터링
  renderTodos(filteredTodos);
});

incompleteLi.addEventListener("click", () => {
  const filteredTodos = todos.filter((todo) => !todo.completed); // 완료된 항목만 필터링
  renderTodos(filteredTodos);
});

// 일정 데이터 fetch하기!
function renderTodos(filteredTodos = todos) {
  // 필터링된 todos 배열이 없을 경우 기본값으로 todos를 사용
  if (!Array.isArray(filteredTodos)) {
    console.error("filteredTodos is not an array:", filteredTodos);
    return;
  }

  const tbody = document.querySelector("table tbody");
  tbody.innerHTML = ""; // 기존 내용을 비우고 새로 렌더링

  filteredTodos.forEach((todo) => {
    const tr = document.createElement("tr");
    tr.classList.add("todo-data");
    tr.dataset.id = todo.id;

    const checkboxTd = document.createElement("td");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;
    checkboxTd.appendChild(checkbox);

    const priorityTd = document.createElement("td");
    priorityTd.textContent = todo.priority;

    const completedTd = document.createElement("td");
    completedTd.textContent = todo.completed ? "✅" : "❌";

    const titleTd = document.createElement("td");
    titleTd.textContent = todo.title;

    tr.appendChild(checkboxTd);
    tr.appendChild(priorityTd);
    tr.appendChild(completedTd);
    tr.appendChild(titleTd);

    tbody.appendChild(tr);
  });
}

// 체크박스 제어 (all-check 쪽)
let isAll = false;
const controlCheckBtn = document.querySelector("table thead #all-check");
const checkboxes = document.querySelectorAll(
  'table tbody input[type="checkbox"]'
);
// 전체 체크박스임
controlCheckBtn.addEventListener("click", function () {
  const checkbox = document.querySelectorAll(
    'table tbody input[type="checkbox"]'
  );
  if (isAll == false) {
    checkbox.forEach((cb) => {
      cb.checked = true;
    });
  } else {
    checkbox.forEach((cb) => {
      cb.checked = false;
    });
  }
  // isAll 값 토글
  isAll = !isAll;
});
// 개별 체크박스
checkboxes.forEach((checkbox) => {
  checkbox.addEventListener("change", function () {
    // 모든 체크박스 중 하나라도 해제되면, all-check 체크박스를 해제
    if (!this.checked) {
      document.querySelector("#all-check input").checked = false;
      isAll = false;
    } else {
      const allChecked = Array.from(checkboxes).every((cb) => cb.checked);
      if (allChecked) {
        document.querySelector("#all-check input").checked = true;
        isAll = true;
      }
    }
  });
});

// 삭제 버튼 클릭 시 체크된 todo 삭제
const deleteBtn = document.querySelector(".edit-bar .delete-btn");
deleteBtn.addEventListener("click", function () {
  // 선택된 체크박스
  const checkedCheckboxes = document.querySelectorAll(
    "table tbody input[type='checkbox']:checked"
  );

  const checkedIds = Array.from(checkedCheckboxes).map((checkbox) => {
    const row = checkbox.closest("tr");
    return parseInt(row.dataset.id);
  });

  todos = todos.filter((todo) => !checkedIds.includes(todo.id));
  localStorage.setItem("Todo", JSON.stringify(todos));

  renderTodos();
});

// 삭제 버튼 클릭 시 체크된 todo 삭제
const addBtn = document.querySelector(".edit-bar .add-btn");
addBtn.addEventListener("click", function () {
  // 모든 tr 요소들
  const rows = document.querySelectorAll("table tbody tr");

  // 각 tr에 대해 완료 상태 업데이트
  rows.forEach((row) => {
    const checkbox = row.querySelector("input[type='checkbox']");
    if (checkbox && checkbox.checked) {
      const id = row.dataset.id; // tr의 데이터 id
      const todo = todos.find((todo) => todo.id == id); // 해당 id의 todo 찾기

      if (todo && !todo.completed) {
        // 완료 상태로 변경
        todo.completed = true;

        // 완료 여부를 "완료"로 변경
        const completedTd = row.querySelector("td:nth-child(3)");
        completedTd.textContent = "완료";
      }
    }
  });

  // localStorage에 업데이트된 todos 저장
  localStorage.setItem("Todo", JSON.stringify(todos));
});

// 전체 렌더링
renderTodos();

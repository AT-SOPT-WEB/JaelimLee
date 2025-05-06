import { todosData as mockTodoData } from "./mock.js";

let todos = JSON.parse(localStorage.getItem("Todo")) || mockTodoData;

// nav 헤더
const liElements = document.querySelectorAll(".nav-ul li");
liElements.forEach((li) => {
  li.addEventListener("click", function () {
    liElements.forEach((item) => item.classList.remove("active"));
    this.classList.add("active");
  });
});

const additionBtn = document.querySelector(".addition-bar .addition-btn");
const additionTxt = document.querySelector(".addition-bar .addition-input");
const additionSelect = document.querySelector(".addition-bar .addition-select");
additionBtn.addEventListener("click", function () {
  if (additionSelect.value == "score-default" || additionTxt.value === "") {
    alert("입력조건을 확인해주세요 (할 일 입력 및 중요도 지정)");
  } else {
    todos.push({
      id: todos.length + 1,
      title: additionTxt.value,
      completed: false,
      priority: parseInt(additionSelect.value),
    });
    localStorage.setItem("Todo", JSON.stringify(todos));
  }
  renderTodos();
  additionTxt.value = "";
});
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
    selectToggle.style.display = "none !important";
    const priority = parseInt(button.id.replace("select-toggle-", ""));
    const filteredTodos = todos.filter((todo) => todo.priority === priority);
    renderTodos(filteredTodos);
  });
});

allLi.addEventListener("click", () => {
  renderTodos(todos);
});

completeLi.addEventListener("click", () => {
  const filteredTodos = todos.filter((todo) => todo.completed);
  renderTodos(filteredTodos);
});

incompleteLi.addEventListener("click", () => {
  const filteredTodos = todos.filter((todo) => !todo.completed);
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
  const checkedCheckboxes = document.querySelectorAll(
    "table tbody input[type='checkbox']:checked"
  );

  const checkedIds = Array.from(checkedCheckboxes).map((checkbox) => {
    const row = checkbox.closest("tr");
    return parseInt(row.dataset.id);
  });

  todos = todos.filter((todo) => !checkedIds.includes(todo.id));
  localStorage.setItem("Todo", JSON.stringify(todos));
  const checkboxes = document.querySelectorAll(
    'table tbody input[type="checkbox"]'
  );
  checkboxes.forEach((checkbox) => {
    checkbox.checked = false; // 모든 체크박스를 unchecked로 설정
  });
  renderTodos();
});

// 모달 로직
const modal = document.querySelector(".modal");
const modalBtn = document.querySelector(".modal-btn");
modalBtn.addEventListener("click", function () {
  modal.style.display = "none";
});

const addBtn = document.querySelector(".edit-bar .add-btn");
addBtn.addEventListener("click", function () {
  const rows = document.querySelectorAll("table tbody tr");
  let isCompletedTodoFound = false; // completed=true인 todo가 있는지 확인하는 변수

  // 각 tr에 대해 완료 상태 업데이트
  rows.forEach((row) => {
    const checkbox = row.querySelector("input[type='checkbox']");
    if (checkbox && checkbox.checked) {
      const id = row.dataset.id;
      const todo = todos.find((todo) => todo.id == id);

      if (todo) {
        if (todo.completed) {
          isCompletedTodoFound = true;
        } else if (!todo.completed) {
          todo.completed = true;

          const completedTd = row.querySelector("td:nth-child(3)");
          completedTd.textContent = "✅";
        }
      }
    }
  });

  // 만약 completed=true인 항목이 있었다면 alert 한번만 띄우기
  if (isCompletedTodoFound) {
    modal.style.display = "flex";
  }
  const checkboxes = document.querySelectorAll(
    'table tbody input[type="checkbox"]'
  );
  checkboxes.forEach((checkbox) => {
    checkbox.checked = false;
  });
  localStorage.setItem("Todo", JSON.stringify(todos));
});

// 전체 렌더링
renderTodos();

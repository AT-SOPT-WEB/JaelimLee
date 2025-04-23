export const todos = [
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
  }
});
// 일정 데이터 fetch하기!
function renderTodos() {
  const tbody = document.querySelector("table tbody");
  tbody.innerHTML = "";

  todos.forEach((todo) => {
    const tr = document.createElement("tr");
    tr.classList.add("todo-data");

    const checkboxTd = document.createElement("td");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;
    checkboxTd.appendChild(checkbox);

    const priorityTd = document.createElement("td");
    priorityTd.textContent = todo.priority;

    const completedTd = document.createElement("td");
    completedTd.textContent = todo.completed ? "완료" : "미완료";

    const titleTd = document.createElement("td");
    titleTd.textContent = todo.title;

    tr.appendChild(checkboxTd);
    tr.appendChild(priorityTd);
    tr.appendChild(completedTd);
    tr.appendChild(titleTd);

    tbody.appendChild(tr);
  });
}

renderTodos();

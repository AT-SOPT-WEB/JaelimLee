const addBtn = document.querySelector(".todo-btn");
const inputTxt = document.querySelector(".todo-input");
const todoUl = document.querySelector("#todo-ul");

let todoArr = JSON.parse(localStorage.getItem("todos")) || [];
todoArr.forEach((name) => {
  const li = document.createElement("li");
  li.textContent = name;
  todoUl.appendChild(li);
});

addBtn.addEventListener("click", () => {
  const li = document.createElement("li");
  li.textContent = inputTxt.value;
  todoUl.appendChild(li);

  todoArr.push(inputTxt.value);
  localStorage.setItem("todos", JSON.stringify(todoArr));
});

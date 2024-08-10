let input = document.getElementById("input");
let subBtn = document.querySelector(".subBtn");
let mainTodo = document.querySelector(".mainTodo");
let delBtn = document.querySelector(".delBtn");

let getItem = () => {
  return JSON.parse(localStorage.getItem("todo"));
};

let localArray = getItem() || [];

let showTodoList = () => {
  localArray.forEach((element) => {
    let div = document.createElement("div");
    div.classList.add("todo");
    div.innerHTML = `
                    <i class="fa-solid fa-circle-dot"></i>
                    <p>${element}</p>
                    <button class="delBtn">Delete</button>
            `;
    mainTodo.append(div);
    input.value = "";
  });
};

showTodoList();

subBtn.addEventListener("click", (event) => {
  event.preventDefault();
  if (input.value != "" && !localArray.includes(input.value)) {
    localArray.push(input.value);
    localArray = [...new Set(localArray)];

    localStorage.setItem("todo", JSON.stringify(localArray));

    let div = document.createElement("div");
    div.classList.add("todo");
    div.innerHTML = `
                    <i class="fa-solid fa-circle-dot"></i>
                    <p>${input.value}</p>
                    <button class="delBtn">Delete</button>
            `;
    mainTodo.append(div);
    input.value = "";
  } else {
    console.log("Filled the value");
  }
});

mainTodo.addEventListener("click", (event) => {
  event.preventDefault();
  if (event.target.classList.contains("delBtn")) {
    let previousElm = event.target.previousElementSibling.innerText;
    localArray = localArray.filter((current) => {
      return current != previousElm;
    });

    localStorage.setItem("todo", JSON.stringify(localArray));
    let parent = event.target.parentElement;
    console.log(parent);

    parent.remove();
  }
});

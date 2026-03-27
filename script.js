
function updateclock() {
  const now = new Date();

  // DATE
  document.getElementById("clock").textContent =
    now.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  // TIME
  document.getElementById("time").textContent =
    now.toLocaleTimeString("en-US", {
      hour12: true,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

  const hour = now.getHours();
  const slots = document.querySelectorAll(".time-slot");

  // remove highlight
  slots.forEach((slot) => slot.classList.remove("now"));

  // highlight based on hour
  if (hour >= 5 && hour < 6) {
    slots[0].classList.add("now");
  } else if (hour >= 6 && hour < 8) {
    slots[1].classList.add("now");
  } else if (hour >= 8 && hour < 13) {
    slots[2].classList.add("now");
  } else if (hour >= 13 && hour < 14) {
    slots[3].classList.add("now");
  } else if (hour >= 14 && hour < 19) {
    slots[4].classList.add("now");
  } else if (hour >= 19 && hour < 22) {
    slots[5].classList.add("now");
  }
}

setInterval(updateclock, 1000);
updateclock();

let input = document.getElementById("input");
let addButton = document.getElementById("add");
let todoList = document.getElementById("todo-list");
let deleteButton = document.getElementById("delete");

let tasks = []; 

addButton.addEventListener("click", function () {
  let value = input.value.trim();  // ✅ renamed

  if (value === "") {
    alert("Please enter a task");
  } else {
    let li = document.createElement("li");
    li.textContent = value;

    todoList.appendChild(li);

    tasks.push(value); // ✅ correct
    localStorage.setItem("tasks", JSON.stringify(tasks)); // ✅ same key

    input.value = "";
  }
});
deleteButton.addEventListener("click", function () {
  let items = todoList.getElementsByTagName("li");

  if (items.length === 0) {
    alert("No tasks to delete");
  } else {
    todoList.removeChild(items[0]);

    tasks.shift(); // ✅ match UI
    localStorage.setItem("tasks", JSON.stringify(tasks)); // ✅ same key
  }
});
function loadTasks() {
  let stored = localStorage.getItem("tasks");

  if (stored) {
    tasks = JSON.parse(stored);

    tasks.forEach((item) => {
      let li = document.createElement("li");
      li.textContent = item;
      todoList.appendChild(li);
    });
  }
}

loadTasks();
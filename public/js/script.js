// Wait until the DOM content is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Get references to the necessary DOM elements
  const taskInputField = document.getElementById("inputField");
  const addTaskButton = document.getElementById("addTask-btn");
  const tasksContainer = document.querySelector(".task-section");

  // Function to add the task
  const addTask = () => {
    const taskText = taskInputField.value.trim();
    if (taskText !== "") {
      createTask(taskText);
      taskInputField.value = "";
      saveTasks();
    }
  };

  addTaskButton.addEventListener("click", addTask);
  taskInputField.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      addTask();
    }
  });

  // Function to create and add a new task to the tasks container
  function createTask(taskText, isChecked = false) {
    // Create a new article element to hold the task
    const taskElement = document.createElement("article");
    taskElement.className = "task";
    if (isChecked) {
      taskElement.classList.add("task-completed");
    }

    // Create a span element for the checkbox icon
    const checkBoxIcon = document.createElement("span");
    checkBoxIcon.className = "material-symbols-outlined checkbox-icon";
    checkBoxIcon.textContent = isChecked ? "task_alt" : "radio_button_unchecked";

    // Add click event listener to toggle the checkbox state and text style
    checkBoxIcon.addEventListener("click", () => {
      const isChecked = checkBoxIcon.textContent === "radio_button_unchecked";
      checkBoxIcon.textContent = isChecked ? "task_alt" : "radio_button_unchecked";
      taskTextElement.classList.toggle("task-text-active", isChecked);
      taskTextElement.classList.toggle("task-text-inactive", !isChecked);
      taskElement.classList.toggle("task-completed", isChecked);
      saveTasks();
    });

    // Create a paragraph element for the task text
    const taskTextElement = document.createElement("p");
    taskTextElement.className = isChecked ? "task-text-active" : "task-text-inactive";
    taskTextElement.textContent = taskText;

    // Create a span element for the delete button
    const deleteButtonIcon = document.createElement("span");
    deleteButtonIcon.className = "material-symbols-outlined delete-button";
    deleteButtonIcon.textContent = "delete";

    // Add click event listener to remove the task when the delete button is clicked
    deleteButtonIcon.addEventListener("click", () => {
      tasksContainer.removeChild(taskElement);
      saveTasks();
    });

    // Append the checkbox, task text, and delete button to the task article
    taskElement.appendChild(checkBoxIcon);
    taskElement.appendChild(taskTextElement);
    taskElement.appendChild(deleteButtonIcon);

    // Append the task article to the tasks container
    tasksContainer.appendChild(taskElement);
  }

  // Function to save tasks to local storage
  function saveTasks() {
    const tasks = [];
    document.querySelectorAll(".task").forEach(taskElement => {
      const taskText = taskElement.querySelector("p").textContent;
      const isChecked = taskElement.classList.contains("task-completed");
      tasks.push({ text: taskText, completed: isChecked });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  // Function to load tasks from local storage
  function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => createTask(task.text, task.completed));
  }

  // Load tasks on initialization
  loadTasks();
});

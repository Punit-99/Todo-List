document.addEventListener("DOMContentLoaded", () => {
  const inputField = document.getElementById("inputField");
  const taskAddBtn = document.getElementById("addTask-btn");
  const taskSection = document.querySelector(".task-section");

  // Fetch and display tasks from the database
  const fetchTasks = async () => {
    try {
      const response = await fetch("/task");
      const tasks = await response.json();
      tasks.forEach((task) => {
        createTaskElement(task);
      });
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  // Function to create a task element
  const createTaskElement = (task) => {
    const taskElement = document.createElement("article");
    taskElement.classList.add("task");
    taskElement.innerHTML = `
      <span class="material-symbols-outlined checkbox-icon" id="checkBox">${
        task.checked ? "task_alt" : "radio_button_unchecked"
      }</span>
      <p class="${task.checked ? "task-text-active" : "task-text-inactive"}">${
      task.title
    }</p>
      <span class="material-symbols-outlined delete-button" id="deleteBtn">delete</span>`;
    taskSection.appendChild(taskElement);

    // Function to check/uncheck a task
    taskElement
      .querySelector("#checkBox")
      .addEventListener("click", async () => {
        try {
          const updatedTask = await fetch(`/task/${task._id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ checked: !task.checked }),
          });

          if (updatedTask.ok) {
            const updatedTaskData = await updatedTask.json();
            task.checked = updatedTaskData.checked;
            updateTaskUI(taskElement, task);
          }
        } catch (error) {
          console.error("Error updating task:", error);
        }
      });

    // Function to delete a task
    taskElement
      .querySelector("#deleteBtn")
      .addEventListener("click", async () => {
        try {
          const deleteTask = await fetch(`/task/${task._id}`, {
            method: "DELETE",
          });

          if (deleteTask.ok) {
            taskElement.remove();
          }
        } catch (error) {
          console.error("Error deleting task:", error);
        }
      });
  };

  // Function to update task UI
  const updateTaskUI = (taskElement, task) => {
    const checkBox = taskElement.querySelector("#checkBox");
    const taskText = taskElement.querySelector("p");

    checkBox.textContent = task.checked ? "task_alt" : "radio_button_unchecked";
    taskText.className = task.checked
      ? "task-text-active"
      : "task-text-inactive";
  };

  // Function to add a task
  taskAddBtn.addEventListener("click", async () => {
    const taskTitle = inputField.value.trim();
    if (taskTitle !== "") {
      try {
        const response = await fetch("/task", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title: taskTitle, checked: false }),
        });

        if (response.ok) {
          const newTask = await response.json();
          createTaskElement(newTask);
          inputField.value = "";
        }
      } catch (error) {
        console.error("Error adding task:", error);
      }
    }
  });

  fetchTasks();
});

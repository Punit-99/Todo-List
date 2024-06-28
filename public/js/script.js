document.addEventListener("DOMContentLoaded", () => {
  const inputFeild = document.getElementById("inputField");
  const taskAddBtn = document.getElementById("addTask-btn");
  const taskSection = document.querySelector(".task-section");

  // fucntion to add
  taskAddBtn.addEventListener("click", () => {
    const task = inputFeild.value.trim();
    if (task != "") {
      const taskElement = document.createElement("article");
      taskElement.classList.add("task");
      taskElement.innerHTML = `
            <span class="material-symbols-outlined checkbox-icon" id=checkBox>radio_button_unchecked</span>
            <p class="task-text-inactive">${task}</p>
            <span class="material-symbols-outlined delete-button" id="deleteBtn">delete</span>`;
      taskSection.appendChild(taskElement);
      inputFeild.value = "";

      // function to checkTask
      taskElement.querySelector("#checkBox").addEventListener("click", () => {
        const checkBox = taskElement.querySelector("#checkBox");
        const taskText = taskElement.querySelector("p");

        if (checkBox.textContent === "radio_button_unchecked") {
       checkBox.textContent="task_alt";
       taskText.classList.remove("task-text-inactive")
       taskText.classList.add("task-text-active")
        } else {
          checkBox.textContent = "radio_button_unchecked";
          taskText.classList.remove("task-text-active");
          taskText.classList.add("task-text-inactive");
        }
      });

      // fuction to delete
      taskElement.querySelector("#deleteBtn").addEventListener("click", () => {
        taskElement.remove();
      });
    }
  });
});

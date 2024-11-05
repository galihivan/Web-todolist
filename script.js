document.getElementById("toDoForm").addEventListener("submit", addTask);

function addTask(event) {
  event.preventDefault();
  const taskInput = document.getElementById("taskInput");
  const priority = document.getElementById("priority").value;
  const deadline = document.getElementById("deadline").value;
  const taskText = taskInput.value;

  // Mendapatkan nama hari dari tanggal deadline
  const dayName = getDayName(deadline);

  // Membatasi teks yang terlalu panjang di To-Do List
  const taskRow = document.createElement("tr");

  taskRow.innerHTML = `
    <td><input type="checkbox" class="task-checkbox"></td>
    <td class="task-text truncate max-w-xs">${taskText.length > 20 ? taskText.substring(0, 20) + '...' : taskText}</td>
    <td>${dayName}, ${deadline}</td>
    <td>${priority}</td>
    <td>
      <button class="detail-btn bg-green-500 text-white px-2 py-1 rounded">Detail</button>
      <button class="delete-btn bg-red-500 text-white px-2 py-1 rounded">Delete</button>
    </td>
  `;

  document.getElementById("toDoList").appendChild(taskRow);
  taskInput.value = "";

  
  taskRow.querySelector(".task-checkbox").addEventListener("change", () => handleTaskCompletion(taskRow, taskText, priority, `${dayName}, ${deadline}`));
  taskRow.querySelector(".detail-btn").addEventListener("click", () => showDetails(taskText, priority, `${dayName}, ${deadline}`));
  taskRow.querySelector(".delete-btn").addEventListener("click", () => taskRow.remove());
}

function getDayName(dateString) {
  const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  const date = new Date(dateString);
  return days[date.getDay()];
}

function handleTaskCompletion(taskRow, taskText, priority, deadlineWithDay) {
  const checkbox = taskRow.querySelector(".task-checkbox");
  const taskTextElem = taskRow.querySelector(".task-text");

  if (checkbox.checked) {
   
    taskTextElem.classList.add("line-through");

    
    const doneList = document.getElementById("doneList");
    const existingDoneTask = Array.from(doneList.children).find(row => row.querySelector(".task-text").textContent === taskText);

    if (!existingDoneTask) {
      
      const doneRow = document.createElement("tr");
      doneRow.innerHTML = `
        <td></td>
        <td class="task-text truncate max-w-xs">${taskText.length > 20 ? taskText.substring(0, 20) + '...' : taskText}</td>
        <td>${deadlineWithDay}</td>
        <td>${priority}</td>
        <td>
          <button class="detail-btn bg-green-500 text-white px-2 py-1 rounded">Detail</button>
          <button class="delete-btn bg-red-500 text-white px-2 py-1 rounded">Delete</button>
        </td>
      `;

      
      doneRow.querySelector(".detail-btn").addEventListener("click", () => showDetails(taskText, priority, deadlineWithDay));
      doneRow.querySelector(".delete-btn").addEventListener("click", () => doneRow.remove());

      
      doneList.appendChild(doneRow);
    }
  } else {
    
    taskTextElem.classList.remove("line-through");

    
    const doneList = document.getElementById("doneList");
    const existingDoneTask = Array.from(doneList.children).find(row => row.querySelector(".task-text").textContent === taskText);
    if (existingDoneTask) {
      existingDoneTask.remove();
    }
  }
}

function showDetails(task, priority, deadline) {
  document.getElementById("modalTaskName").textContent = "Task: " + task;
  document.getElementById("modalTaskPriority").textContent = "Priority: " + priority;
  document.getElementById("modalTaskDeadline").textContent = "Deadline: " + deadline;
  document.getElementById("taskDetailModal").classList.remove("hidden");
}

document.getElementById("closeModal").addEventListener("click", () => {
  document.getElementById("taskDetailModal").classList.add("hidden");
});

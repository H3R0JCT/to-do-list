document.addEventListener("DOMContentLoaded", () => {
    // Initialize the Bootstrap modal
    const modal = new bootstrap.Modal(document.getElementById('myModal'));

    // Show modal and autofill today's date
    document.querySelector('[data-target="#myModal"]').addEventListener("click", () => {
        const today = new Date().toLocaleDateString('en-CA'); // Format today's date as YYYY-MM-DD
        document.getElementById('startDate').value = today; // Autofill the start date input
        modal.show(); // Show the modal
    });

    // Close modal when the "Close" button is clicked
    document.getElementById('closeModal').addEventListener("click", () => {
        modal.hide(); // Hide the modal
    });

    // Add task to the task list
    document.getElementById("addTaskButton").addEventListener("click", () => {
        const taskName = document.getElementById("taskInput").value.trim(); // Trim whitespace
        const startDate = document.getElementById("startDate").value.trim(); // Trim whitespace
        const taskNotes = document.getElementById("taskInfo").value.trim(); // Trim whitespace

        console.log("Task Name:", taskName); // Debug log for task name
        console.log("Start Date:", startDate); // Debug log for start date

        if (taskName && startDate) { // Ensure required fields are filled
            const tableBody = document.getElementById("taskList"); // Get the task list table body
            const newRow = document.createElement("tr"); // Create a new row for the task

            // Populate the new row with task details and action buttons
            newRow.innerHTML = `
                <td>${taskName}</td>
                <td>${taskNotes}</td>
                <td>${startDate}</td>
                <td>
                    <button class="btn btn-success btn-sm complete-btn">Complete</button>
                    <button class="btn btn-danger btn-sm delete-btn">Delete</button>
                </td>
            `;

            // Add event listener to move the row to the completed tasks table
            newRow.querySelector(".complete-btn").addEventListener("click", () => {
                const completedTableBody = document.getElementById("completedList"); // Get the completed tasks table body
                const today = new Date().toLocaleDateString('en-CA'); // Format today's date as YYYY-MM-DD
                const completedRow = newRow.cloneNode(true); // Clone the row to preserve styles

                // Update the completed date and remove action buttons
                completedRow.children[2].textContent = today; // Set the completed date
                completedRow.querySelector(".complete-btn").remove(); // Remove the "Complete" button
                completedRow.querySelector(".delete-btn").remove(); // Remove the "Delete" button

                // Remove the fourth cell (Status column) from the cloned row
                completedRow.removeChild(completedRow.children[3]);

                completedTableBody.appendChild(completedRow); // Append the cloned row to the completed tasks table
                tableBody.removeChild(newRow); // Remove the original row from the task list
            });

            // Add event listener to delete the row from the task list
            newRow.querySelector(".delete-btn").addEventListener("click", () => {
                tableBody.removeChild(newRow); // Remove the row from the task list
            });

            tableBody.appendChild(newRow); // Add the new row to the task list

            // Clear modal inputs and hide the modal
            document.getElementById("taskInput").value = ""; // Clear the task name input
            document.getElementById("startDate").value = ""; // Clear the start date input
            document.getElementById("taskInfo").value = ""; // Clear the task notes input
            modal.hide(); // Hide the modal
        } else {
            alert("Please fill out all required fields."); // Alert the user if required fields are missing
        }
    });

    // Trigger the "Add Task" button when the Enter key is pressed
    document.addEventListener("keydown", (event) => {
        if (event.key === "Enter") { // Check if the Enter key was pressed
            document.getElementById("addTaskButton").click(); // Trigger the "Add Task" button
        }
    });
});

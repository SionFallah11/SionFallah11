// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCaCCK38R9btLtT5SLCwRB97vv9qbj8RFM",
  authDomain: "social-media-website-db1fe.firebaseapp.com",
  projectId: "social-media-website-db1fe",
  storageBucket: "social-media-website-db1fe.appspot.com",
  messagingSenderId: "989794613612",
  appId: "1:989794613612:web:124b17432c78a4e587db49"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
function loadWorkLog() {
    const savedWorkLog = JSON.parse(localStorage.getItem("workLog")) || [];

    const tableBody = document
        .getElementById("worklogTable")
        .getElementsByTagName("tbody")[0];

    // Clear the table
    tableBody.innerHTML = "";

    // Add each saved entry to the table
    savedWorkLog.forEach((entry, index) => {
        const newRow = tableBody.insertRow();
        const dateCell = newRow.insertCell(0);
        const descriptionCell = newRow.insertCell(1);
        const nameCell = newRow.insertCell(2);
        const actionsCell = newRow.insertCell(3);

        dateCell.textContent = entry.date;
        descriptionCell.textContent = entry.description;
        nameCell.textContent = entry.name;

        // Create edit button
        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.onclick = () => editWorkLog(index);
        actionsCell.appendChild(editButton);

        // Create delete button
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.onclick = () => deleteWorkLog(index);
        actionsCell.appendChild(deleteButton);
    });
}

// Function to add a new work log entry
function addWorkLog() {
    const date = document.getElementById("date").value;
    const description = document.getElementById("description").value;
    const name = document.getElementById("name").value;

    // Check if all fields are filled
    if (date && description && name) {
        
        const newEntry = { date, description, name };

        
        const savedWorkLog = JSON.parse(localStorage.getItem("workLog")) || [];
        savedWorkLog.push(newEntry);
        localStorage.setItem("workLog", JSON.stringify(savedWorkLog));

        
        loadWorkLog();

        
        document.getElementById("date").value = "";
        document.getElementById("description").value = "";
        document.getElementById("name").value = "";
    } else {
        alert("Please fill in all fields.");
    }
}

function editWorkLog(index) {
    const savedWorkLog = JSON.parse(localStorage.getItem("workLog")) || [];
    const entry = savedWorkLog[index];

    
    const newDate = prompt("Edit Date (MM/DD/YYYY):", entry.date);
    const newDescription = prompt("Edit Description:", entry.description);
    const newName = prompt("Edit Name:", entry.name);


    if (newDate && newDescription && newName) {
        savedWorkLog[index] = {
            date: newDate,
            description: newDescription,
            name: newName,
        };
        localStorage.setItem("workLog", JSON.stringify(savedWorkLog));
        loadWorkLog();
    } else {
        alert("All fields must be filled out to edit an entry.");
    }
}


function deleteWorkLog(index) {
    const savedWorkLog = JSON.parse(localStorage.getItem("workLog")) || [];
    savedWorkLog.splice(index, 1);
    localStorage.setItem("workLog", JSON.stringify(savedWorkLog));
    loadWorkLog();
}

window.onload = loadWorkLog;

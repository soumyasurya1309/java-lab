const employees = [];
const tbody = document.querySelector('#empTable tbody');
const emptyMsg = document.getElementById('emptyMsg');
const jsonDisplay = document.getElementById('jsonDisplay');

// Add Employee via form
document.getElementById('empForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const empObj = {
        id: document.getElementById('empId').value,
        name: document.getElementById('empName').value,
        department: document.getElementById('dept').value,
        salary: document.getElementById('salary').value
    };

    JSON.stringify(empObj); // convert to JSON string

    employees.push(empObj);
    addRow(empObj);
    updateJsonDisplay();
    this.reset();
});

// Load employees from employees.json using Fetch API
document.getElementById('loadBtn').addEventListener('click', function() {
    fetch('employees.json')
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            data.forEach(function(emp) {
                employees.push(emp);
                addRow(emp);
            });
            updateJsonDisplay();
        })
        .catch(function(error) {
            alert('Failed to load employees.json: ' + error.message);
        });
});

function addRow(emp) {
    emptyMsg.style.display = 'none';
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${emp.id}</td>
        <td>${emp.name}</td>
        <td>${emp.department}</td>
        <td>$${Number(emp.salary).toLocaleString()}</td>
    `;
    tbody.appendChild(row);
}

function updateJsonDisplay() {
    jsonDisplay.textContent = JSON.stringify(employees, null, 2);
}

// Save current employees array as JSON file
document.getElementById('saveBtn').addEventListener('click', function() {
    const blob = new Blob([JSON.stringify(employees, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'employees.json';
    a.click();
    URL.revokeObjectURL(url);
});

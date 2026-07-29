document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    var loginMessage = document.getElementById('loginMessage');
    var loginSection = document.getElementById('loginSection');
    var gradingSection = document.getElementById('gradingSection');

    loginMessage.className = 'message';
    loginMessage.textContent = '';

    var hasCapital = false;
    var hasSpecial = false;
    var isValid = true;
    var errorMsg = '';

    if (password.length < 8) {
        isValid = false;
        errorMsg += 'Password must be at least 8 characters. ';
    }

    for (var i = 0; i < password.length; i++) {
        var char = password[i];
        if (char >= 'A' && char <= 'Z') {
            hasCapital = true;
        }
        if (char === '!' || char === '@' || char === '#' || char === '$' || char === '%' || char === '^' || char === '&' || char === '*' || char === '(' || char === ')' || char === '-' || char === '_' || char === '+' || char === '=' || char === '[' || char === ']' || char === '{' || char === '}' || char === '|' || char === ';' || char === ':' || char === '"' || char === "'" || char === '<' || char === '>' || char === ',' || char === '.' || char === '?' || char === '/') {
            hasSpecial = true;
        }
    }

    if (isValid && !hasCapital) {
        isValid = false;
        errorMsg += 'Needs one capital letter. ';
    }

    if (isValid && !hasSpecial) {
        isValid = false;
        errorMsg += 'Needs one special character. ';
    }

    if (isValid) {
        loginMessage.textContent = 'Login Successful! Welcome, ' + username;
        loginMessage.classList.add('success');
        
        setTimeout(function() {
            loginSection.style.display = 'none';
            gradingSection.style.display = 'block';
            loadStudents();
        }, 1000);
    } else {
        loginMessage.textContent = 'Error: ' + errorMsg;
        loginMessage.classList.add('error');
    }
});

document.getElementById('logoutBtn').addEventListener('click', function() {
    document.getElementById('loginSection').style.display = 'block';
    document.getElementById('gradingSection').style.display = 'none';
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
    document.getElementById('loginMessage').style.display = 'none';
});

const form = document.getElementById('gradingForm');
const resultBody = document.getElementById('resultBody');
const emptyMsg = document.getElementById('emptyMsg');

let students = JSON.parse(localStorage.getItem('students')) || [];

form.addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('studentName').value.trim();
    const math = parseFloat(document.getElementById('math').value) || 0;
    const science = parseFloat(document.getElementById('science').value) || 0;
    const english = parseFloat(document.getElementById('english').value) || 0;
    const history = parseFloat(document.getElementById('history').value) || 0;

    if (name === "") {
        alert("Please enter a student name.");
        return;
    }

    const total = math + science + english + history;
    const percentage = (total / 400) * 100;
    const grade = calculateGrade(percentage);
    const status = percentage >= 40 ? "Pass" : "Fail";

    const student = {
        id: Date.now(),
        name,
        total,
        percentage: percentage.toFixed(1),
        grade,
        status
    };

    students.push(student);
    localStorage.setItem('students', JSON.stringify(students));

    form.reset();
    renderTable();
});

function calculateGrade(perc) {
    if (perc >= 80) return 'A';
    if (perc >= 60) return 'B';
    if (perc >= 40) return 'C';
    if (perc >= 33) return 'D';
    return 'F';
}

function loadStudents() {
    students = JSON.parse(localStorage.getItem('students')) || [];
    renderTable();
}

function renderTable() {
    resultBody.innerHTML = '';

    if (students.length === 0) {
        emptyMsg.style.display = 'block';
        return;
    } else {
        emptyMsg.style.display = 'none';
    }

    students.forEach((student, index) => {
        const row = document.createElement('tr');
        const gradeClass = 'grade-' + student.grade;
        const statusClass = 'status-' + student.status;

        row.innerHTML = 
            '<td><strong>' + student.name + '</strong></td>' +
            '<td>' + student.total + '</td>' +
            '<td>' + student.percentage + '%</td>' +
            '<td><span class="grade ' + gradeClass + '">' + student.grade + '</span></td>' +
            '<td><span class="status ' + statusClass + '">' + student.status + '</span></td>' +
            '<td><button class="btn-del" onclick="deleteStudent(' + index + ')">&times;</button></td>';

        resultBody.appendChild(row);
    });
}

window.deleteStudent = function(index) {
    if(confirm('Delete this record?')) {
        students.splice(index, 1);
        localStorage.setItem('students', JSON.stringify(students));
        renderTable();
    }
};
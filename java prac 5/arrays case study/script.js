class Student {
    constructor(name, mark) {
        this.name = name;
        this.mark = mark;
    }

    getGrade() {
        if (this.mark >= 90) return 'high';
        if (this.mark < 60) return 'low';
        return 'mid';
    }
}

class MarksManager {
    constructor() {
        this.students = [];
    }

    addStudent(name, mark) {
        const student = new Student(name, mark);
        this.students.push(student);
        return student;
    }

    getStats() {
        if (this.students.length === 0) return null;

        let maxStudent = this.students[0];
        let minStudent = this.students[0];
        let sum = 0;

        this.students.forEach(s => {
            if (s.mark > maxStudent.mark) maxStudent = s;
            if (s.mark < minStudent.mark) minStudent = s;
            sum += s.mark;
        });

        return {
            max: maxStudent,
            min: minStudent,
            average: (sum / this.students.length).toFixed(2)
        };
    }
}

const manager = new MarksManager();

const nameInput = document.getElementById('studentName');
const markInput = document.getElementById('studentMark');
const addBtn = document.getElementById('addBtn');
const studentListEl = document.getElementById('student-list');

const maxNameEl = document.getElementById('max-name');
const maxScoreEl = document.getElementById('max-score');
const minNameEl = document.getElementById('min-name');
const minScoreEl = document.getElementById('min-score');
const avgScoreEl = document.getElementById('avg-score');

addBtn.addEventListener('click', handleAdd);
nameInput.addEventListener('keypress', e => { if(e.key === 'Enter') handleAdd(); });
markInput.addEventListener('keypress', e => { if(e.key === 'Enter') handleAdd(); });

function handleAdd() {
    const name = nameInput.value.trim();
    const mark = parseFloat(markInput.value);

    if (!name) { alert('Enter a name'); return; }
    if (isNaN(mark) || mark < 0 || mark > 100) { alert('Enter valid mark (0-100)'); return; }

    manager.addStudent(name, mark);
    nameInput.value = '';
    markInput.value = '';
    nameInput.focus();
    updateUI();
}

function updateUI() {
    studentListEl.innerHTML = '';
    const stats = manager.getStats();

    if (!stats) {
        maxNameEl.textContent = '--'; maxScoreEl.textContent = '0';
        minNameEl.textContent = '--'; minScoreEl.textContent = '0';
        avgScoreEl.textContent = '--';
        return;
    }

    maxNameEl.textContent = stats.max.name;
    maxScoreEl.textContent = stats.max.mark;
    minNameEl.textContent = stats.min.name;
    minScoreEl.textContent = stats.min.mark;
    avgScoreEl.textContent = stats.average;

    manager.students.forEach(student => {
        const card = document.createElement('div');
        card.className = 'student-card';
        card.innerHTML = `
            <div class="student-info">
                <h3>${student.name}</h3>
                <p>Student</p>
            </div>
            <div class="mark-badge ${student.getGrade()}">${student.mark}</div>
        `;
        studentListEl.appendChild(card);
    });
}
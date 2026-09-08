var taskInput = document.getElementById('taskInput');
var addBtn = document.getElementById('addBtn');
var taskList = document.getElementById('taskList');
var taskCount = document.getElementById('taskCount');
var emptyMessage = document.getElementById('emptyMessage');

updateTaskCount();

addBtn.addEventListener('click', addTask);

taskInput.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        addTask();
    }
});

function addTask() {
    var taskText = taskInput.value.trim();

    if (taskText === '') {
        alert('Please enter a task!');
        return;
    }

    var li = document.createElement('li');

    var span = document.createElement('span');
    span.className = 'task-text';
    span.textContent = taskText;

    var editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.className = 'edit-btn';

    var deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.className = 'delete-btn';

    li.appendChild(span);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);

    taskList.appendChild(li);

    taskInput.value = '';
    taskInput.focus();

    editBtn.addEventListener('click', function () {
        var currentText = span.textContent;
        var newText = prompt('Edit your task:', currentText);

        if (newText !== null && newText.trim() !== '') {
            span.textContent = newText.trim();
        }
    });

    deleteBtn.addEventListener('click', function () {
        var parent = this.parentElement;
        parent.remove();
        updateTaskCount();
    });

    updateTaskCount();
}

function updateTaskCount() {
    var tasks = taskList.children;
    var count = tasks.length;

    taskCount.textContent = count + ' task' + (count !== 1 ? 's pending' : ' pending');

    if (count === 0) {
        emptyMessage.classList.remove('hidden');
    } else {
        emptyMessage.classList.add('hidden');
    }
}

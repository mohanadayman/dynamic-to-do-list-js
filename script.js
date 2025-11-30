document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    let tasks = [];

    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function createTaskElement(taskText) {
        const li = document.createElement('li');
        li.textContent = taskText;
        li.dataset.task = taskText;

        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.classList.add('remove-btn');
        removeBtn.addEventListener('click', function () {
            taskList.removeChild(li);
            const index = tasks.indexOf(taskText);
            if (index > -1) {
                tasks.splice(index, 1);
                saveTasks();
            }
        });

        li.appendChild(removeBtn);
        return li;
    }

    function addTask(passedTask) {
        const taskText = typeof passedTask === 'string' ? passedTask.trim() : taskInput.value.trim();

        if (taskText === '') {
            alert('Please enter a task');
            return;
        }

        tasks.push(taskText);
        saveTasks();

        const li = createTaskElement(taskText);
        taskList.appendChild(li);

        if (typeof passedTask !== 'string') taskInput.value = '';
    }

    addButton.addEventListener('click', () => addTask());

    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    function loadTasks() {
        const stored = localStorage.getItem('tasks');
        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                if (Array.isArray(parsed)) tasks = parsed;
                else tasks = [];
            } catch (e) {
                console.error('Could not parse tasks from localStorage', e);
                tasks = [];
                localStorage.removeItem('tasks');
            }
        }

        tasks.forEach((t) => {
            const li = createTaskElement(t);
            taskList.appendChild(li);
        });
    }

    loadTasks();
});

document.addEventListener('DOMContentLoaded', () => {
    const addForm = document.getElementById('add-form');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from local storage
    const loadTasks = () => {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => {
            createTaskElement(task.text, task.completed);
        });
    };

    // Save tasks to local storage
    const saveTasks = () => {
        const tasks = [];
        taskList.querySelectorAll('li').forEach(taskItem => {
            tasks.push({
                text: taskItem.firstChild.textContent,
                completed: taskItem.classList.contains('completed')
            });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    // Create a new task element
    const createTaskElement = (taskText, isCompleted) => {
        const li = document.createElement('li');
        li.textContent = taskText;

        if (isCompleted) {
            li.classList.add('completed');
        }

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = '削除';
        deleteBtn.classList.add('delete-btn');

        li.appendChild(deleteBtn);
        taskList.appendChild(li);

        // Event listener for toggling completion
        li.addEventListener('click', (e) => {
            if (e.target !== deleteBtn) {
                li.classList.toggle('completed');
                saveTasks();
            }
        });

        // Event listener for deleting a task
        deleteBtn.addEventListener('click', () => {
            taskList.removeChild(li);
            saveTasks();
        });
    };

    // Event listener for adding a new task
    addForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            createTaskElement(taskText, false);
            saveTasks();
            taskInput.value = '';
        }
    });

    loadTasks();
});

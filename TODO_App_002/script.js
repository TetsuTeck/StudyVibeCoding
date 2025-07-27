document.addEventListener('DOMContentLoaded', () => {
    const addForm = document.getElementById('add-form');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Add 20 initial tasks for testing
    const addInitialTasks = () => {
        const testTasks = [
            { text: 'デザインカンプ作成', completed: true },
            { text: 'HTMLコーディング', completed: true },
            { text: 'CSS設計', completed: false },
            { text: 'JavaScript実装', completed: false },
            { text: 'レスポンシブ対応', completed: false },
            { text: 'ブラウザテスト', completed: false },
            { text: 'サーバーサイドとの連携', completed: true },
            { text: 'データベース設計', completed: true },
            { text: 'API開発', completed: false },
            { text: 'ユーザー認証機能', completed: false },
            { text: '単体テスト作成', completed: false },
            { text: '結合テスト', completed: false },
            { text: 'UI/UX改善', completed: true },
            { text: 'パフォーマンス最適化', completed: false },
            { text: 'セキュリティ対策', completed: false },
            { text: 'デプロイ作業', completed: false },
            { text: 'ドキュメント作成', completed: true },
            { text: 'コードレビュー', completed: false },
            { text: 'バグ修正', completed: false },
            { text: '新機能Aの企画', completed: false },
        ];

        localStorage.setItem('tasks', JSON.stringify(testTasks));
        loadTasks();
    };

    // Load tasks from local storage
    const loadTasks = () => {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        if (tasks.length === 0) {
            addInitialTasks();
            return;
        }
        // Clear the list before loading
        taskList.innerHTML = '';
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

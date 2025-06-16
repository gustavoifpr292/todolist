const form = document.getElementById('task-form');
const input = document.getElementById('task-input');
const list = document.getElementById('task-list');

document.addEventListener('DOMContentLoaded', carregarTarefas);

function salvarTarefas() {
    const tasks = [];
    document.querySelectorAll('#task-list li').forEach(li => {
        tasks.push({
            text: li.querySelector('span').textContent,

            completed: li.querySelector('span').classList.contains('completed')
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function carregarTarefas() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';
        li.innerHTML = `
            <span class="${task.completed ? 'completed' : ''}">${task.text}</span>
            <div>
                <button class="btn btn-success btn-sm me-1 complete-btn">✓</button>
                <button class="btn btn-danger btn-sm delete-btn">✕</button>
            </div>
        `;
        list.appendChild(li);
    });
}

function adicionarTarefa(taskText) {
    const li = document.createElement('li');
    li.className = 'list-group-item d-flex justify-content-between align-items-center';
    li.innerHTML = `
        <span>${taskText}</span>
        <div>
            <button class="btn btn-success btn-sm me-1 complete-btn">✓</button>
            <button class="btn btn-danger btn-sm delete-btn">✕</button>
        </div>
    `;
    list.appendChild(li);
    salvarTarefas();
}

// add tarefa
form.addEventListener('submit', function(e) {
    e.preventDefault();
    const taskText = input.value.trim();
    if (taskText !== '') {
        adicionarTarefa(taskText);
        input.value = '';
        input.focus();
    }
});

list.addEventListener('click', function(e) {
    const li = e.target.closest('li');
    const span = li.querySelector('span');
    
    if (e.target.classList.contains('complete-btn')) {
        li.remove()
        salvarTarefas();
    }
    
    if (e.target.classList.contains('delete-btn')) {
        li.remove();
        salvarTarefas();
    }
});
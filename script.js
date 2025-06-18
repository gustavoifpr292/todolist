const form = document.getElementById('task-form');
const input = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const completedList = document.getElementById('completed-list');
const tasksPendentes = document.getElementById('tasks-pendentes');
const tasksConcluidas = document.getElementById('tasks-concluidas');
const filterAll = document.getElementById('filter-all');
const filterPending = document.getElementById('filter-pending');
const filterCompleted = document.getElementById('filter-completed');

//load no localstorage
document.addEventListener('DOMContentLoaded', carregarTarefas);

function salvarTarefas() {
    const tasks = [];
    document.querySelectorAll('#task-list li, #completed-list li').forEach(li => {
        tasks.push({
            text: li.querySelector('span').textContent,
            completed: li.closest('#completed-list') !== null
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function carregarTarefas() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        const li = criarElementoTarefa(task.text, task.completed);
        if (task.completed) {
            completedList.appendChild(li);
        } else {
            taskList.appendChild(li);
        }
    });
}

function criarElementoTarefa(text, completed = false) {
    const li = document.createElement('li');
    li.className = 'list-group-item d-flex justify-content-between align-items-center';
    li.innerHTML = `
        <span class="${completed ? 'completed' : ''}">${text}</span>
        <div>
            <button class="btn btn-success btn-sm me-1 complete-btn">Concluir</button>
            <button class="btn btn-danger btn-sm delete-btn">Excluir</button>
        </div>
    `;
    return li;
}

function adicionarTarefa(text) {
    const li = criarElementoTarefa(text);
    taskList.appendChild(li);
    salvarTarefas();
}

form.addEventListener('submit', function(e) {
    e.preventDefault();
    const text = input.value.trim();
    if (text !== '') {
        adicionarTarefa(text);
        input.value = '';
        input.focus();
    }
});

document.addEventListener('click', function(e) {
    const li = e.target.closest('li');
    if (!li) return;

    if (e.target.classList.contains('complete-btn')) {
        const span = li.querySelector('span');
        span.classList.add('completed');
        completedList.appendChild(li); // Move para "Concluídas"
        salvarTarefas();
    }

    if (e.target.classList.contains('delete-btn')) {
        li.remove();
        salvarTarefas();
    }
});

filterAll.addEventListener('click', () => {
	tasksPendentes.innerHTML = "Tarefas Pendentes";
    taskList.style.display = 'block';
	tasksConcluidas.innerHTML = "Tarefas Concluídas";
    completedList.style.display = 'block';
});

filterPending.addEventListener('click', () => {
	tasksPendentes.innerHTML = "Tarefas Pendentes";
    taskList.style.display = 'block';
	tasksConcluidas.innerHTML = "";
    completedList.style.display = 'none';
});

filterCompleted.addEventListener('click', () => {
	tasksPendentes.innerHTML = "";
    taskList.style.display = 'none';
	tasksConcluidas.innerHTML = "Tarefas Concluídas";
    completedList.style.display = 'block';
});
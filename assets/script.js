class Task {
    constructor(title, description, priority) {
        this.id = Date.now().toString();
        this.title = title;
        this.description = description;
        this.priority = priority;
        this.completed = false;
        this.createdAt = new Date();
    }
}

class TaskManager {
    constructor() {
        this.tasks = [];
        this.showingCompleted = false;
        
        this.taskForm = document.getElementById('taskForm');
        this.taskList = document.getElementById('taskList');
        this.errorMessage = document.getElementById('errorMessage');
        this.showCompletedBtn = document.getElementById('showCompleted');
        this.prioritySort = document.getElementById('prioritySort');
        this.formContainer = document.getElementById('taskFormContainer');
        this.showFormBtn = document.getElementById('showFormBtn');
        this.closeFormBtn = document.getElementById('closeForm');

        this.bindEvents();
    }
    
    bindEvents() {
        this.showFormBtn.addEventListener('click', () => this.showForm());
        this.closeFormBtn.addEventListener('click', () => this.hideForm());
        this.formContainer.addEventListener('click', (e) => {
            if (e.target === this.formContainer) {
                this.hideForm();
            }
        });
        
        this.taskForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleFormSubmit();
        });
        
        this.taskList.addEventListener('click', (e) => {
            e.stopPropagation();
            
            const taskItem = e.target.closest('.task-item');
            if (!taskItem) return;
            
            const taskId = taskItem.dataset.id;
            
            if (e.target.classList.contains('btn-complete')) {
                this.toggleTaskComplete(taskId);
            } else if (e.target.classList.contains('btn-delete')) {
                this.deleteTask(taskId);
            }
        });
        
        this.showCompletedBtn.addEventListener('click', () => {
            this.showingCompleted = !this.showingCompleted;
            this.showCompletedBtn.textContent = this.showingCompleted ? 
                'Tüm Görevleri Göster' : 'Tamamlananları Göster';
            this.renderTasks();
        });
        
        this.prioritySort.addEventListener('change', () => {
            this.renderTasks();
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.formContainer.classList.contains('show')) {
                this.hideForm();
            }
        });
    }
    
    showForm() {
        this.formContainer.classList.add('show');
        document.body.style.overflow = 'hidden';
        this.taskForm.querySelector('#taskTitle').focus();
    }
    
    hideForm() {
        this.formContainer.classList.remove('show');
        document.body.style.overflow = '';
        this.taskForm.reset();
        this.hideError();
    }
    
    handleFormSubmit() {
        try {
            const title = document.getElementById('taskTitle').value.trim();
            const description = document.getElementById('taskDescription').value.trim();
            const priority = document.querySelector('input[name="priority"]:checked')?.value;
            
            if (!title) {
                this.showError('Başlık alanı zorunludur!');
                return;
            }
            
            if (!priority) {
                this.showError('Lütfen bir öncelik seviyesi seçin!');
                return;
            }
      
            const task = new Task(title, description, priority);
            this.tasks.push(task);
            
            this.hideForm();
            this.renderTasks();
            
        } catch (error) {
            console.error('Görev eklenirken bir hata oluştu:', error);
            this.showError('Beklenmedik bir hata oluştu. Lütfen tekrar deneyin.');
        }
    }
    
    showError(message) {
        this.errorMessage.textContent = message;
        this.errorMessage.classList.add('show');
    }
    
    hideError() {
        this.errorMessage.textContent = '';
        this.errorMessage.classList.remove('show');
    }
    
    toggleTaskComplete(taskId) {
        const task = this.tasks.find(t => t.id === taskId);
        if (task) {
            task.completed = !task.completed;
            this.renderTasks();
        }
    }
    
    deleteTask(taskId) {
        this.tasks = this.tasks.filter(task => task.id !== taskId);
        this.renderTasks();
    }
    
    sortTasks(tasks) {
        const sortValue = this.prioritySort.value;
        if (!sortValue) return tasks;
        
        const priorityValues = { 'low': 1, 'medium': 2, 'high': 3 };
        
        return [...tasks].sort((a, b) => {
            const priorityA = priorityValues[a.priority];
            const priorityB = priorityValues[b.priority];
            return sortValue === 'asc' ? priorityA - priorityB : priorityB - priorityA;
        });
    }
    
    renderTasks() {
        let tasksToRender = this.showingCompleted ? 
            this.tasks.filter(task => task.completed) : 
            this.tasks;
        
        tasksToRender = this.sortTasks(tasksToRender);
        
        this.taskList.innerHTML = tasksToRender.length === 0 ? 
            '<div class="no-tasks">Henüz görev eklenmemiş</div>' :
            tasksToRender.map(task => `
                <div class="task-item ${task.completed ? 'completed' : ''}" data-id="${task.id}">
                    <div class="task-content">
                        <div class="task-title">
                            ${task.title}
                            <span class="task-priority priority-${task.priority}">
                                ${task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                            </span>
                        </div>
                        ${task.description ? `<div class="task-description">${task.description}</div>` : ''}
                    </div>
                    <div class="task-actions">
                        <button class="btn-complete">
                            ${task.completed ? 'Geri Al' : 'Tamamla'}
                        </button>
                        <button class="btn-delete">Sil</button>
                    </div>
                </div>
            `).join('');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const taskManager = new TaskManager();
}); 
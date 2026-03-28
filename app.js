// ================================
// Task Manager Application
// ================================

// DOM Elements
const taskInput = document.getElementById('taskInput');
const prioritySelect = document.getElementById('prioritySelect');
const dueDateInput = document.getElementById('dueDateInput');
const categorySelect = document.getElementById('categorySelect');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');
const emptyState = document.getElementById('emptyState');
const filterBtns = document.querySelectorAll('.filter-btn');
const categoryFilterBtns = document.querySelectorAll('.category-filter-btn');
const taskCounter = document.getElementById('taskCounter');
const progressFill = document.getElementById('progressFill');
const searchInput = document.getElementById('searchInput');
const clearSearchBtn = document.getElementById('clearSearchBtn');
const downloadBtn = document.getElementById('downloadBtn');
const themeToggleBtn = document.getElementById('themeToggleBtn');
const helpBtn = document.getElementById('helpBtn');
const helpOverlay = document.getElementById('helpOverlay');
const closeHelpBtn = document.getElementById('closeHelpBtn');

// State
let tasks = [];
let currentFilter = 'all';
let currentCategory = '';
let searchTerm = '';
let currentTheme = 'dark';
let draggedTaskId = null;

// ================================
// Initialize Application
// ================================
function init() {
    loadTheme();
    loadTasks();
    renderTasks();
    setupEventListeners();
}

// ================================
// Event Listeners
// ================================
function setupEventListeners() {
    addBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            currentFilter = e.target.dataset.filter;
            updateFilterButtons();
            renderTasks();
        });
    });
    
    categoryFilterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            currentCategory = e.target.getAttribute('data-category');
            updateCategoryFilterButtons();
            renderTasks();
        });
    });
    
    searchInput.addEventListener('input', (e) => {
        searchTerm = e.target.value.trim();
        renderTasks();
    });
    
    clearSearchBtn.addEventListener('click', () => {
        searchInput.value = '';
        searchTerm = '';
        renderTasks();
        searchInput.focus();
    });
    
    downloadBtn.addEventListener('click', downloadTasks);
    
    themeToggleBtn.addEventListener('click', toggleTheme);
    
    helpBtn.addEventListener('click', showHelp);
    closeHelpBtn.addEventListener('click', hideHelp);
    helpOverlay.addEventListener('click', (e) => {
        if (e.target === helpOverlay) {
            hideHelp();
        }
    });
    
    document.addEventListener('keydown', handleKeyboardShortcuts);
}

function updateFilterButtons() {
    filterBtns.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.filter === currentFilter) {
            btn.classList.add('active');
        }
    });
}

function updateCategoryFilterButtons() {
    categoryFilterBtns.forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-category') === currentCategory) {
            btn.classList.add('active');
        }
    });
}

// ================================
// Task Management
// ================================
function addTask() {
    const title = taskInput.value.trim();
    let priority = prioritySelect.value;
    const dueDate = dueDateInput.value;
    const category = categorySelect.value;
    
    if (!title) {
        taskInput.focus();
        return;
    }
    
    // Validate priority
    const validPriorities = ['low', 'medium', 'high'];
    if (!validPriorities.includes(priority)) {
        priority = 'medium';
    }
    
    const task = {
        id: Date.now(),
        title,
        priority,
        category: category || '',
        dueDate: dueDate || null,
        completed: false,
        createdAt: new Date().toLocaleDateString()
    };
    
    tasks.unshift(task);
    saveTasks();
    renderTasks();
    
    // Reset input
    taskInput.value = '';
    dueDateInput.value = '';
    categorySelect.value = '';
    prioritySelect.value = 'medium';
    taskInput.focus();
}

function toggleTask(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.completed = !task.completed;
        saveTasks();
        renderTasks();
    }
}

function deleteTask(id) {
    if (confirm('Are you sure you want to delete this task?')) {
        const taskElement = document.querySelector(`[data-task-id="${id}"]`);
        if (taskElement) {
            taskElement.classList.add('deleting');
            taskElement.addEventListener('animationend', () => {
                tasks = tasks.filter(t => t.id !== id);
                saveTasks();
                renderTasks();
            }, { once: true });
        } else {
            tasks = tasks.filter(t => t.id !== id);
            saveTasks();
            renderTasks();
        }
    }
}

// ================================
// Filtering
// ================================
function getFilteredTasks() {
    let filtered;
    
    switch (currentFilter) {
        case 'active':
            filtered = tasks.filter(t => !t.completed);
            break;
        case 'completed':
            filtered = tasks.filter(t => t.completed);
            break;
        case 'all':
        default:
            filtered = tasks;
    }
    
    // Apply category filter
    if (currentCategory) {
        filtered = filtered.filter(t => t.category === currentCategory);
    }
    
    // Apply search filter
    if (searchTerm) {
        filtered = filtered.filter(t =>
            t.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }
    
    return filtered;
}

// ================================
// Rendering
// ================================
function renderTasks() {
    const filteredTasks = getFilteredTasks();
    taskList.innerHTML = '';
    
    const hasNoTasks = tasks.length === 0;
    const hasNoResults = filteredTasks.length === 0 && tasks.length > 0;
    
    if (hasNoTasks || hasNoResults) {
        emptyState.classList.remove('hidden');
        
        // Update empty state message based on reason
        const emptyTitle = emptyState.querySelector('h2');
        const emptyParagraph = emptyState.querySelector('p');
        const emptyIcon = emptyState.querySelector('.empty-icon');
        
        if (hasNoTasks) {
            emptyIcon.textContent = '✨';
            emptyTitle.textContent = 'No tasks yet';
            emptyParagraph.textContent = 'Create your first task to get started!';
        } else if (searchTerm) {
            emptyIcon.textContent = '🔍';
            emptyTitle.textContent = 'No matching tasks';
            emptyParagraph.textContent = `No tasks found matching "${searchTerm}"`;
        } else {
            emptyIcon.textContent = '✨';
            emptyTitle.textContent = `No ${currentFilter} tasks`;
            emptyParagraph.textContent = 'Try changing the filter or adding a new task';
        }
    } else {
        emptyState.classList.add('hidden');
    }
    
    filteredTasks.forEach(task => {
        const taskElement = createTaskElement(task);
        taskList.appendChild(taskElement);
    });
    
    updateStats();
}

function createTaskElement(task) {
    const li = document.createElement('li');
    const isOverdue = isTaskOverdue(task);
    li.className = `task-item ${task.completed ? 'completed' : ''} ${isOverdue ? 'overdue' : ''}`;
    li.setAttribute('data-task-id', task.id);
    li.draggable = true;
    
    const dueeDateDisplay = task.dueDate ? formatDueDate(task.dueDate) : '';
    const dueDateSection = task.dueDate ? `
        <div class="task-meta">
            <span class="task-due-date">📅 ${dueeDateDisplay}</span>
            ${isOverdue ? '<span class="task-overdue">Overdue!</span>' : ''}
        </div>
    ` : '';
    
    li.innerHTML = `
        <div class="task-drag-handle" aria-label="Drag to reorder" title="Drag to reorder">⋮⋮</div>
        <input 
            type="checkbox" 
            class="task-checkbox" 
            ${task.completed ? 'checked' : ''}
            aria-label="Mark task as ${task.completed ? 'incomplete' : 'complete'}"
        >
        <div class="task-content">
            <div class="task-title">${escapeHtml(task.title)}</div>
            ${dueDateSection}
            <div class="task-badges">
                <span class="task-priority ${task.priority}">${task.priority.toUpperCase()}</span>
                ${task.category ? `<span class="task-category ${task.category}">${getCategoryEmoji(task.category)} ${task.category.toUpperCase()}</span>` : ''}
            </div>
        </div>
        <div class="task-actions">
            <button class="btn btn-icon btn-delete" aria-label="Delete task" title="Delete">
                🗑️
            </button>
        </div>
    `;
    
    // Add event listeners
    const checkbox = li.querySelector('.task-checkbox');
    const deleteBtn = li.querySelector('.btn-delete');
    
    checkbox.addEventListener('change', () => toggleTask(task.id));
    deleteBtn.addEventListener('click', () => deleteTask(task.id));
    
    // Drag and drop event listeners
    li.addEventListener('dragstart', handleDragStart);
    li.addEventListener('dragover', handleDragOver);
    li.addEventListener('drop', handleDrop);
    li.addEventListener('dragend', handleDragEnd);
    li.addEventListener('dragenter', handleDragEnter);
    li.addEventListener('dragleave', handleDragLeave);
    
    return li;
}

function updateStats() {
    const completedCount = tasks.filter(t => t.completed).length;
    const totalCount = tasks.length;
    const percentage = totalCount === 0 ? 0 : (completedCount / totalCount) * 100;
    
    taskCounter.textContent = `${completedCount} of ${totalCount}`;
    progressFill.style.width = `${percentage}%`;
}

// ================================
// Storage Management
// ================================
function saveTasks() {
    try {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    } catch (e) {
        console.error('Failed to save tasks to localStorage:', e);
        alert('Warning: Could not save tasks. Your changes may not persist.');
    }
}

function loadTasks() {
    try {
        const stored = localStorage.getItem('tasks');
        tasks = stored ? JSON.parse(stored) : [];
    } catch (e) {
        console.error('Failed to load tasks from localStorage:', e);
        tasks = [];
    }
}

// ================================
// Utilities
// ================================
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function isTaskOverdue(task) {
    if (!task.dueDate || task.completed) {
        return false;
    }
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dueDate = new Date(task.dueDate);
    return dueDate < today;
}

function formatDueDate(dateString) {
    const date = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.getTime() === today.getTime()) {
        return 'Today';
    } else if (date.getTime() === tomorrow.getTime()) {
        return 'Tomorrow';
    } else if (date.getTime() === yesterday.getTime()) {
        return 'Yesterday';
    }
    
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function getCategoryEmoji(category) {
    const categoryEmojis = {
        work: '💼',
        personal: '👤',
        shopping: '🛒',
        health: '💚'
    };
    return categoryEmojis[category] || '';
}

// ================================
// Export Functionality
// ================================
function downloadTasks() {
    const content = generateTasksExport();
    const element = document.createElement('a');
    const file = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(file);
    element.href = url;
    element.download = `tasks_${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(element);
    element.click();
    URL.revokeObjectURL(url);
    document.body.removeChild(element);
}

function generateTasksExport() {
    const today = new Date();
    const dateString = today.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    const header = `📋 My Tasks - Exported on ${dateString}`;
    const divider = '='.repeat(40);
    
    let content = `${header}\n${divider}\n\n`;
    
    if (tasks.length === 0) {
        content += 'No tasks yet. Start by creating your first task!\n';
    } else {
        tasks.forEach(task => {
            const statusIcon = task.completed ? '✅' : '○';
            const statusText = task.completed ? 'COMPLETED' : 'ACTIVE';
            let taskLine = `${statusIcon} [${statusText}] ${task.title}`;
            
            // Add category if present
            if (task.category) {
                taskLine += ` [${getCategoryEmoji(task.category)} ${task.category.toUpperCase()}]`;
            }
            
            // Add priority
            taskLine += ` (Priority: ${task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}`;
            
            // Add due date if present
            if (task.dueDate) {
                taskLine += `, Due: ${task.dueDate}`;
            }
            
            taskLine += ')';
            
            // Add overdue warning
            if (isTaskOverdue(task)) {
                taskLine += ' ⚠️ OVERDUE';
            }
            
            content += taskLine + '\n';
        });
    }
    
    // Add summary
    const completedCount = tasks.filter(t => t.completed).length;
    const totalCount = tasks.length;
    content += `\nSummary: ${completedCount} of ${totalCount} tasks completed`;
    
    return content;
}

// ================================
// Drag and Drop
// ================================
function handleDragStart(e) {
    const taskId = parseInt(e.currentTarget.getAttribute('data-task-id'));
    draggedTaskId = taskId;
    e.currentTarget.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', e.currentTarget.innerHTML);
}

function handleDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    return false;
}

function handleDragEnter(e) {
    const taskId = parseInt(e.currentTarget.getAttribute('data-task-id'));
    if (draggedTaskId !== taskId && taskId !== null) {
        e.currentTarget.classList.add('drag-over');
    }
}

function handleDragLeave(e) {
    e.currentTarget.classList.remove('drag-over');
}

function handleDrop(e) {
    e.stopPropagation();
    e.preventDefault();
    
    const dropTaskId = parseInt(e.currentTarget.getAttribute('data-task-id'));
    
    if (draggedTaskId !== dropTaskId && draggedTaskId !== null) {
        reorderTasks(draggedTaskId, dropTaskId);
        renderTasks();
    }
    
    e.currentTarget.classList.remove('drag-over');
    return false;
}

function handleDragEnd(e) {
    e.currentTarget.classList.remove('dragging');
    document.querySelectorAll('.task-item').forEach(item => {
        item.classList.remove('drag-over');
    });
    draggedTaskId = null;
}

function reorderTasks(draggedId, dropId) {
    const draggedIndex = tasks.findIndex(t => t.id === draggedId);
    const dropIndex = tasks.findIndex(t => t.id === dropId);
    
    if (draggedIndex === -1 || dropIndex === -1) return;
    
    const [draggedTask] = tasks.splice(draggedIndex, 1);
    tasks.splice(dropIndex, 0, draggedTask);
    
    saveTasks();
}

// ================================
// Help Overlay & Keyboard Shortcuts
// ================================
function showHelp() {
    helpOverlay.classList.add('active');
    closeHelpBtn.focus();
}

function hideHelp() {
    helpOverlay.classList.remove('active');
    helpBtn.focus();
}

function handleKeyboardShortcuts(e) {
    // Ctrl+N: Focus task input
    if (e.ctrlKey && e.key === 'n') {
        e.preventDefault();
        taskInput.focus();
        taskInput.select();
    }
    
    // Ctrl+F: Focus search input
    if (e.ctrlKey && e.key === 'f') {
        e.preventDefault();
        searchInput.focus();
        searchInput.select();
    }
    
    // Escape: Clear filters
    if (e.key === 'Escape') {
        // Close help overlay if open
        if (helpOverlay.classList.contains('active')) {
            hideHelp();
        }
        // Clear all filters
        else if (currentFilter !== 'all' || currentCategory !== '' || searchTerm !== '') {
            e.preventDefault();
            currentFilter = 'all';
            currentCategory = '';
            searchTerm = '';
            taskInput.value = '';
            searchInput.value = '';
            categorySelect.value = '';
            updateFilterButtons();
            updateCategoryFilterButtons();
            renderTasks();
        }
    }
    
    // ?: Show help overlay
    if (e.key === '?' && !e.ctrlKey && !e.shiftKey) {
        // Don't trigger if user is typing in an input
        if (e.target === document.body || e.target === taskInput || e.target === searchInput) {
            e.preventDefault();
            showHelp();
        }
    }
}

// ================================
// Theme Management
// ================================
function loadTheme() {
    try {
        const savedTheme = localStorage.getItem('theme') || 'dark';
        currentTheme = savedTheme;
        applyTheme(currentTheme);
    } catch (e) {
        console.error('Failed to load theme preference:', e);
        currentTheme = 'dark';
        applyTheme('dark');
    }
}

function applyTheme(theme) {
    const html = document.documentElement;
    if (theme === 'light') {
        html.setAttribute('data-theme', 'light');
        themeToggleBtn.textContent = '☀️';
        themeToggleBtn.setAttribute('title', 'Switch to dark mode');
    } else {
        html.removeAttribute('data-theme');
        themeToggleBtn.textContent = '🌙';
        themeToggleBtn.setAttribute('title', 'Switch to light mode');
    }
}

function toggleTheme() {
    currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(currentTheme);
    saveThemePreference();
}

function saveThemePreference() {
    try {
        localStorage.setItem('theme', currentTheme);
    } catch (e) {
        console.error('Failed to save theme preference:', e);
    }
}

// ================================
// Start Application
// ================================
init();

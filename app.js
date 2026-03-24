const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Load existing tasks from task.json file
let tasks = [];
try {
    const taskData = fs.readFileSync(path.join(__dirname, 'task.json'), 'utf8');
    tasks = JSON.parse(taskData).tasks;
} catch (error) {
    console.error('Error loading tasks:', error);
    tasks = [];
}

// Helper function to validate task input
function validateTaskInput(task, isUpdate = false) {
    const errors = [];

    if (!isUpdate) {
        if (!task.title || typeof task.title !== 'string' || task.title.trim() === '') {
            errors.push('Title is required and must be a non-empty string');
        }
        if (!task.description || typeof task.description !== 'string' || task.description.trim() === '') {
            errors.push('Description is required and must be a non-empty string');
        }
    } else {
        if (task.title !== undefined) {
            if (typeof task.title !== 'string' || task.title.trim() === '') {
                errors.push('Title must be a non-empty string');
            }
        }
        if (task.description !== undefined) {
            if (typeof task.description !== 'string' || task.description.trim() === '') {
                errors.push('Description must be a non-empty string');
            }
        }
    }

    if (task.completed !== undefined && typeof task.completed !== 'boolean') {
        errors.push('Completed must be a boolean');
    }

    return errors;
}

// GET /tasks - Retrieve all tasks
app.get('/tasks', (req, res) => {
    res.status(200).json(tasks);
});

// GET /tasks/:id - Retrieve a specific task by ID
app.get('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    if (isNaN(taskId)) {
        return res.status(400).json({ error: 'Invalid task ID' });
    }

    const task = tasks.find(t => t.id === taskId);
    if (!task) {
        return res.status(404).json({ error: 'Task not found' });
    }

    res.status(200).json(task);
});

// POST /tasks - Create a new task
app.post('/tasks', (req, res) => {
    const errors = validateTaskInput(req.body);
    if (errors.length > 0) {
        return res.status(400).json({ error: 'Validation failed', details: errors });
    }

    const newTask = {
        id: tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1,
        title: req.body.title,
        description: req.body.description,
        completed: req.body.completed !== undefined ? req.body.completed : false
    };

    tasks.push(newTask);
    res.status(201).json(newTask);
});

// PUT /tasks/:id - Update an existing task
app.put('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    if (isNaN(taskId)) {
        return res.status(400).json({ error: 'Invalid task ID' });
    }

    const taskIndex = tasks.findIndex(t => t.id === taskId);
    if (taskIndex === -1) {
        return res.status(404).json({ error: 'Task not found' });
    }

    const errors = validateTaskInput(req.body, true);
    if (errors.length > 0) {
        return res.status(400).json({ error: 'Validation failed', details: errors });
    }

    // Update task with provided fields
    const updatedTask = { ...tasks[taskIndex] };
    if (req.body.title !== undefined) updatedTask.title = req.body.title;
    if (req.body.description !== undefined) updatedTask.description = req.body.description;
    if (req.body.completed !== undefined) updatedTask.completed = req.body.completed;

    tasks[taskIndex] = updatedTask;
    res.status(200).json(updatedTask);
});

// DELETE /tasks/:id - Delete a task
app.delete('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    if (isNaN(taskId)) {
        return res.status(400).json({ error: 'Invalid task ID' });
    }

    const taskIndex = tasks.findIndex(t => t.id === taskId);
    if (taskIndex === -1) {
        return res.status(404).json({ error: 'Task not found' });
    }

    const deletedTask = tasks[taskIndex];
    tasks.splice(taskIndex, 1);
    res.status(200).json(deletedTask);
});

app.listen(port, (err) => {
    if (err) {
        return console.log('Something bad happened', err);
    }
    console.log(`Server is listening on ${port}`);
});



module.exports = app;
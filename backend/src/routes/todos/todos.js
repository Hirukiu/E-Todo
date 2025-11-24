const express = require('express');
const todos = express.Router();
const dotenv = require('dotenv');

const protect = require('../../middleware/auth');

dotenv.config();


const { todoExists } = require('./todos.query');

const { GetAllTodos } = require('./todos.query');
todos.get('/todos', protect, async (req, res, next) => {
    try {
        const db = req.app.locals.db;
        const rows = await GetAllTodos(db);
        res.status(200).json(rows);
    } catch (err) {
        next(err);
    }
});

const { GetTodoById } = require('./todos.query');
todos.get('/todos/:id', protect, async (req, res, next) => {
    try {
        const db = req.app.locals.db;
        const todoId = req.params.id;

        if (!await todoExists(todoId, db)) {
            const error = new Error('Todo not found');
            error.name = 'NotFoundError';
            throw error;
        }

        const rows = await GetTodoById(db, todoId);
        res.status(200).json(rows);
    } catch (err) {
        next(err);
    }
});

const { CreateTodo } = require('./todos.query');
todos.post('/todos', protect, async (req, res, next) => {
    try {
        const db = req.app.locals.db;
        const { title, description, due_time, user_id, status } = req.body;

        if (!title || !description || !user_id) {
            const error = new Error('Missing parameters');
            error.name = 'BadParametersError';
            throw error;
        }

        const result = await CreateTodo(db, title, description, due_time, user_id, status);
        res.status(201).json(result);
    } catch (err) {
        next(err);
    }
});

const { UpdateTodo } = require('./todos.query');
todos.put('/todos/:id', protect, async (req, res, next) => {
    try {
        const db = req.app.locals.db;
        const todoId = req.params.id;

        if (!await todoExists(todoId, db)) {
            const error = new Error('Todo not found');
            error.name = 'NotFoundError';
            throw error;
        }

        const { title, description, due_time, user_id, status } = req.body;

        if (!title || !description || !user_id) {
            const error = new Error('Missing parameters');
            error.name = 'BadParametersError';
            throw error;
        }

        const result = await UpdateTodo(db, todoId, title, description, due_time, user_id, status);
        res.status(200).json(result);
    } catch (err) {
        next(err);
    }
});

const { DeleteTodo } = require('./todos.query');
todos.delete('/todos/:id', protect, async (req, res, next) => {
    try {
        const db = req.app.locals.db;
        const todoId = req.params.id;

        if (!await todoExists(todoId, db)) {
            const error = new Error('Todo not found');
            error.name = 'NotFoundError';
            throw error;
        }

        await DeleteTodo(db, todoId);
        res.status(200).json({ "msg": `Successfully deleted record number: ${todoId}` });
    } catch (err) {
        next(err);
    }
});

module.exports = todos;

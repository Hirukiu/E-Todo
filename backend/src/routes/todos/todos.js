const express = require('express');
const todos = express.Router();
const dotenv = require('dotenv');

dotenv.config();

const { todoExists } = require('./todos.query');

const { GetAllTodos } = require('./todos.query');
todos.get('/todos', async (req, res, next) => {
    try {
        const db = req.app.locals.db;
        const rows = await GetAllTodos(db);
        res.status(200).json(rows);
    } catch (err) {
        next(err);
    }
});

const { GetTodoById } = require('./todos.query');
todos.get('/todos/:id', async (req, res, next) => {
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
todos.post('/todos', async (req, res, next) => {
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
todos.put('/todos/:id', async (req, res, next) => {
    try {
        const db = req.app.locals.db;
        const todoId = req.params.id;

        if (!await todoExists(db, todoId)) {
            const error = new Error('Todo not found');
            error.name = 'NotFoundError';
            throw error;
        }
        console.log(req.body)
        const { title, description, due_time, user_id, status } = req.body;
        console.log(todoId, title, description, due_time, user_id, status)
        if (!title || !description || !user_id || !user_id || !status) {
            const error = new Error('Missing parameters');
            error.name = 'BadParametersError';
            console.log('BadParam')
            throw error;
        }
        console.log('hey')
        const result = await UpdateTodo(db, todoId, title, description, due_time, user_id, status);
        res.status(200).json(result);
    } catch (err) {
        next(err);
    }
});

const { DeleteTodo } = require('./todos.query');
todos.delete('/todos/:id', async (req, res, next) => {
    console.log("Delete todo endpoint reached");
    try {

        const db = req.app.locals.db;
        const todoId = req.params.id;

        if (!await todoExists(db, todoId)) {
            const error = new Error('Todo not found');
            error.name = 'NotFoundError';
            throw error;
        }

        const result = await DeleteTodo(db, todoId);
        if (result.affectedRows === 0) {
            const error = new Error('Todo not found');
            error.name = 'NotFoundError';
            throw error;
        }
        res.status(200).json({ "msg": `Successfully deleted record number: ${todoId}` });
    } catch (err) {
        next(err);
    }
});

module.exports = todos;

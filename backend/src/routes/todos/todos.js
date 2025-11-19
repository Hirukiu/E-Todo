const express = require('express');
const jwt = require('jsonwebtoken');
const todos = express.Router();
const bcryptjs = require('bcryptjs');
const dotenv = require('dotenv');
dotenv.config();


const { GetAllTodos, CreateTodo } = require('./todos.query');

todos.get('/todos', (req, res) => {
    const db = req.app.locals.db;
    GetAllTodos(db).then(rows => {
        res.status(200).json(rows);
    })
});

const { GetTodoById } = require('./todos.query');
todos.get('/todos/:id', (req, res) => {
    const db = req.app.locals.db;
    const todoId = req.params.id;
    GetTodoById(db, todoId).then(rows => {
        res.status(200).json(rows);
    });
});

const { UpdateTodo } = require('./todos.query');
todos.put('/todos/:id', (req, res) => {
    const db = req.app.locals.db;
    const todoId = req.params.id;

    const { title, description, due_time, user_id, status } = req.body;
    UpdateTodo(db, todoId, title, description, due_time, user_id, status).then(result => {
        res.status(200).json(result);
    });
});

const { CreateTodo } = require('./todos.query');
todos.post('/todos', (req, res) => {
    const db = req.app.locals.db;
    const { title, description, due_time, user_id, status } = req.body;

    CreateTodo(db, title, description, due_time, user_id, status).then(result => {
        res.status(201).json(result);
    });
});

const { DeleteTodo } = require('./todos.query');
todos.delete('/todos/:id', (req, res) => {
    const db = req.app.locals.db;
    const todoId = req.params.id;
    DeleteTodo(db, todoId).then(() => {
        res.status(200).json({ "msg": `Successfully deleted record number: ${todoId}` });
    });
});
module.exports = todos;
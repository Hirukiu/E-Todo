const express = require('express');
const users = express.Router();
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const dotenv = require('dotenv');

dotenv.config();


const { GetAllUsers } = require('./user.query');
users.get('/user', (req, res) => {
    const db = req.app.locals.db;
    GetAllUsers(db).then(rows => {
        res.status(200).json(rows);
    })
});

const { GetAllUsersTodos } = require('./user.query');
users.get('/user/todos', (req, res) => {
    const db = req.app.locals.db;

    GetAllUsersTodos(db).then(rows => {
        res.status(200).json(rows);
    });
});

const { GetUserById } = require('./user.query');
users.get('/users/:id', (req, res) => {
    const db = req.app.locals.db;
    GetUserById(db, req.params.id).then(rows => {
        res.status(200).json(rows);
    });
});


const { GetUserByEmail } = require('./user.query');
users.get('/users/:email', (req, res) => {
    const db = req.app.locals.db;
    GetUserByEmail(db, req.params.email).then(rows => {
        res.status(200).json(rows);
    });
});

const { UpdateUser } = require('./user.query');
users.put('/users/:id', (req, res) => {
    const db = req.app.locals.db;
    const { email, name, firstname, password } = req.body;
    UpdateUser(db, req.params.id, email, name, firstname, password).then(result => {
        res.status(200).json(result);
    });
});

const { DeleteUser } = require('./user.query');

users.delete('/users/:id', (req, res) => {
    const db = req.app.locals.db;
    DeleteUser(db, req.params.id).then(result => {
        res.status(200).json({ msg: `Successfully deleted record number: ${req.params.id}` });
    });
});
    

module.exports = users;
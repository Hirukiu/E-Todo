const express = require('express');
const users = express.Router();
const dotenv = require('dotenv');
dotenv.config();
const { IdExists } = require('./user.query');
const { userExists } = require('./user.query');

const { GetAllUsers } = require('./user.query');
users.get('/user', async (req, res, next) => {
    try {
        const db = req.app.locals.db;
        const rows = await GetAllUsers(db);
        res.status(200).json(rows);
    } catch (err) {
        next(err);
    }
});


const { GetAllUsersTodos } = require('./user.query');
users.get('/user/todos', async (req, res, next) => {
    try {
        const db = req.app.locals.db;
        const rows = await GetAllUsersTodos(db);
        res.status(200).json(rows);
    } catch (err) {
        next(err);
    }
});

const { GetUserById } = require('./user.query');
users.get('/users/:id', async (req, res, next) => {
    try {
        const db = req.app.locals.db;
        if (!await IdExists(req.params.id, db)) {
            const error = new Error('User not found');
            error.name = 'NotFoundError';
            throw error;
        }
        const rows = await GetUserById(db, req.params.id);

        if (!rows || rows.length === 0) {
            const error = new Error('User not found');
            error.name = 'NotFoundError';
            throw error;
        }

        res.status(200).json(rows);
    } catch (err) {
        next(err);
    }
});


const { GetUserByEmail } = require('./user.query');
users.get('/users/:email', async (req, res, next) => {
    try {
        const db = req.app.locals.db;
        if (!await userExists(req.params.email, db)) {
            const error = new Error('User not found');
            error.name = 'NotFoundError';
            throw error;
        }
        const rows = await GetUserByEmail(db, req.params.email);

        if (!rows || rows.length === 0) {
            const error = new Error('User not found');
            error.name = 'NotFoundError';
            throw error;
        }

        res.status(200).json(rows);
    } catch (err) {
        next(err);
    }
});

const { UpdateUser } = require('./user.query');
users.put('/users/:id', async (req, res, next) => {
    try {
        const db = req.app.locals.db;
        if (!await IdExists(req.params.id, db)) {
            const error = new Error('User not found');
            error.name = 'NotFoundError';
            throw error;
        }
        const { email, name, firstname, password } = req.body;

        if (!email || !name || !firstname || !password) {
            const error = new Error('Missing parameters');
            error.name = 'BadParametersError';
            throw error;
        }

        const result = await UpdateUser(db, req.params.id, email, name, firstname, password);
        res.status(200).json(result);
    } catch (err) {
        next(err);
    }
});


const { DeleteUser } = require('./user.query');
users.delete('/users/:id', async (req, res, next) => {
    try {
        const db = req.app.locals.db;
        if (!await IdExists(req.params.id, db)) {
            const error = new Error('User not found');
            error.name = 'NotFoundError';
            throw error;
        }
        await DeleteUser(db, req.params.id);
        res.status(200).json({ msg: `Successfully deleted record number: ${req.params.id}` });
    } catch (err) {
        next(err);
    }
});

module.exports = users;

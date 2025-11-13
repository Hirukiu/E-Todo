const express = require('express');
const jwt = require('jsonwebtoken');
const auth = express.Router();
const db = req.app.locals.db;
const bcryptjs = require('bcryptjs');
const dotenv = require('dotenv');

dotenv.config();
const key = process.env.SECRET

function authenticateUser(user, password) {
    return db.query('SELECT COUNT(*) FROM users WHERE name = ? AND password = ?', [user, password]);
}

function userExists(email) {
    return db.query('SELECT COUNT(*) FROM users WHERE email = ?', [email]);
}

function registerUser(email, name, firstname, password) {
    return db.query('INSERT INTO users (email, name, firstname, password) VALUES (?, ?, ?, ?)', [email, name, firstname, password]);
}

function hashPassword(password) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
}

function verifyPassword(password, hashedPassword) {
    return bcrypt.compareSync(password, hashedPassword);
}

auth.post('/register', (req, res) => {
    const { email, name, firstname, password } = req.body;
    password = hashPassword(password);
    if (!userExists(email)){
        registerUser(email, name, firstname, password);

        const token = jwt.sign(
            { email, name },         // les infos a encoder
            key,                     // la clé pour encoder les trucs
            { expiresIn: '1h' }      // la durée du token
        );


        res.status(201).json({"token": token});
    }
    else {
        res.status(409).json({"msg":"Account already exists"});
    }
});


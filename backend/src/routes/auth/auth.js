

const express = require('express');
const jwt = require('jsonwebtoken');
const auth = express.Router();
const bcryptjs = require('bcryptjs');
const dotenv = require('dotenv');

dotenv.config();

const key = process.env.SECRET

 

function userExists(email, db) {
    return db.query('SELECT COUNT(*) FROM users WHERE email = ?', [email]);
}

function registerUser(email, name, firstname, password, db) {
    return db.query('INSERT INTO users (email, name, firstname, password) VALUES (?, ?, ?, ?)', [email, name, firstname, password]);
}

function hashPassword(password) {
    const salt = bcryptjs.genSaltSync(10);
    return bcryptjs.hashSync(password, salt);
}

function verifyPassword(password, hashedPassword) {
    return bcryptjs.compareSync(password, hashedPassword);
}

auth.post('/register', (req, res) => {
    console.log("Register request received");
    const db = req.app.locals.db;
    const { email, name, firstname, password } = req.body;
    const hashedPassword = hashPassword(password);
    if (!userExists(email, db)) {
        registerUser(email, name, firstname, hashedPassword, db);

        const token = jwt.sign(
            { email, name },         // les infos a encoder
            key,                     // la clé pour encoder les trucs
            { expiresIn: '1h' }      // la durée du token
        );
        res.status(201).json({ "token": token });
    }
    else {
        res.status(409).json({ "msg": "Account already exists" });
    }
});

module.exports = auth;
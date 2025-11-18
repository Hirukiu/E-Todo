

const express = require('express');
const jwt = require('jsonwebtoken');
const auth = express.Router();
const bcryptjs = require('bcryptjs');
const dotenv = require('dotenv');

dotenv.config();

const key = process.env.SECRET



async function userExists(email, db) {
    const [rows] = await db.query('SELECT COUNT(*) AS count FROM user WHERE email = ?', [email]);
    return rows[0].count > 0;
}

async function registerUser(email, name, firstname, password, db) {
    const [result] = await db.query(
        'INSERT INTO user (email, name, firstname, password) VALUES (?, ?, ?, ?)',
        [email, name, firstname, password]
    );
    return;
}

function hashPassword(password) {
    const salt = bcryptjs.genSaltSync(10);
    return bcryptjs.hashSync(password, salt);
}

function verifyPassword(password, hashedPassword) {
    return bcryptjs.compareSync(password, hashedPassword);
}



auth.post('/register', async (req, res) => {  // ← async ici
    console.log("requete recue");

    const db = req.app.locals.db;
    const { email, name, firstname, password } = req.body;
    const hashedPassword = hashPassword(password);

    if (!await userExists(email, db)) {
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
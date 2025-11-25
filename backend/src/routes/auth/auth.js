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

function generateToken(id, email, name) {
  const token = jwt.sign(
    { id, email, name },
    key,
    { expiresIn: '1h' }
  );
  return token;
}

auth.post('/register', async (req, res, next) => {
  console.log("register endpoint reached");
  try {
    const db = req.app.locals.db;
    const { email, name, firstname, password } = req.body;

    if (!email || !name || !firstname || !password) {
      const error = new Error('Missing parameters');
      error.name = 'BadRequestError';
      throw error;
    }

    const hashedPassword = hashPassword(password);

    if (!await userExists(email, db)) {
      await registerUser(email, name, firstname, hashedPassword, db);

      // --- NOUVEAU: Récupérer l'utilisateur juste créé pour obtenir l'ID ---
      const [newRows] = await db.query('SELECT id, email, name FROM user WHERE email = ?', [email]);
      const newUser = newRows[0];
      // --------------------------------------------------------------------

      const token = generateToken(newUser.id, newUser.email, newUser.name); // 👈 PASSAGE de l'ID
      return res.status(201).json({ token });
    } else {
      res.status(409).json({ "msg": "Account already exists" });
    }

  } catch (err) {
    next(err);
  }
});

auth.post('/login', async (req, res, next) => {
  try {
    const db = req.app.locals.db;
    const { email, password } = req.body;

    if (!email || !password) {
      const error = new Error('Missing parameters');
      error.name = 'BadParametersError';
      throw error;
    }

    // La requête SQL doit récupérer l'ID ! (SELECT id, ... au lieu de SELECT *)
    const [rows] = await db.query('SELECT id, email, name, password FROM user WHERE email = ?', [email]);

    if (rows.length === 0) {
      return res.status(401).json({ "msg": "Invalid credentials" });
    }

    const user = rows[0];

    if (verifyPassword(password, user.password)) {
      const token = generateToken(user.id, user.email, user.name); // 👈 PASSAGE de l'ID
      res.status(200).json({ "token": token });
    } else {
      res.status(401).json({ "msg": "Invalid credentials" });
    }
  } catch (err) {
    next(err);
  }
});

module.exports = auth;
 async function userExists(email, db) {
    const [rows] = await db.query('SELECT COUNT(*) AS count FROM user WHERE email = ?', [email]);
    return rows[0].count > 0;
}

 async function registerUser(email, name, firstname, password, db) {
    const [result] = await db.query(
        'INSERT INTO user (email, name, firstname, password) VALUES (?, ?, ?, ?)',
        [email, name, firstname, password]
    );
    return ;
}

 function hashPassword(password) {
    const salt = bcryptjs.genSaltSync(10);
    return bcryptjs.hashSync(password, salt);
}

 function verifyPassword(password, hashedPassword) {
    return bcryptjs.compareSync(password, hashedPassword);
}

 function generateToken(email, name, duration = '1h') {
    const token = jwt.sign(
        { email, name },         // les infos a encoder
        key,                     // la clé pour encoder les trucs
        { expiresIn: duration }  // la durée du token
    );
    return token;
}


module.exports = {
  userExists,
  registerUser,
  verifyPassword,
  hashPassword,
  generateToken
};
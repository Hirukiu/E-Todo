export async function GetAllUsers(db){
    const [rows] = await db.query('SELECT id, email, password, created_at, firstname, name FROM user');
    return rows;
}

export async function GetUserTodos(db, userId){
    const [rows] =  await db.query('SELECT id, title, description, created_at, due_time, user_id, status FROM todo WHERE user_id = ?', [userId]);
    return rows;
}

export async function GetAllUsersTodos (db){
    const [rows] =  await db.query('SELECT id, title, description, created_at, due_time, user_id, status FROM todo');
    return rows;
}

export async function GetUserById(db, id){
    const [rows] = await db.query('SELECT id, email, password, created_at, firstname, name FROM user WHERE id = ?', [id]);
    return rows;
}

export async function GetUserByEmail(db, email){
    const [rows] = await db.query('SELECT id, email, password, created_at, firstname, name FROM user WHERE email = ?', [email]);
    return rows;
}   

export async function UpdateUser(db, id, email, name, firstname, password){
    const [result] = await db.query('UPDATE user SET email = ?, name = ?, firstname = ?, password = ? WHERE id = ?', [email, name, firstname, password, id]);
    return result;
}

export async function DeleteUser(db, id){
    const [result] = await db.query('DELETE FROM user WHERE id = ?', [id]);
    return;
}

export async function userExists(email, db){
    const [rows] = await db.query('SELECT email FROM user WHERE email = ?', [email]);
    return rows.length > 0;
}
export async function IdExists(id, db){
    const [rows] = await db.query('SELECT id FROM user WHERE id = ?', [id]);
    return rows.length > 0;
}
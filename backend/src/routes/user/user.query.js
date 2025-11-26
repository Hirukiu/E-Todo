
async function GetAllUsers(db){
    const [rows] = await db.query('SELECT id, email, password, created_at, firstname, name FROM user');
    return rows;
}

async function GetUserTodos(db, userId){
    const [rows] =  await db.query('SELECT id, title, description, created_at, due_time, user_id, status FROM todo WHERE user_id = ?', [userId]);
    return rows;
}




async function GetUserById(db, id){
    const [rows] = await db.query('SELECT id, email, password, created_at, firstname, name FROM user WHERE id = ?', [id]);
    return rows;
}


async function GetUserByEmail(db, email){

    const [rows] = await db.query('SELECT id, email, password, created_at, firstname, name FROM user WHERE email = ?', [email]);
    return rows;
}   


async function UpdateUser(db, id, email, name, firstname, password){

    const [result] = await db.query('UPDATE user SET email = ?, name = ?, firstname = ?, password = ? WHERE id = ?', [email, name, firstname, password, id]);
    return result;
}


async function DeleteUser(db, id){
    const [result] = await db.query('DELETE FROM user WHERE id = ?', [id]);
    return;
}


async function userExists(email, db){
    const [rows] = await db.query('SELECT email FROM user WHERE email = ?', [email]);
    return rows.length > 0;
}
async function IdExists(id, db){
    const [rows] = await db.query('SELECT id FROM user WHERE id = ?', [id]);
    return rows.length > 0;
}

async function GetAllUserTodos(db,id)
{
    const [rows] = await db.query('SELECT id, title, description, created_at, due_time, user_id, status FROM todo WHERE user_id = ?', [id]);
    return rows;
}
module.exports = {
    GetAllUsers,
    GetUserTodos,
    GetUserById,
    GetUserByEmail,
    UpdateUser,
    DeleteUser,
    userExists,
    GetAllUserTodos,
    IdExists
};
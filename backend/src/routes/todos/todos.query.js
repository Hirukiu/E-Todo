import e from "express";

export async function GetAllTodos(db){
    const [rows] = await db.query('SELECT id, title, description, created_at, due_time, user_id, status FROM todo');
    return rows;
}

export async function GetTodoById(db, id){
    const [rows] = await db.query('SELECT id, title, description, created_at, due_time, user_id, status FROM todo WHERE id = ?', [id]);
    return rows;
}

export async function UpdateTodo(db, id, title, description, due_time, user_id, status){
    await db.query('UPDATE todo SET title = ?, description = ?, due_time = ?, user_id = ?, status = ? WHERE id = ?', [title, description, due_time, user_id, status, id]);
    const [result] = await db.query('SELECT id, title, description, created_at, due_time, user_id, status FROM todo WHERE id = ?', [id]);
    return result;
}

export async function CreateTodo(db, title, description, due_time, user_id, status){
    await db.query('INSERT INTO todo (title, description, due_time, user_id, status) VALUES (?, ?, ?, ?, ?)', [title, description, due_time, user_id, status]);
    const [result] = await db.query('SELECT id, title, description, created_at, due_time, user_id, status FROM todo WHERE id = LAST_INSERT_ID()');
    return result;
}  

export async function DeleteTodo(db, id){
    const [result] = await db.query('DELETE FROM todo WHERE id = ?', [id]);
    return;
}
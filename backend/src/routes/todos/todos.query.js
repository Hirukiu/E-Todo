function formatDate(isoDateString) {
    if (!isoDateString) {
        return null;
    }
    
    const date = new Date(isoDateString);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

async function GetAllTodos(db){
    const [rows] = await db.query('SELECT id, title, description, created_at, due_time, user_id, status FROM todo');
    
    return rows.map(todo => ({
        ...todo,
        created_at: formatDate(todo.created_at),
        due_time: formatDate(todo.due_time)
    }));
}

async function GetTodoById(db, id){
    const [rows] = await db.query('SELECT id, title, description, created_at, due_time, user_id, status FROM todo WHERE id = ?', [id]);
    
    if (rows.length === 0) {
        return null;
    }
    
    const todo = rows[0];
    return {
        ...todo,
        created_at: formatDate(todo.created_at),
        due_time: formatDate(todo.due_time)
    };
}

async function UpdateTodo(db, id, title, description, due_time, user_id, status){
    const [result] = await db.query('UPDATE todo SET title = ?, description = ?, due_time = ?, user_id = ?, status = ? WHERE id = ?', [title, description, due_time, user_id, status, id]);
    return result;
}

async function CreateTodo(db, title, description, due_time, user_id, status){
    const [result] = await db.query('INSERT INTO todo (title, description, due_time, user_id, status) VALUES (?, ?, ?, ?, ?)', [title, description, due_time, user_id, status]);
    return result;
}  

async function DeleteTodo(db, id){
    const [result] = await db.query('DELETE FROM todo WHERE id = ?', [id]);
    return result;
}

async function todoExists(db, id) {
    const [rows] = await db.query('SELECT 1 FROM todo WHERE id = ?', [id]);
    return rows.length > 0;
}

module.exports = {
    GetAllTodos,
    GetTodoById,
    UpdateTodo,
    CreateTodo,
    DeleteTodo,
    todoExists
}; 

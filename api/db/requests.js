const db = require('./configuration');

//TASKS REQUESTS

function deleteTask(table, taskId, callback) {
    db.any(`DELETE FROM ${table} WHERE id = ${taskId}`)
        .then(() => {
            callback(null)
        })
        .catch(error => {
            callback(error);
        })
}

function updateTask(table, task, callback) {
    db.any(`UPDATE ${table} 
        SET name = '${task.name}', 
        completed = ${task.completed} 
        WHERE id = ${task.id}
        RETURNING id, name, completed`)
        .then(([result]) => {
            callback(null, result)
        })
        .catch(error => {
            callback(error)
        })
}

function createTask(table, task, userId, callback) {
    db.any(`INSERT INTO ${table} ( name, completed, account_id ) 
        VALUES ('${task.name}', ${task.completed}, ${userId}) RETURNING *`)
        .then(([result]) => {
            callback(null, result)
        })
        .catch(error => {
            callback(error);
        })
}

//ACCOUNTS REQUESTS

function createUser(table, account, callback) {
    db.any(`INSERT INTO ${table} ( username, email, hash )
        VALUES ('${account.username}', '${account.email}', '${account.hash}')`)
        .then(() => {
            callback(null);
        })
        .catch(error => {
            callback(error);
        })
}

function getUserId(table, account, callback) {
    db.any(`SELECT * FROM ${table} WHERE email = '${account.email}' `)
        .then(([result]) => {
            callback(null, result);
        })
        .catch(err => {
            callback(err);
        })
}

function getUserInfo(id, callback) {
    db.any(`SELECT a.username, t.id AS taskid, t.name, t.completed, i.image_path FROM accounts a
        JOIN tasks t ON a.id = t.account_id
        LEFT JOIN image i ON a.id = i.account_id 
        WHERE a.id = ${id} ORDER BY t.id`)
        .then(results => {
            const tasks = results.map(row => ({
                id: row.taskid,
                name: row.name,
                completed: row.completed
            }));

            const user = {
                username: results[0].username,
                tasks: tasks,
                image_path: results[0].image_path
            }
            callback(null, user);
        })
        .catch(error => {
            callback(error);
        })
}

//PROFILE PHOTO REQUESTS

function insertProfilePhoto(table, imgPath, userId, callback) {
    db.any(`INSERT INTO ${table} ( image_path, account_id )
        VALUES ( '${imgPath}', ${userId} ) RETURNING *`)
        .then(([result]) => {
            callback(null, result);
        })
        .catch(error => {
            callback(error);
        })
}

function hasProfilePhoto(userId, callback) {
    const query = `SELECT image_path FROM image WHERE account_id = ${userId} LIMIT 1`;
    db.any(query)
        .then(([result]) => {
            callback(null, true, result.image_path);
        })
        .catch(err => {
            callback(err, false);
        })
}

function deleteProfilePhoto(userId, callback) {
    const query = `DELETE FROM image WHERE account_id = ${userId}`;
    db.any(query)
        .then(() => {
            callback(null);
        })
        .catch(err => {
            callback(err);
        })
}

module.exports = {
    deleteTask,
    updateTask,
    createTask,
    createUser,
    getUserInfo,
    getUserId,
    insertProfilePhoto,
    deleteProfilePhoto,
    hasProfilePhoto
}
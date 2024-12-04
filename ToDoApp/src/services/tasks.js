export async function deleteTask(id, token) {
    await fetch(`/api/dashboard/tasks/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
}

export async function updatesTask(task, token) {
    console.log(token);
    const response = await fetch(`/api/dashboard/tasks/${task.id}`, {
        method: 'PUT',
        body: JSON.stringify(task),
        headers: {
            'content-type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    const updatedTask = await response.json();
    return updatedTask;
}

export async function createTask(task, token) {
    const response = await fetch(`/api/dashboard/tasks/new`, {
        method: 'POST',
        body: JSON.stringify(task),
        headers: {
            'content-type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    const newTask = await response.json();
    return newTask;
}
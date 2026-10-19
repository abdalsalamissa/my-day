// the API
const API_URL = "http://localhost:5217/api"

// names conventions
const fromServer = (task) => ({ id: task.id, text: task.title, completed: task.completed });

// reusable fetch function
async function request(path, options= {}) {
    const response = await fetch(`${API_URL}${path}`, {
        ...options,
        headers: options.body ? { "Content-Type": "application/json" } : undefined,
    });

    if(!response.ok) {
        throw new Error(`Request failed (${response.status})`);
    }

    if(response.status === 204) return null;

    return response.json();
}

// fetch api for get tasks
export async function getTasks() {
    const data = await request("/tasks");
    return data.map(fromServer);
}

// fetch api for create tasks
export async function createTask(text) {
    const data = await request("/tasks", {
        method: "POST",
        body: JSON.stringify({ title: text}),
    });
    return fromServer(data);
}

// fetch api for update tasks
export async function updateTask(id, text, completed) {
    const data = await request(`/tasks/${id}`, {
        method: "PUT",
        body: JSON.stringify({ title: text, completed}),
    });
    return fromServer(data);
}

// fetch api for delete tasks
export async function deleteTask(id) {
    await request(`/tasks/${id}`, { method: "DELETE" })
}

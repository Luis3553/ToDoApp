export async function createAccount(account) {
    const response = await fetch(`/api/register`, {
        method: 'POST',
        body: JSON.stringify(account),
        headers: {
            'content-type': 'application/json'
        }
    });
    return response.status;
}

export async function login(account) {
    const response = await fetch(`/api/login`, {
        method: 'POST',
        body: JSON.stringify(account),
        headers: {
            'content-type': 'application/json'
        }
    });
    const token = await response.json();
    return token;
}

export async function getUserInfo(token) {
    const response = await fetch('/api/dashboard', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Cache-Control': 'no-cache, no-store, must-revalidate', // Disable caching
            'Pragma': 'no-cache',
            'Expires': '0'
        }
    });
    const user = await response.json();
    return user;
}
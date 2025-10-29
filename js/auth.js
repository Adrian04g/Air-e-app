const API_BASE = 'http://127.0.0.1:8000/api/'; // Base de tu API
let ACCESS_TOKEN = null;

// --- 1. FUNCIÓN DE AUTENTICACIÓN (LOGIN) ---
document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const loginMessage = document.getElementById('loginMessage');
    const url = `${API_BASE}token/`; 

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });
        const data = await response.json();
        if (response.ok) {
            ACCESS_TOKEN = data.access; 
            localStorage.setItem('token', data.access);
            loginMessage.className = 'message success';
            loginMessage.textContent = '✅ Sesión iniciada.';
            window.location.href = 'home.html'; // Redirigir a la página de creación
        } else {
            loginMessage.className = 'message error';
            loginMessage.textContent = `❌ Error: ${data.detail || 'Verifique credenciales.'}`;
        }
    } catch (error) {
        loginMessage.className = 'message error';
        loginMessage.textContent = `❌ Error de red: ${error.message}`;
    }
});
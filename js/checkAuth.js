function checkAuth() {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = 'index.html';
    }
    return token;
}
function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = 'index.html';
}
const API_BASE = 'http://127.0.0.1:8000/api/'; 

async function getUserProfile() {
    const token = checkAuth();
    if (!token) {
        console.error("No hay token. El usuario no está logueado.");
        document.getElementById('userInfo').textContent = "Por favor, inicia sesión.";
        return;
    }
    
    const url = `${API_BASE}auth/user/`;
    const userInfoContainer = document.getElementById('userInfo'); // Asume que tienes un div con este ID
    userInfoContainer.textContent = 'Cargando perfil...';

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: { 
                // Usar el token Bearer para autenticar la petición
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        
        const userData = await response.json();
        localStorage.setItem('user', userData.id);
        if (response.ok) {
            // Mostrar la información en el frontend
            displayUserProfile(userData);
        } else {
            console.error("Error al obtener perfil:", userData);
            userInfoContainer.textContent = `Error: ${userData.detail || 'Fallo de autenticación.'}`;
        }
    } catch (error) {
        console.error("Error de red:", error);
        userInfoContainer.textContent = `Error de red: ${error.message}`;
    }
}

function displayUserProfile(user) {
    const container = document.getElementById('userInfo');
    const usernav = document.getElementById('usernav');
    if (container) {
        container.innerHTML = `
            <h3>👋 ¡Bienvenido, ${user.first_name || user.username}!</h3>
            <ul>
                <li><strong>Usuario:</strong> ${user.username}</li>
                <li><strong>Email:</strong> ${user.email}</li>
                <li><strong>ID:</strong> ${user.id}</li>
            </ul>
        `;
    }
    if (usernav) {
        usernav.innerHTML = `<span>${user.username}</span>`;
    }
}

// Llama a la función cuando el DOM esté listo o después del login exitoso
document.addEventListener('DOMContentLoaded', getUserProfile);
// o si es después del login:
// // loginSuccessful().then(getUserProfile);
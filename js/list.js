const API_BASE = 'http://127.0.0.1:8000/api/'; // Base de tu API
let ACCESS_TOKEN = null;

async function getCableoperadoresList() {
    if (!localStorage.getItem('token')) { alert("Necesitas iniciar sesión."); return; }
    const url = `${API_BASE}cableoperadores/book/`; 
    const listMessage = document.getElementById('listMessage'); 
    document.getElementById('cableoperadoresListContainer').innerHTML = ''; 

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        });
        const data = await response.json();
        if (response.ok) {
            listMessage.className = 'message success';
            listMessage.textContent = `✅ Se cargaron ${data.length} registros.`;
            displayCableoperadores(data); 
        } else {
            listMessage.className = 'message error';
            listMessage.textContent = `❌ Error al listar: ${JSON.stringify(data)}`;
        }
    } catch (error) {
        listMessage.className = 'message error';
        listMessage.textContent = `❌ Error de red: ${error.message}`;
    }
}

function displayCableoperadores(data) {
    const container = document.getElementById('cableoperadoresListContainer');
    container.innerHTML = ''; 
    if (!data || data.length === 0) {
        container.innerHTML = '<li>No se encontraron registros.</li>';
        return;
    }
    data.forEach(item => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `<strong>ID:</strong> ${item.id} | <strong>Nombre:</strong> ${item.nombre}`;
        container.appendChild(listItem);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    getCableoperadoresList();
});
const API_BASE = 'http://127.0.0.1:8000/api/'; 
let ACCESS_TOKEN = null;
let currentPage = { // 1. Variables para almacenar los enlaces
    next: null,
    previous: null
};

// ----------------------------------------------------
// 2. Función Principal (Modificada para recibir URL)
// ----------------------------------------------------
async function getCableoperadoresList(url = `${API_BASE}cableoperadores/list/`) {
    if (!localStorage.getItem('token')) { alert("Necesitas iniciar sesión."); return; }
    
    // Deshabilita los botones mientras carga
    updatePaginationControls(null, null, true); 

    const listMessage = document.getElementById('listMessage'); 
    document.getElementById('cableoperadoresListContainer').innerHTML = ''; 
    listMessage.textContent = 'Cargando...';

    try {
        const response = await fetch(url, { // Usa la URL pasada como argumento
            method: 'GET',
            headers: { 
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        
        if (response.ok) {
            const listaDeRegistros = data.results || data; 
            
            listMessage.className = 'message success';
            listMessage.textContent = `✅ Se cargaron ${listaDeRegistros.length} registros (Total: ${data.count || listaDeRegistros.length}).`;
            
            displayCableoperadores(listaDeRegistros); 
            
            // 3. ¡ACTUALIZAR LOS ENLACES Y LOS BOTONES!
            currentPage.next = data.next;
            currentPage.previous = data.previous;
            updatePaginationControls(data.next, data.previous);
            
        } else {
            listMessage.className = 'message error';
            listMessage.textContent = `❌ Error al listar: ${JSON.stringify(data)}`;
            updatePaginationControls(null, null);
        }
    } catch (error) {
        listMessage.className = 'message error';
        listMessage.textContent = `❌ Error de red: ${error.message}`;
        updatePaginationControls(null, null);
    }
}

// ----------------------------------------------------
// 4. Funciones de Navegación
// ----------------------------------------------------
function updatePaginationControls(nextUrl, prevUrl, isLoading = false) {
    const nextBtn = document.getElementById('nextPageBtn');
    const prevBtn = document.getElementById('prevPageBtn');

    if (isLoading) {
        nextBtn.disabled = true;
        prevBtn.disabled = true;
        return;
    }

    // Habilita si hay una URL, deshabilita si es null
    nextBtn.disabled = !nextUrl;
    prevBtn.disabled = !prevUrl;
}

function goToPage(url) {
    // Si la URL existe, llama a la función principal con la nueva URL
    if (url) {
        getCableoperadoresList(url);
    }
}


// Mantener la función de visualización sin cambios
function displayCableoperadores(data) {
    // ... (Tu código actual de displayCableoperadores) ...
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
    // 5. Llamada inicial (sin URL, usará el valor por defecto)
    getCableoperadoresList();
});
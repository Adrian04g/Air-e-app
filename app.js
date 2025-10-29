// app.js

const API_BASE = 'http://127.0.0.1:8000/api/'; // Base de tu API
let ACCESS_TOKEN = null;

// --- 1. FUNCIÓN DE AUTENTICACIÓN (LOGIN) ---
// (Asumiendo que esta función ya la tienes)
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
            loginMessage.className = 'message success';
            loginMessage.textContent = '✅ Sesión iniciada.';
            document.getElementById('create-section').style.display = 'block';
            document.getElementById('auth-section').style.display = 'none';
        } else {
            loginMessage.className = 'message error';
            loginMessage.textContent = `❌ Error: ${data.detail || 'Verifique credenciales.'}`;
        }
    } catch (error) {
        loginMessage.className = 'message error';
        loginMessage.textContent = `❌ Error de red: ${error.message}`;
    }
});

// --- 2. FUNCIÓN PARA CREAR CABLEOPERADOR (PROTEGIDO) ---
// (Asumiendo que esta función ya la tienes)
document.getElementById('createForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!ACCESS_TOKEN) return;
    
    const createMessage = document.getElementById('createMessage');
    const url = `${API_BASE}cableoperadores/book/`;
    
    // Simplificado solo para los campos del ejemplo
    const payload = {
        nombre: document.getElementById('nombre').value,
        telefono: document.getElementById('telefono').value,
        correo: document.getElementById('correo_op').value,
        observaciones: document.getElementById('observaciones').value,
        estado: "Contratado" // Valor por defecto
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${ACCESS_TOKEN}` 
            },
            body: JSON.stringify(payload),
        });
        const data = await response.json();
        if (response.ok) {
            createMessage.className = 'message success';
            createMessage.textContent = `✅ Cableoperador creado.`;
            document.getElementById('createForm').reset();
        } else {
            createMessage.className = 'message error';
            createMessage.textContent = `❌ Error al crear: ${JSON.stringify(data)}`;
        }
    } catch (error) {
        createMessage.className = 'message error';
        createMessage.textContent = `❌ Error de red: ${error.message}`;
    }
});

// --- 3. FUNCIÓN PARA LISTAR (GET) ---
// (Asumiendo que esta función ya la tienes)
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

async function getCableoperadoresList() {
    if (!ACCESS_TOKEN) { alert("Necesitas iniciar sesión."); return; }
    const url = `${API_BASE}cableoperadores/book/`; 
    const listMessage = document.getElementById('listMessage'); 
    document.getElementById('cableoperadoresListContainer').innerHTML = ''; 

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${ACCESS_TOKEN}` }
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

// 🛑 ESTA ES LA FUNCIÓN QUE TE FALTABA 🛑
// Renderiza el objeto individual en el DOM
function displayCableoperadorDetail(item) {
    const container = document.getElementById('cableoperadorDetailContainer');
    container.innerHTML = ''; // Limpia contenido previo

    if (!item || item.error) {
        container.innerHTML = '<p>No se encontraron datos o hubo un error.</p>';
        return;
    }
    
    // Formateamos el contenido
    container.innerHTML = `
        <h4>Detalle del ID: ${item.id}</h4>
        <p><strong>Nombre:</strong> ${item.nombre}</p>
        <p><strong>NIT:</strong> ${item.NIT || 'N/A'}</p>
        <p><strong>Contacto:</strong> ${item.correo || 'N/A'}</p>
        <p><strong>Teléfono:</strong> ${item.telefono || 'N/A'}</p>
        <p><strong>Estado:</strong> ${item.estado || 'N/A'}</p>
    `;
}


// --- 4. LÓGICA DE CONSULTA INDIVIDUAL (Tu código + la función que faltaba) ---

// app.js (Añade esta función)
function handleDetailSearch() {
    const cableoperadorId = document.getElementById('detailId').value;
    
    if (!cableoperadorId) {
        alert("Por favor, introduce un ID.");
        return;
    }
    
    // Llamar a la función del API
    getCableoperadorDetail(cableoperadorId);
}

// Tu función adaptada
async function getCableoperadorDetail(cableoperadorId) {
    if (!ACCESS_TOKEN) {
        alert("Necesitas iniciar sesión.");
        return;
    }

    // Asegúrate que la URL es correcta (la que definiste en urls.py)
    const url = `${API_BASE}cableoperadores/book/${cableoperadorId}/`; 
    const detailMessage = document.getElementById('detailMessage');
    
    document.getElementById('cableoperadorDetailContainer').innerHTML = ''; // Limpia antes

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: { 
                'Authorization': `Bearer ${ACCESS_TOKEN}`
            }
        });

        const data = await response.json();

        if (response.ok) {
            detailMessage.className = 'message success';
            detailMessage.textContent = `✅ Detalle del ID ${cableoperadorId} cargado.`;
            
            // LLAMADA CLAVE: Pasa el objeto individual a la función de visualización
            displayCableoperadorDetail(data); 
            
        } else {
            detailMessage.className = 'message error';
            detailMessage.textContent = `❌ Error al obtener detalle: ${JSON.stringify(data)}`;
            // Si hay un error, mostrar un mensaje vacío en el contenedor
            displayCableoperadorDetail(null); // Limpia la vista de detalle
        }
    } catch (error) {
        detailMessage.className = 'message error';
        detailMessage.textContent = `❌ Error de red: ${error.message}`;
    }
}
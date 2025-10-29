const API_BASE = 'http://127.0.0.1:8000/api/'; // Base de tu API
let ACCESS_TOKEN = null;

// --- 4. LÓGICA DE CONSULTA INDIVIDUAL ---

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
    if (!localStorage.getItem('token')) {
        alert("Necesitas iniciar sesión.");
        return;
    }

    const url = `${API_BASE}cableoperadores/book/${cableoperadorId}/`; 
    const detailMessage = document.getElementById('detailMessage');
    
    document.getElementById('cableoperadorDetailContainer').innerHTML = ''; // Limpia antes

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: { 
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });

        const data = await response.json();

        if (response.ok) {
            detailMessage.className = 'message success';
            detailMessage.textContent = `✅ Detalle del ID ${cableoperadorId} cargado.`;
            displayCableoperadorDetail(data); 
        } else {
            detailMessage.className = 'message error';
            detailMessage.textContent = `❌ Error al obtener detalle: ${JSON.stringify(data)}`;
            displayCableoperadorDetail(null); // Limpia la vista de detalle
        }
    } catch (error) {
        detailMessage.className = 'message error';
        detailMessage.textContent = `❌ Error de red: ${error.message}`;
    }
}

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
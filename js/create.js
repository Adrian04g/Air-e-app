const API_BASE = 'http://127.0.0.1:8000/api/'; // Base de tu API
let ACCESS_TOKEN = null;

// --- FUNCIÓN PARA CREAR CABLEOPERADOR (PROTEGIDO) ---
document.getElementById('createForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!localStorage.getItem('token')) return;

    const createMessage = document.getElementById('createMessage');
    const url = `${API_BASE}cableoperadores/list/`;

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
                'Authorization': `Bearer ${localStorage.getItem('token')}` 
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
// app.js

const API_BASE = 'http://127.0.0.1:8000/api/'; // Cambia si tu puerto de Django es diferente
let ACCESS_TOKEN = null;

// --- 1. FUNCIÓN DE AUTENTICACIÓN (LOGIN) ---
document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const loginMessage = document.getElementById('loginMessage');
    
    // El endpoint para obtener el token es 'api/token/' si usas Simple JWT
    const url = `${API_BASE}token/`; 

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();
        console.log('Respuesta del servidor:', data);

        if (response.ok) {
            ACCESS_TOKEN = data.access; // 🛑 Guardamos el token
            console.log('Token obtenido:', ACCESS_TOKEN);
            loginMessage.className = 'message success';
            loginMessage.textContent = '✅ Sesión iniciada. Token Obtenido.';
            
            // Mostrar la sección protegida
            document.getElementById('create-section').style.display = 'block';
            document.getElementById('auth-section').style.display = 'none';

        } else {
            loginMessage.className = 'message error';
            loginMessage.textContent = `❌ Error de Login: ${data.detail || 'Verifique credenciales.'}`;
        }
    } catch (error) {
        loginMessage.className = 'message error';
        loginMessage.textContent = `❌ Error de red: ${error.message}`;
    }
});


// --- 2. FUNCIÓN PARA CREAR CABLEOPERADOR (PROTEGIDO) ---
document.getElementById('createForm').addEventListener('submit', async (e) => {
    e.preventDefault();

     if (!ACCESS_TOKEN) {
         alert("Primero debe iniciar sesión.");
         return;
    }
    const id = document.getElementById('id').value;
    const nombre = document.getElementById('nombre').value;
    const nombre_largo = document.getElementById('nombre_largo').value;
    const NIT = document.getElementById('NIT').value;
    const Digito_verificacion = document.getElementById('Digito_verificacion').value;
    const RegistroTic = document.getElementById('RegistroTic').value;
    const CodigoInterno = document.getElementById('CodigoInterno').value;
    const pais = document.getElementById('pais').value;
    const ciudad = document.getElementById('ciudad').value;
    const direccion = document.getElementById('direccion').value;
    const Representante = document.getElementById('Representante').value;
    const telefono = document.getElementById('telefono').value;
    const correo = document.getElementById('correo_op').value;
    const observaciones = document.getElementById('observaciones').value;
    const vencimiento_factura = document.getElementById('vencimiento_factura').value;
    const preliquidacion_num = document.getElementById('preliquidacion_num').value;
    const preliquidacion_letra = document.getElementById('preliquidacion_letra').value;
    const respuesta_preliquidacion = document.getElementById('respuesta_preliquidacion').value;

    const createMessage = document.getElementById('createMessage');

    const url = `${API_BASE}cableoperadores/book/`; // El endpoint POST
    
    // Estructura de datos según tu Serializer, incluyendo los campos requeridos
    const payload = {
        
        nombre: nombre,
        nombre_largo: nombre_largo,
        telefono: telefono,
        correo: correo,
        // Proporciona valores por defecto para los campos requeridos en el Serializer
        NIT: NIT,
        Digito_verificacion: Digito_verificacion,
        RegistroTic: RegistroTic,
        CodigoInterno: CodigoInterno,
        pais: pais,
        ciudad: ciudad,
        direccion: direccion,
        Representante: Representante,
        telefono: telefono,
        correo: correo,
        observaciones: observaciones,
        vencimiento_factura: vencimiento_factura,
        preliquidacion_num: preliquidacion_num,
        preliquidacion_letra: preliquidacion_letra,
        respuesta_preliquidacion: respuesta_preliquidacion,
        // que no se rellenan en el formulario simple, para pasar la validación de DRF:
        estado: "Contratado", // O el valor por defecto que acepte tu ChoiceField
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                // 🛑 Incluir el token JWT en la cabecera Authorization
                'Authorization': `Bearer ${ACCESS_TOKEN}` 
            },
            body: JSON.stringify(payload),
        });

        const data = await response.json();

        if (response.ok) {
            createMessage.className = 'message success';
            createMessage.textContent = `✅ Cableoperador creado. ID: ${data.id || 'N/A'}`;
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
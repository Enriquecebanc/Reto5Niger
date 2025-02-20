const axios = require('axios');
const dotenv = require('dotenv');

// Cargar las variables de entorno desde el archivo .env
dotenv.config({ path: '../.env' });

// Token estático
const STATIC_TOKEN = process.env.STATIC_TOKEN;
console.log('STATIC_TOKEN:', STATIC_TOKEN); // Verificar que el token se haya cargado correctamente

// Función para generar un ID único de 8 dígitos
const generateId = () => {
    return Math.floor(Math.random() * 100000000);
};

// Función para crear un nuevo usuario
async function crearUsuario() {
    const nuevoUsuario = {
        id_usuario: generateId(), // Generar un ID aleatorio de 8 dígitos
        nombre_usuario: "Nombre de Prueba2",
        correo: "correo@prueba.com24",
        contraseña: "contraseña1234",
        foto_perfil: 2,
        respuesta_pregunta_1: "respuesta12",
        respuesta_pregunta_2: "respuesta22",
        respuesta_pregunta_3: "respuesta33"
    };

    try {
        const response = await axios.post('http://localhost:8000/usuarios', nuevoUsuario, {
            headers: {
                'Authorization': `Bearer ${STATIC_TOKEN}`,
            },
        });

        console.log('Usuario creado:', response.data);
    } catch (error) {
        console.error('Error al crear el usuario:', error.response ? error.response.data : error.message);
    }
}

// Llamar a la función para crear el usuario
crearUsuario();
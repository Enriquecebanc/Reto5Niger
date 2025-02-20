const axios = require('axios');
const dotenv = require('dotenv');

// Cargar las variables de entorno desde el archivo .env
dotenv.config({ path: '../.env' });

// Token estático
const STATIC_TOKEN = process.env.STATIC_TOKEN;
console.log('STATIC_TOKEN:', STATIC_TOKEN); // Verificar que el token se haya cargado correctamente

// Función para obtener todos los comentarios
async function verComentarios() {
    try {
        const response = await axios.get('http://localhost:8000/comentarios', {
            headers: {
                'Authorization': `Bearer ${STATIC_TOKEN}`,
            },
        });

        console.log('Comentarios obtenidos:', response.data);
    } catch (error) {
        console.error('Error al obtener los comentarios:', error.response ? error.response.data : error.message);
    }
}

// Llamar a la función para obtener los comentarios
verComentarios();
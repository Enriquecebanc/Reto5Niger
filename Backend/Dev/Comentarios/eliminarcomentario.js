const axios = require('axios');
const dotenv = require('dotenv');

// Cargar las variables de entorno desde el archivo .env
dotenv.config({ path: '../.env' });

// Token estático
const STATIC_TOKEN = process.env.STATIC_TOKEN;
console.log('STATIC_TOKEN:', STATIC_TOKEN); // Verificar que el token se haya cargado correctamente

// Función para eliminar un comentario por ID
async function borrarComentario(id_comentario) {
    try {
        const response = await axios.delete(`http://localhost:8000/comentarios/${id_comentario}`, {
            headers: {
                'Authorization': `Bearer ${STATIC_TOKEN}`,
            },
        });

        console.log('Comentario eliminado:', response.data);
    } catch (error) {
        console.error('Error al eliminar el comentario:', error.response ? error.response.data : error.message);
    }
}

// Llamar a la función para eliminar el comentario
const id_comentario = 1; // Reemplaza con el ID del comentario que deseas eliminar
borrarComentario(id_comentario);
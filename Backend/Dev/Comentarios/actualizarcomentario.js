const axios = require('axios');
const dotenv = require('dotenv');

// Cargar las variables de entorno desde el archivo .env
dotenv.config({ path: '../.env' });

// Token estático
const STATIC_TOKEN = process.env.STATIC_TOKEN;
console.log('STATIC_TOKEN:', STATIC_TOKEN); // Verificar que el token se haya cargado correctamente

// Función para actualizar un comentario por ID
async function actualizarComentario(id_comentario) {
    const comentarioActualizado = {
        id_comentario: id_comentario, // ID del comentario a actualizar
        id_usuario: 1, // Ejemplo de ID de usuario
        id_receta: 2, // Ejemplo de ID de receta
        texto: "Este es un comentario actualizado",
        valoracion: 4 // Ejemplo de valoración actualizada
    };

    try {
        const response = await axios.put(`http://localhost:8000/comentarios/${id_comentario}`, comentarioActualizado, {
            headers: {
                'Authorization': `Bearer ${STATIC_TOKEN}`,
            },
        });

        console.log('Comentario actualizado:', response.data);
    } catch (error) {
        console.error('Error al actualizar el comentario:', error.response ? error.response.data : error.message);
    }
}

// Llamar a la función para actualizar el comentario
const id_comentario = 1; // Reemplaza con el ID del comentario que deseas actualizar
actualizarComentario(id_comentario);
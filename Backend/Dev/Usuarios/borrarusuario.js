const axios = require('axios');
const dotenv = require('dotenv');

// Cargar las variables de entorno desde el archivo .env
dotenv.config({ path: '../.env' });

// Token estático
const STATIC_TOKEN = process.env.STATIC_TOKEN;
console.log('STATIC_TOKEN:', STATIC_TOKEN); // Verificar que el token se haya cargado correctamente

// Función para eliminar un usuario por ID
async function borrarUsuario(id_usuario) {
    try {
        const response = await axios.delete(`http://localhost:8000/usuarios/${id_usuario}`, {
            headers: {
                'Authorization': `Bearer ${STATIC_TOKEN}`,
            },
        });

        console.log('Usuario eliminado:', response.data);
    } catch (error) {
        console.error('Error al eliminar el usuario:', error.response ? error.response.data : error.message);
    }
}

// Llamar a la función para eliminar el usuario
const id_usuario = 1; // Reemplaza con el ID del usuario que deseas eliminar
borrarUsuario(id_usuario);
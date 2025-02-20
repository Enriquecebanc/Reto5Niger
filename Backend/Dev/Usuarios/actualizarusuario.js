const axios = require('axios');
const dotenv = require('dotenv');

// Cargar las variables de entorno desde el archivo .env
dotenv.config({ path: '../.env' });

// Token estático
const STATIC_TOKEN = process.env.STATIC_TOKEN;
console.log('STATIC_TOKEN:', STATIC_TOKEN); // Verificar que el token se haya cargado correctamente

// Función para actualizar un usuario por ID
async function actualizarUsuario(id_usuario) {
    const usuarioActualizado = {
        id_usuario: id_usuario,
        nombre_usuario: "Nombre Actualizado",
        correo: "correo_actualizado@prueba.com",
        contraseña: "contraseña_actualizada",
        foto_perfil: "2",
        respuesta_pregunta_1: "respuesta1_actualizada",
        respuesta_pregunta_2: "respuesta2_actualizada",
        respuesta_pregunta_3: "respuesta3_actualizada"
    };

    try {
        const response = await axios.put(`http://localhost:8000/usuarios/${id_usuario}`, usuarioActualizado, {
            headers: {
                'Authorization': `Bearer ${STATIC_TOKEN}`,
            },
        });

        console.log('Usuario actualizado:', response.data);
    } catch (error) {
        console.error('Error al actualizar el usuario:', error.response ? error.response.data : error.message);
    }
}

// Llamar a la función para actualizar el usuario
const id_usuario = 1; // Reemplaza con el ID del usuario que deseas actualizar
actualizarUsuario(id_usuario);
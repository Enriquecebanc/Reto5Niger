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
// Función para crear un nuevo comentario
async function crearComentario() {
    const nuevoComentario = {
        id_comentario: generateId(), // Generar un ID aleatorio de 8 dígitos
        id_usuario: 1, // Ejemplo de ID de usuario
        id_receta: 2, // Ejemplo de ID de receta
        texto: "Este es un comentario de prueba2",
        valoracion: 5 // Ejemplo de valoración
    };

    try {
        const response = await axios.post('http://localhost:8000/comentarios', nuevoComentario, {
            headers: {
                'Authorization': `Bearer ${STATIC_TOKEN}`,
            },
        });

        console.log('Comentario creado:', response.data);
    } catch (error) {
        console.error('Error al crear el comentario:', error.response ? error.response.data : error.message);
    }
}

// Llamar a la función para crear el comentario
crearComentario();
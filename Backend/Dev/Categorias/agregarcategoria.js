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

// Función para crear una nueva categoría
async function crearCategoria() {
    const nuevaCategoria = {
        id_categoria: generateId(), // Generar un ID aleatorio de 8 dígitos
        nombre_categoria: "Categoría de Prueba",
        descripcion: "Descripción de la categoría de prueba",
        imagen: "imagen.jpg" // Ejemplo de nombre de imagen
    };

    try {
        const response = await axios.post('http://localhost:8000/categorias', nuevaCategoria, {
            headers: {
                'Authorization': `Bearer ${STATIC_TOKEN}`,
            },
        });

        console.log('Categoría creada:', response.data);
    } catch (error) {
        console.error('Error al crear la categoría:', error.response ? error.response.data : error.message);
    }
}

// Llamar a la función para crear la categoría
crearCategoria();
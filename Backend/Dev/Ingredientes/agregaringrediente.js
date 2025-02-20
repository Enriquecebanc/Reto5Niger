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

// Función para crear un nuevo ingrediente
async function crearIngrediente() {
    const nuevoIngrediente = {
        id_ingrediente: generateId(), // Generar un ID aleatorio de 8 dígitos
        nombre_ingrediente: "Ingrediente de Prueba2",
        descripcion: "Descripción del ingrediente de prueba2",
        imagen: "imagen2.jpg" // Ejemplo de nombre de imagen
    };

    try {
        const response = await axios.post('http://localhost:8000/ingredientes', nuevoIngrediente, {
            headers: {
                'Authorization': `Bearer ${STATIC_TOKEN}`,
            },
        });

        console.log('Ingrediente creado:', response.data);
    } catch (error) {
        console.error('Error al crear el ingrediente:', error.response ? error.response.data : error.message);
    }
}

// Llamar a la función para crear el ingrediente
crearIngrediente();
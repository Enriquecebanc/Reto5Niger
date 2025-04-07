import React, { useState } from 'react'; // Importa React y el hook useState
import { Link, useLocation, useNavigate } from 'react-router-dom'; // Importa componentes de react-router-dom
import axios from 'axios'; // Importa axios para realizar peticiones HTTP
import './subirReceta.css'; // Importa los estilos CSS

// Componente funcional SubirReceta
const SubirReceta = () => {
  // Obtiene la ubicación actual y la función de navegación
  const location = useLocation();
  const navigate = useNavigate();

  // Estado para almacenar la información de la receta
  const [receta, setReceta] = useState({
    nombre_receta: '',
    descripcion_breve: '',
    instrucciones: '',
    imagen: '',
    tiempo: '',
    id_categoria: '',
    porciones: '',
  });

  // Estado para almacenar la lista de ingredientes
  const [ingredientes, setIngredientes] = useState([{ nombre: '', cantidad: '' }]);
  // Estado para almacenar la información de un nuevo ingrediente
  const [ingredienteNuevo, setIngredienteNuevo] = useState({ id_ingrediente: '', nombre: '', descripcion: '', imagen: '' });
  // Estado para controlar la visibilidad del formulario de nuevo ingrediente
  const [showIngredienteForm, setShowIngredienteForm] = useState(false);
  // Estado para almacenar el índice del ingrediente actual que se está verificando
  const [currentIngredienteIndex, setCurrentIngredienteIndex] = useState(null);

  // Función para actualizar el estado de la receta al cambiar un campo de entrada
  const handleChange = (e) => {
    const { name, value } = e.target; // Obtiene el nombre y el valor del campo de entrada
    setReceta({ ...receta, [name]: value }); // Actualiza el estado de la receta
  };

  // Función para actualizar el estado de un ingrediente al cambiar un campo de entrada
  const handleIngredientChange = (index, event) => {
    const newIngredientes = [...ingredientes]; // Crea una copia del array de ingredientes
    newIngredientes[index][event.target.name] = event.target.value; // Actualiza el valor del campo en el ingrediente correspondiente
    setIngredientes(newIngredientes); // Actualiza el estado de los ingredientes
  };

  // Función para añadir un nuevo ingrediente a la lista
  const handleAddIngredient = () => {
    setIngredientes([...ingredientes, { nombre: '', cantidad: '' }]); // Añade un nuevo ingrediente vacío al array
  };

  // Función para eliminar un ingrediente de la lista
  const handleRemoveIngredient = (index) => {
    const newIngredientes = [...ingredientes]; // Crea una copia del array de ingredientes
    newIngredientes.splice(index, 1); // Elimina el ingrediente en el índice especificado
    setIngredientes(newIngredientes); // Actualiza el estado de los ingredientes
  };

  // Función para actualizar el estado del nuevo ingrediente al cambiar un campo de entrada
  const handleIngredienteNuevoChange = (e) => {
    const { name, value } = e.target; // Obtiene el nombre y el valor del campo de entrada
    setIngredienteNuevo({ ...ingredienteNuevo, [name]: value }); // Actualiza el estado del nuevo ingrediente
  };

  // Función para generar un ID aleatorio
  const generateRandomId = () => {
    return Math.floor(10000000 + Math.random() * 90000000); // Genera un número aleatorio de 8 dígitos
  };

  // Función asíncrona para enviar el formulario de nuevo ingrediente
  const handleSubmitIngredienteNuevo = async (e) => {
    e.preventDefault(); // Evita la recarga de la página al enviar el formulario
    try {
      const newIngredienteId = generateRandomId(); // Genera un nuevo ID para el ingrediente
      const ingredienteData = {
        id_ingrediente: newIngredienteId,
        nombre_ingrediente: ingredienteNuevo.nombre,
        descripcion: ingredienteNuevo.descripcion,
        imagen: ingredienteNuevo.imagen
      }; // Crea un objeto con la información del ingrediente
      console.log('Nuevo ingrediente:', ingredienteData); // Muestra la información del nuevo ingrediente en la consola
      const response = await axios.post('http://localhost:8000/ingredientes', ingredienteData, {
        headers: {
          'Authorization': `Bearer Reto5Niger`, // Incluye el token de autorización en la cabecera
        },
      }); // Realiza una petición POST a la API para añadir el ingrediente
      const newIngrediente = response.data; // Obtiene la información del nuevo ingrediente
      const newIngredientes = [...ingredientes]; // Crea una copia del array de ingredientes
      newIngredientes[currentIngredienteIndex].id_ingrediente = newIngrediente.id_ingrediente; // Asigna el ID del nuevo ingrediente al ingrediente correspondiente
      setIngredientes(newIngredientes); // Actualiza el estado de los ingredientes
      setShowIngredienteForm(false); // Cierra el formulario de nuevo ingrediente
      setIngredienteNuevo({ id_ingrediente: '', nombre: '', descripcion: '', imagen: '' }); // Limpia el estado del nuevo ingrediente
      // Continuar con la verificación de los siguientes ingredientes o permitir añadir otro
      verifyIngredients(currentIngredienteIndex + 1);
    } catch (error) {
      console.error('Error al añadir el ingrediente:', error.response ? error.response.data : error.message);
    }
  };

  // Función asíncrona para verificar los ingredientes
  const verifyIngredients = async (startIndex = 0) => {
    try {
      let shouldContinue = true; // Variable para controlar si se debe continuar con la verificación
      for (let i = startIndex; i < ingredientes.length; i++) { // Itera sobre los ingredientes
        const ingrediente = ingredientes[i]; // Obtiene el ingrediente actual
        const response = await axios.get(`http://localhost:8000/ingredientes/nombre/${ingrediente.nombre}`, {
          headers: {
            'Authorization': `Bearer Reto5Niger`, // Incluye el token de autorización en la cabecera
          },
        }); // Realiza una petición GET a la API para buscar el ingrediente por nombre
        if (!response.data) { // Si el ingrediente no existe
          // Ingrediente no existe, mostrar formulario para añadirlo
          setCurrentIngredienteIndex(i); // Asigna el índice del ingrediente actual
          setIngredienteNuevo({ ...ingredienteNuevo, nombre: ingrediente.nombre }); // Asigna el nombre del ingrediente al estado del nuevo ingrediente
          setShowIngredienteForm(true); // Muestra el formulario de nuevo ingrediente
          shouldContinue = false;  // Detener el proceso hasta que se termine de agregar este ingrediente
          break; // Detiene la iteración
        } else { // Si el ingrediente existe
          // Ingrediente existe, guardar su ID
          ingredientes[i].id_ingrediente = response.data.id_ingrediente; // Asigna el ID del ingrediente existente al ingrediente correspondiente
        }
      }

      if (shouldContinue) { // Si todos los ingredientes han sido verificados
        // Todos los ingredientes han sido verificados, proceder a añadir la receta
        await addReceta(); // Llama a la función para añadir la receta
      }
    } catch (error) {
      console.error('Error al verificar los ingredientes:', error.response ? error.response.data : error.message);
    }
  };

  // Función asíncrona para añadir la receta
  const addReceta = async () => {
    try {
      const recetaResponse = await axios.post('http://localhost:8000/recetas', {
        id_receta: generateRandomId(), // Genera un nuevo ID para la receta
        id_usuario: location.state.id_usuario, // Obtiene el ID del usuario de la ubicación actual
        ...receta, // Añade la información de la receta
      }, {
        headers: {
          'Authorization': `Bearer Reto5Niger`, // Incluye el token de autorización en la cabecera
        },
      }); // Realiza una petición POST a la API para añadir la receta
      const newReceta = recetaResponse.data; // Obtiene la información de la nueva receta

      // Añadir cantidades
      for (const ingrediente of ingredientes) { // Itera sobre los ingredientes
        await axios.post('http://localhost:8000/cantidades', {
          id_receta: newReceta.id_receta, // Asigna el ID de la nueva receta
          id_ingrediente: ingrediente.id_ingrediente, // Asigna el ID del ingrediente
          cantidad_ingrediente: ingrediente.cantidad, // Asigna la cantidad del ingrediente
        }, {
          headers: {
            'Authorization': `Bearer Reto5Niger`, // Incluye el token de autorización en la cabecera
          },
        }); // Realiza una petición POST a la API para añadir la cantidad del ingrediente
      }

      // Después de completar la receta y los ingredientes, redirigir al inicio
      navigate('/', { state: { id_usuario: location.state.id_usuario } }); // Redirige a la página de inicio
    } catch (error) {
      console.error('Error al subir la receta:', error.response ? error.response.data : error.message);
    }
  };

  // Función para enviar el formulario
  const handleSubmit = (e) => {
    e.preventDefault(); // Evita la recarga de la página al enviar el formulario
    verifyIngredients(); // Llama a la función para verificar los ingredientes
  };

  // Renderiza el componente
  return (
    <div className="subir-receta-container">
      <h1>Subir Nueva Receta</h1>
      <form onSubmit={handleSubmit} className="subir-receta-form">
        {/* Campos del formulario */}
        <div className="form-group">
          <label htmlFor="nombre_receta">Nombre de la Receta:</label>
          <input
            type="text"
            id="nombre_receta"
            name="nombre_receta"
            value={receta.nombre_receta}
            onChange={handleChange}
            placeholder="Nombre de la receta"
            required // El campo es obligatorio
          />
        </div>
        <div className="form-group">
          <label htmlFor="instrucciones">Instrucciones:</label>
          <textarea
            id="instrucciones"
            name="instrucciones"
            value={receta.instrucciones}
            onChange={handleChange}
            placeholder="Instrucciones"
            required // El campo es obligatorio
          />
        </div>
        <div className="form-group">
          <label htmlFor="tiempo">Tiempo (minutos):</label>
          <input
            type="number"
            id="tiempo"
            name="tiempo"
            value={receta.tiempo}
            onChange={handleChange}
            placeholder="Tiempo en minutos"
            required // El campo es obligatorio
            min="1" // El valor mínimo es 1
          />
        </div>

        <div className="form-group">
          <label htmlFor="porciones">Porciones:</label>
          <input
            type="number"
            id="porciones"
            name="porciones"
            value={receta.porciones}
            onChange={handleChange}
            placeholder="Número de porciones"
            required // El campo es obligatorio
            min="1" // El valor mínimo es 1
          />
        </div>
        <div className="form-group">
          <label htmlFor="imagen">Imagen (URL):</label>
          <input
            type="text"
            id="imagen"
            name="imagen"
            value={receta.imagen}
            onChange={handleChange}
            placeholder="URL de la imagen"
            required // El campo es obligatorio
          />
        </div>
        <div className="form-group">
          <label htmlFor="ingredientes">Ingredientes:</label>
          {/* Muestra la lista de ingredientes */}
          {ingredientes.map((ingrediente, index) => (
            <div key={index} className="ingredient-input">
              <input
                type="text"
                name="nombre"
                value={ingrediente.nombre}
                onChange={(e) => handleIngredientChange(index, e)}
                placeholder="Nombre del ingrediente"
                required // El campo es obligatorio
              />
              <input
                type="text"
                name="cantidad"
                value={ingrediente.cantidad}
                onChange={(e) => handleIngredientChange(index, e)}
                placeholder="Cantidad (Kg, L, etc.)"
                required // El campo es obligatorio
              />
              {/* Botón para eliminar un ingrediente */}
              <button type="button" className="borrar" onClick={() => handleRemoveIngredient(index)}>Eliminar</button>
            </div>
          ))}
          {/* Botón para añadir un nuevo ingrediente */}
          <button type="button" onClick={handleAddIngredient}>Añadir Ingrediente</button>
        </div>
        <div className="form-group">
          <label htmlFor="id_categoria">Categoría:</label>
          <select
            id="id_categoria"
            name="id_categoria"
            value={receta.id_categoria}
            onChange={handleChange}
            required // El campo es obligatorio
          >
            <option value="">Selecciona una categoría</option>
            <option value="1">Entrante</option>
            <option value="2">Plato Principal</option>
            <option value="3">Plato Secundario</option>
            <option value="4">Postre</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="descripcion_breve">Descripción:</label>
          <textarea
            id="descripcion_breve"
            name="descripcion_breve"
            value={receta.descripcion_breve}
            onChange={handleChange}
            placeholder="Descripción breve"
            required // El campo es obligatorio
          />
        </div>
        {/* Botón para enviar el formulario */}
        <button type="submit" className="submit-button">Subir Receta</button>
      </form>
      {/* Enlace para volver a la página de inicio */}
      <Link to="/" state={{ id_usuario: location.state.id_usuario }}>
        <button className="back-button">Volver a Inicio</button>
      </Link>

      {/* Formulario para añadir un nuevo ingrediente */}
      {showIngredienteForm && (
        <div className="ingrediente-form-popup">
          {/* Overlay para cerrar el formulario */}
          <div className="ingrediente-form-overlay" onClick={() => setShowIngredienteForm(false)}></div>
          <div className="ingrediente-form-content">
            <h2>Añadir Ingrediente</h2>
            <form onSubmit={handleSubmitIngredienteNuevo}>
              {/* Campos del formulario */}
              <div className="form-group">
                <label htmlFor="nombre">Nombre del Ingrediente:</label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={ingredienteNuevo.nombre}
                  onChange={handleIngredienteNuevoChange}
                  placeholder="Nombre del ingrediente"
                  required // El campo es obligatorio
                  readOnly // El campo es de solo lectura
                />
              </div>
              <div className="form-group">
                <label htmlFor="descripcion">Descripción:</label>
                <textarea
                  id="descripcion"
                  name="descripcion"
                  value={ingredienteNuevo.descripcion}
                  onChange={handleIngredienteNuevoChange}
                  placeholder="Descripción del ingrediente"
                  required // El campo es obligatorio
                />
              </div>
              <div className="form-group">
                <label htmlFor="imagen">Imagen (URL):</label>
                <input
                  type="text"
                  id="imagen"
                  name="imagen"
                  value={ingredienteNuevo.imagen}
                  onChange={handleIngredienteNuevoChange}
                  placeholder="URL de la imagen"
                  required // El campo es obligatorio
                />
              </div>
              {/* Botón para añadir el ingrediente */}
              <button type="submit" className="submit-button">Añadir Ingrediente</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubirReceta; // Exporta el componente
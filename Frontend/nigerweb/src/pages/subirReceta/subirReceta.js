import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './subirReceta.css';

const SubirReceta = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [receta, setReceta] = useState({
    nombre_receta: '',
    descripcion_breve: '',
    instrucciones: '',
    imagen: '',
    tiempo: '',
    id_categoria: '',
    porciones: '',
  });

  const [ingredientes, setIngredientes] = useState([{ nombre: '', cantidad: '' }]);
  const [ingredienteNuevo, setIngredienteNuevo] = useState({ id_ingrediente: '', nombre: '', descripcion: '', imagen: '' });
  const [showIngredienteForm, setShowIngredienteForm] = useState(false);
  const [currentIngredienteIndex, setCurrentIngredienteIndex] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReceta({ ...receta, [name]: value });
  };

  const handleIngredientChange = (index, event) => {
    const newIngredientes = [...ingredientes];
    newIngredientes[index][event.target.name] = event.target.value;
    setIngredientes(newIngredientes);
  };

  const handleAddIngredient = () => {
    setIngredientes([...ingredientes, { nombre: '', cantidad: '' }]);
  };

  const handleRemoveIngredient = (index) => {
    const newIngredientes = [...ingredientes];
    newIngredientes.splice(index, 1);
    setIngredientes(newIngredientes);
  };

  const handleIngredienteNuevoChange = (e) => {
    const { name, value } = e.target;
    setIngredienteNuevo({ ...ingredienteNuevo, [name]: value });
  };

  const generateRandomId = () => {
    return Math.floor(10000000 + Math.random() * 90000000);
  };

  const handleSubmitIngredienteNuevo = async (e) => {
    e.preventDefault();
    try {
      const newIngredienteId = generateRandomId();
      const ingredienteData = {
        id_ingrediente: newIngredienteId,
        nombre_ingrediente: ingredienteNuevo.nombre,
        descripcion: ingredienteNuevo.descripcion,
        imagen: ingredienteNuevo.imagen
      };
      const response = await axios.post('http://localhost:8000/ingredientes', ingredienteData, {
        headers: {
          'Authorization': `Bearer Reto5Niger`,
        },
      });
      const newIngrediente = response.data;
      const newIngredientes = [...ingredientes];
      newIngredientes[currentIngredienteIndex].id_ingrediente = newIngrediente.id_ingrediente;
      setIngredientes(newIngredientes);
      setShowIngredienteForm(false);
      setIngredienteNuevo({ id_ingrediente: '', nombre: '', descripcion: '', imagen: '' });
      // Continuar con la verificación de los siguientes ingredientes
      verifyIngredients(currentIngredienteIndex + 1);
    } catch (error) {
      console.error('Error al añadir el ingrediente:', error.response ? error.response.data : error.message);
    }
  };

  const verifyIngredients = async (startIndex = 0) => {
    try {
      for (let i = startIndex; i < ingredientes.length; i++) {
        const ingrediente = ingredientes[i];
        const response = await axios.get(`http://localhost:8000/ingredientes/nombre/${ingrediente.nombre}`, {
          headers: {
            'Authorization': `Bearer Reto5Niger`,
          },
        });
        if (!response.data) {
          // Ingrediente no existe, mostrar formulario para añadirlo
          setCurrentIngredienteIndex(i);
          setIngredienteNuevo({ ...ingredienteNuevo, nombre: ingrediente.nombre });
          setShowIngredienteForm(true);
          return;
        } else {
          // Ingrediente existe, guardar su ID
          ingredientes[i].id_ingrediente = response.data.id_ingrediente;
        }
      }

      // Todos los ingredientes verificados, proceder a añadir la receta
      await addReceta();
    } catch (error) {
      console.error('Error al verificar los ingredientes:', error.response ? error.response.data : error.message);
    }
  };

  const addReceta = async () => {
    try {
      const recetaResponse = await axios.post('http://localhost:8000/recetas', {
        id_receta: generateRandomId(),
        id_usuario: location.state.id_usuario,
        ...receta,
      }, {
        headers: {
          'Authorization': `Bearer Reto5Niger`,
        },
      });
      const newReceta = recetaResponse.data;

      // Añadir cantidades
      for (const ingrediente of ingredientes) {
        await axios.post('http://localhost:8000/cantidades', {
          id_receta: newReceta.id_receta,
          id_ingrediente: ingrediente.id_ingrediente,
          cantidad_ingrediente: ingrediente.cantidad,
        }, {
          headers: {
            'Authorization': `Bearer Reto5Niger`,
          },
        });
      }

      navigate('/');
    } catch (error) {
      console.error('Error al subir la receta:', error.response ? error.response.data : error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    verifyIngredients();
  };

  return (
    <div className="subir-receta-container">
      <h1>Subir Nueva Receta</h1>
      <form onSubmit={handleSubmit} className="subir-receta-form">
        <div className="form-group">
          <label htmlFor="nombre_receta">Nombre de la Receta:</label>
          <input
            type="text"
            id="nombre_receta"
            name="nombre_receta"
            value={receta.nombre_receta}
            onChange={handleChange}
            placeholder="Nombre de la receta"
            required
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
            required
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
            required
            min="1"
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
            required
            min="1"
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
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="ingredientes">Ingredientes:</label>
          {ingredientes.map((ingrediente, index) => (
            <div key={index} className="ingredient-input">
              <input
                type="text"
                name="nombre"
                value={ingrediente.nombre}
                onChange={(e) => handleIngredientChange(index, e)}
                placeholder="Nombre del ingrediente"
                required
              />
              <input
                type="text"
                name="cantidad"
                value={ingrediente.cantidad}
                onChange={(e) => handleIngredientChange(index, e)}
                placeholder="Cantidad"
                required
              />
              <button type="button" className="borrar" onClick={() => handleRemoveIngredient(index)}>Eliminar</button>
            </div>
          ))}
          <button type="button" onClick={handleAddIngredient}>Añadir Ingrediente</button>
        </div>
        <div className="form-group">
          <label htmlFor="id_categoria">Categoría:</label>
          <select
            id="id_categoria"
            name="id_categoria"
            value={receta.id_categoria}
            onChange={handleChange}
            required
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
            required
          />
        </div>
        <button type="submit" className="submit-button">Subir Receta</button>
      </form>
      <Link to="/" state={{ id_usuario: location.state.id_usuario }}>
        <button className="back-button">Volver a Inicio</button>
      </Link>

      {showIngredienteForm && (
        <div className="ingrediente-form-popup">
          <div className="ingrediente-form-overlay" onClick={() => setShowIngredienteForm(false)}></div>
          <div className="ingrediente-form-content">
            <h2>Añadir Ingrediente</h2>
            <form onSubmit={handleSubmitIngredienteNuevo}>
              <div className="form-group">
                <label htmlFor="nombre">Nombre del Ingrediente:</label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={ingredienteNuevo.nombre}
                  onChange={handleIngredienteNuevoChange}
                  placeholder="Nombre del ingrediente"
                  required
                  readOnly
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
                  required
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
                  required
                />
              </div>
              <button type="submit" className="submit-button">Añadir Ingrediente</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubirReceta;
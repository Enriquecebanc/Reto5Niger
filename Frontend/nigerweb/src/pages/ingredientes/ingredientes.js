import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import './ingredientes.css';


const Ingredientes = () => {
  const [idUsuario, setIdUsuario] = useState(null);
  const [ingredientes, setIngredientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const [showAlergenoForm, setShowAlergenoForm] = useState(false);
  const [currentIngrediente, setCurrentIngrediente] = useState(null);
  const [nuevoAlergeno, setNuevoAlergeno] = useState({ nombre_alergeno: '', descripcion: '' });


  const location = useLocation();


  // Obtener el id_usuario desde la ubicación
  useEffect(() => {
    if (location.state && location.state.id_usuario) {
      setIdUsuario(location.state.id_usuario);
    }
  }, [location]);


  // Obtener la lista de ingredientes desde la API
  useEffect(() => {
    axios.get('http://localhost:8000/ingredientes', {
      headers: {
        'Authorization': 'Bearer Reto5Niger',
      },
    })
      .then((response) => {
        setIngredientes(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError('No se pudieron cargar los ingredientes');
        setLoading(false);
      });
  }, []);


  // Manejar cambios en los campos del formulario de alérgenos
  const handleAlergenoChange = (e) => {
    const { name, value } = e.target;
    setNuevoAlergeno({ ...nuevoAlergeno, [name]: value });
  };


  // Añadir un nuevo alérgeno a un ingrediente
  const handleAddAlergeno = async (e) => {
    e.preventDefault();
    try {
      // Enviar el nuevo alérgeno a la API
      const idAlergenoGenerado = Math.floor(100000 + Math.random() * 900000); // Genera un número aleatorio de 6 dígitos


      // Enviar el nuevo alérgeno a la API
      const response = await axios.post(`http://localhost:8000/alergenos`, {
        id_alergeno: idAlergenoGenerado, // Generamos y enviamos el id_alergeno
        id_ingrediente: currentIngrediente.id_ingrediente, // Enviamos el id del ingrediente
        nombre_alergeno: nuevoAlergeno.nombre_alergeno, // Nombre del alérgeno
        descripcion: nuevoAlergeno.descripcion, // Descripción del alérgeno
      }, {
        headers: {
          'Authorization': 'Bearer Reto5Niger',
        },
      });


      // Actualizar la lista de alérgenos en el frontend
      const updatedIngredientes = ingredientes.map((ingrediente) => {
        if (ingrediente.id_ingrediente === currentIngrediente.id_ingrediente) {
          return {
            ...ingrediente,
            alergenos: [...(ingrediente.alergenos || []), response.data],
          };
        }
        return ingrediente;
      });


      setIngredientes(updatedIngredientes);
      setShowAlergenoForm(false);
      setNuevoAlergeno({ nombre_alergeno: '', descripcion: '' });
    } catch (error) {
      console.error('Error al añadir el alérgeno:', error.response ? error.response.data : error.message);
    }
  };


  if (loading) {
    return <p>Cargando...</p>;
  }


  if (error) {
    return <p>{error}</p>;
  }


  return (
    <div className="ingredientes-container">
      <h1>Ingredientes</h1>
      <p>Aquí encontrarás los diferentes ingredientes que se usan para las recetas</p>


      {idUsuario && <p>Usuario ID: {idUsuario}</p>}


      {ingredientes.length > 0 ? (
        ingredientes.map((ingrediente, index) => (
          <div key={index} className="categoria">
            <div>
              <h2>{ingrediente.nombre_ingrediente}</h2>
              <p>{ingrediente.descripcion}</p>
            </div>
            {ingrediente.imagen && <img src={ingrediente.imagen} alt={ingrediente.nombre_ingrediente} />}


            {ingrediente.alergenos && ingrediente.alergenos.length > 0 && (
              <div className="alergenos">
                <h3>Alérgenos:</h3>
                <ul>
                  {ingrediente.alergenos.map((alergeno, alergenoIndex) => (
                    <li key={alergenoIndex}>
                      <strong>{alergeno.nombre_alergeno}:</strong> {alergeno.descripcion}
                    </li>
                  ))}
                </ul>
              </div>
            )}


            {/* Botón para añadir un alérgeno */}
            <button
              className="add-alergeno-button"
              onClick={() => {
                setCurrentIngrediente(ingrediente);
                setShowAlergenoForm(true);
              }}
            >
              Añadir Alérgeno
            </button>
          </div>
        ))
      ) : (
        <p>No se encontraron ingredientes.</p>
      )}


      {/* Formulario emergente para añadir alérgenos */}
      {showAlergenoForm && (
        <div className="alergeno-form-popup">
          <div className="alergeno-form-overlay" onClick={() => setShowAlergenoForm(false)}></div>
          <div className="alergeno-form-content">
            <h2>Añadir Alérgeno a {currentIngrediente.nombre_ingrediente}</h2>
            <form onSubmit={handleAddAlergeno}>
              <div className="form-group">
                <label htmlFor="nombre_alergeno">Nombre del Alérgeno:</label>
                <input
                  type="text"
                  id="nombre_alergeno"
                  name="nombre_alergeno"
                  value={nuevoAlergeno.nombre_alergeno}
                  onChange={handleAlergenoChange}
                  placeholder="Nombre del alérgeno"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="descripcion">Descripción:</label>
                <textarea
                  id="descripcion"
                  name="descripcion"
                  value={nuevoAlergeno.descripcion}
                  onChange={handleAlergenoChange}
                  placeholder="Descripción del alérgeno"
                  required
                />
              </div>
              <button type="submit" className="submit-button">Añadir Alérgeno</button>
            </form>
          </div>
        </div>
      )}


      <Link to="/" state={{ id_usuario: idUsuario }}>
        <button className="back-button">Volver a Inicio</button>
      </Link>
    </div>
  );
};


export default Ingredientes;
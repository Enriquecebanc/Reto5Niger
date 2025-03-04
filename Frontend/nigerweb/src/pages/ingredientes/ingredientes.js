import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import './ingredientes.css';

const Ingredientes = () => {
  // Estado para almacenar los ingredientes
  const [idUsuario, setIdUsuario] = useState(null);
  const [ingredientes, setIngredientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const location = useLocation();

  // Obtener el id_usuario desde la ubicación
  useEffect(() => {
    if (location.state && location.state.id_usuario) {
      setIdUsuario(location.state.id_usuario);
    }
  }, [location]);

  // Efecto para obtener los ingredientes
  useEffect(() => {
    // Realizar la solicitud GET a la API
    axios.get('http://localhost:8000/ingredientes', {
      headers: {
        'Authorization': 'Bearer Reto5Niger'
      }
    })
    .then(response => {
      // Actualizar el estado con los ingredientes obtenidos
      setIngredientes(response.data);
      setLoading(false);
    })
    .catch(err => {
      // Manejar cualquier error
      setError('No se pudieron cargar los ingredientes');
      setLoading(false);
    });
  }, []); // Este efecto solo se ejecuta una vez al montarse el componente

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

      {/* Mostrar el id_usuario */}
      {idUsuario && <p>Usuario ID: {idUsuario}</p>}

      {/* Mostrar ingredientes si existen */}
      {ingredientes.length > 0 ? (
        ingredientes.map((ingrediente, index) => (
          <div key={index} className="categoria">
            <div>
              <h2>{ingrediente.nombre_ingrediente}</h2>
              <p>{ingrediente.descripcion}</p>
            </div>
            {ingrediente.imagen && <img src={ingrediente.imagen} alt={ingrediente.nombre_ingrediente} />}
          </div>
        ))
      ) : (
        <p>No se encontraron ingredientes.</p>
      )}

      {/* Volver a inicio y pasar el id_usuario */}
      <Link to="/" state={{ id_usuario: idUsuario }}>
        <button className="back-button">Volver a Inicio</button>
      </Link>
    </div>
  );
};

export default Ingredientes;
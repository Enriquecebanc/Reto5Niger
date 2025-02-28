import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './ingredientes.css';

const Ingredientes = () => {
  // Estado para almacenar los ingredientes
  const [ingredientes, setIngredientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
      console.log(response.data);
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

      <Link to="/">
        <button className="back-button">Volver a Inicio</button>
      </Link>
    </div>
  );
};

export default Ingredientes;

import React from 'react';
import { Link } from 'react-router-dom';
import './contraseña-olvidada.css';

const Ingredientes = () => {
  return (
    <div className="contraseña-olvidada-container">
      <h1>Si</h1>
      <p>No.</p>
      <Link to="/">
        <button className="back-button">Volver a Inicio</button>
      </Link>
    </div>
  );
};

export default Ingredientes;
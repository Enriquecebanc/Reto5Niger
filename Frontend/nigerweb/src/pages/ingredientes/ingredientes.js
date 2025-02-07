import React from 'react';
import { Link } from 'react-router-dom';
import './ingredientes.css';

const Ingredientes = () => {
  return (
    <div className="ingredientes-container">
      <h1>Ingredientes</h1>
      <p>Aquí encontrarás información sobre los ingredientes.</p>
      <Link to="/">
        <button className="back-button">Volver a Inicio</button>
      </Link>
    </div>
  );
};

export default Ingredientes;
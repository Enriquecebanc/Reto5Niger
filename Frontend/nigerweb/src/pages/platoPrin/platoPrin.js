import React from 'react';
import { Link } from 'react-router-dom';
import './platoPrin.css';

const PlatoPrin = () => {
  return (
    <div className="platoPrin-container">
      <h1>Platos Principales</h1>
      <p>Aquí encontrarás recetas sustanciosas y completas que suelen ser el eje central de la comida.</p>
      <Link to="/">
        <button className="back-button">Volver a Inicio</button>
      </Link>
    </div>
  );
};

export default PlatoPrin;
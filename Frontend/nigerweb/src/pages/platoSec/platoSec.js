import React from 'react';
import { Link } from 'react-router-dom';
import './platoSec.css';

const PlatoSec = () => {
  return (
    <div className="platoSec-container">
      <h1>Segundo Plato</h1>
      <p>Aquí encontrarás opciones que complementan el plato principal, como pastas, arroces o preparaciones con verduras.</p>
      <Link to="/">
        <button className="back-button">Volver a Inicio</button>
      </Link>
    </div>
  );
};

export default PlatoSec;
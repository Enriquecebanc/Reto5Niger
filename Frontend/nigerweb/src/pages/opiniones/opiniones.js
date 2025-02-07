import React from 'react';
import { Link } from 'react-router-dom';
import './opiniones.css';

const Opiniones = () => {
  return (
    <div className="opiniones-container">
      <h1>Opiniones</h1>
      <p>Aquí podras dar tu opinion sobre las recetas.</p>
      <Link to="/">
        <button className="back-button">Volver a Inicio</button>
      </Link>
    </div>
  );
};

export default opiniones;
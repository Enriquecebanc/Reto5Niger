import React from 'react';
import { Link } from 'react-router-dom';
import './recetas.css';

const Recetas = () => {
  return (
    <div className="recetas-container">
      <h1>Recetas</h1>
      <p>Aquí encontrarás una variedad de recetas.</p>
      <Link to="/">
        <button className="back-button">Volver a Inicio</button>
      </Link>
    </div>
  );
};

export default Recetas;
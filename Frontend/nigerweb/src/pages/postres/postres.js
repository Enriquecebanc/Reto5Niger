import React from 'react';
import { Link } from 'react-router-dom';
import './postres.css';

const Postres = () => {
  return (
    <div className="postres-container">
      <h1>Postres</h1>
      <p>Aquí encontrarás deliciosas recetas de postres.</p>
      <Link to="/">
        <button className="back-button">Volver a Inicio</button>
      </Link>
    </div>
  );
};

export default Postres;
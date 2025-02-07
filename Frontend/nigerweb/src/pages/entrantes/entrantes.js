import React from 'react';
import { Link } from 'react-router-dom';
import './entrantes.css';
import CroquetasImage from '../../images/Croquetas.jpg'; // Asegúrate de que la ruta sea correcta

const Entrantes = () => {
  return (
    <div className="entrantes-container">
      <h1>Entrantes</h1>
      <p>Aquí encontrarás platos ligeros y apetitosos para comenzar la comida, como ensaladas, sopas o aperitivos.</p>
      <Link to="/">
            <button className="back-button">Volver a Inicio</button>
          </Link>
    </div>
    
  );
};

export default Entrantes; 
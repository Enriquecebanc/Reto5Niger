import React from 'react';
import './entrantes.css';
import CroquetasImage from '../../images/Croquetas.jpg'; // Asegúrate de que la ruta sea correcta

const Entrantes = () => {
  return (
    <div className="entrantes-container">
      <h1>Entrantes</h1>
      <p>Aquí encontrarás platos ligeros y apetitosos para comenzar la comida, como ensaladas, sopas o aperitivos.</p>
      <img src={CroquetasImage} alt="Croquetas" className="croquetas-image" />
    </div>
  );
};

export default Entrantes; 
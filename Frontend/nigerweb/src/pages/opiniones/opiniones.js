import React from 'react';
import { Link } from 'react-router-dom';
import './opiniones.css';

const opiniones = [
  { usuario: 'Juan', comentario: 'Placeholder.' },
  { usuario: 'María', comentario: 'Placeholder.' },
  { usuario: 'Carlos', comentario: 'Placeholder.' },
  { usuario: 'Ana', comentario: 'Placeholder.' }
];

const Opiniones = () => {
  return (
    <div className="opiniones-container">
      <h1>Opiniones</h1>
      <p>Aquí podrás dar tu opinión sobre las recetas.</p>
      {opiniones.map((opinion, index) => (
        <div key={index} className="opinion">
          <h2>{opinion.usuario}</h2>
          <p>{opinion.comentario}</p>
        </div>
      ))}
      <Link to="/">
        <button className="back-button">Volver a Inicio</button>
      </Link>
    </div>
  );
};

export default Opiniones;
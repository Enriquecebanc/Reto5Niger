import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './subirReceta.css';

const SubirReceta = () => {
  const [receta, setReceta] = useState({
    nombre: '',
    instrucciones: '',
    tiempo: '',
    porciones: '',
    imagen: '',
    ingredientes: '',
    categoria: '',
    comentarios: '',
    descripcion: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReceta({ ...receta, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí se puede agregar la lógica para enviar la receta al servidor
    console.log('Receta enviada:', receta);
  };

  return (
    <div className="subir-receta-container">
      <h1>Subir Nueva Receta</h1>
      <form onSubmit={handleSubmit} className="subir-receta-form">
        <div className="form-group">
          <label htmlFor="nombre">Nombre de la Receta:</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={receta.nombre}
            onChange={handleChange}
            placeholder="Nombre de la receta"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="instrucciones">Instrucciones:</label>
          <textarea
            id="instrucciones"
            name="instrucciones"
            value={receta.instrucciones}
            onChange={handleChange}
            placeholder="Instrucciones"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="tiempo">Tiempo (minutos):</label>
          <input
            type="number"
            id="tiempo"
            name="tiempo"
            value={receta.tiempo}
            onChange={handleChange}
            placeholder="Tiempo en minutos"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="porciones">Porciones:</label>
          <input
            type="number"
            id="porciones"
            name="porciones"
            value={receta.porciones}
            onChange={handleChange}
            placeholder="Número de porciones"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="imagen">Imagen (URL):</label>
          <input
            type="text"
            id="imagen"
            name="imagen"
            value={receta.imagen}
            onChange={handleChange}
            placeholder="URL de la imagen"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="ingredientes">Ingredientes:</label>
          <textarea
            id="ingredientes"
            name="ingredientes"
            value={receta.ingredientes}
            onChange={handleChange}
            placeholder="Lista de ingredientes"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="categoria">Categoría:</label>
          <input
            type="text"
            id="categoria"
            name="categoria"
            value={receta.categoria}
            onChange={handleChange}
            placeholder="Categoría de la receta"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="comentarios">Comentarios:</label>
          <textarea
            id="comentarios"
            name="comentarios"
            value={receta.comentarios}
            onChange={handleChange}
            placeholder="Comentarios"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="descripcion">Descripción:</label>
          <textarea
            id="descripcion"
            name="descripcion"
            value={receta.descripcion}
            onChange={handleChange}
            placeholder="Descripción breve"
            required
          />
        </div>
        <button type="submit" className="submit-button">Subir Receta</button>
      </form>
      <Link to="/">
        <button className="back-button">Volver a Inicio</button>
      </Link>
    </div>
  );
};

export default SubirReceta;
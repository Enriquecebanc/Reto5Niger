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
    categoria: '',
    comentarios: '',
    descripcion: ''
  });

  const [ingredientes, setIngredientes] = useState([{ nombre: '' }]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReceta({ ...receta, [name]: value });
  };

  const handleIngredientChange = (index, event) => {
    const newIngredientes = [...ingredientes];
    newIngredientes[index][event.target.name] = event.target.value;
    setIngredientes(newIngredientes);
  };

  const handleAddIngredient = () => {
    setIngredientes([...ingredientes, { nombre: '' }]);
  };

  const handleRemoveIngredient = (index) => {
    const newIngredientes = [...ingredientes];
    newIngredientes.splice(index, 1);
    setIngredientes(newIngredientes);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí se puede agregar la lógica para enviar la receta al servidor
    console.log('Receta enviada:', receta);
    console.log('Ingredientes:', ingredientes);
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
            min="1"
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
          {ingredientes.map((ingrediente, index) => (
            <div key={index} className="ingredient-input">
              <input
                type="text"
                name="nombre"
                value={ingrediente.nombre}
                onChange={(e) => handleIngredientChange(index, e)}
                placeholder="Nombre del ingrediente"
                required
              />
               <input
                type="text"
                name="cantidad"
                value={ingrediente.cantidad}
                onChange={(e) => handleIngredientChange(index, e)}
                placeholder="Cantidad"
                required
              />
              <button type="button" className="borrar" onClick={() => handleRemoveIngredient(index)}>Eliminar</button>
            </div>
          ))}
          <button type="button" onClick={handleAddIngredient}>Añadir Ingrediente</button>
        </div>
        <div className="form-group">
          <label htmlFor="categoria">Categoría:</label>
          <select
            id="categoria"
            name="categoria"
            value={receta.categoria}
            onChange={handleChange}
            required
          >
            <option value="">Selecciona una categoría</option>
            <option value="Entrante">Entrante</option>
            <option value="Plato Principal">Plato Principal</option>
            <option value="Plato Secundario">Plato Secundario</option>
            <option value="Postre">Postre</option>
          </select>
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
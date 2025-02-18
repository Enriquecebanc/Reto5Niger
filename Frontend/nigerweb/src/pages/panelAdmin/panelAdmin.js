import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './panelAdmin.css';

// Función para generar un ID único de 8 dígitos
const generateId = () => {
  return Math.random().toString(36).substr(2, 8);
};

const AdminPanel = () => {
  const [receta, setReceta] = useState({ nombre: '', instrucciones: '', tiempo: '', personas: '', cantidad_ingredientes: '', imagen: '', id_ingredientes: '', id_categoria: '', id_comentarios: '', descripcion: '' });
  const [categoria, setCategoria] = useState({ nombre: '', descripcion: '', imagen: '' });
  const [ingrediente, setIngrediente] = useState({ nombre: '', descripcion: '', imagen: '' });
  const [usuario, setUsuario] = useState({ nombre: '', correo: '', contraseña: '', foto_perfil: '' });

  const [showReceta, setShowReceta] = useState(false);
  const [showCategoria, setShowCategoria] = useState(false);
  const [showIngrediente, setShowIngrediente] = useState(false);
  const [showUsuario, setShowUsuario] = useState(false);

  const handleRecetaChange = (e) => setReceta({ ...receta, [e.target.name]: e.target.value });
  const handleCategoriaChange = (e) => setCategoria({ ...categoria, [e.target.name]: e.target.value });
  const handleIngredienteChange = (e) => setIngrediente({ ...ingrediente, [e.target.name]: e.target.value });
  const handleUsuarioChange = (e) => setUsuario({ ...usuario, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (showReceta) {
        const newReceta = { ...receta, id_receta: generateId() };
        console.log('Receta:', newReceta);
        
      } else if (showCategoria) {
        const newCategoria = { ...categoria, id_categoria: generateId() };
        console.log('Categoría:', newCategoria);
      } else if (showIngrediente) {
        const newIngrediente = { ...ingrediente, id_ingrediente: generateId() };
        console.log('Ingrediente:', newIngrediente);
      } else if (showUsuario) {
        const newUsuario = { ...usuario, id_usuario: generateId() };
        console.log('Usuario:', newUsuario);
      }
    } catch (error) {
      console.error('Error al guardar los datos:', error);
    }
  };

  return (
    <div className="admin-panel-container">
      <h1>Admin Panel</h1>
      <p>Aqui podrás gestionar más a fondo la web</p>
      <Link to="/">
        <button className="back-button">Volver a Inicio</button>
      </Link>

      <div className="section">
        <button onClick={() => { setShowReceta(true); setShowCategoria(false); setShowIngrediente(false); setShowUsuario(false); }} className="toggle-button">Recetas</button>
        {showReceta && (
          <form onSubmit={handleSubmit}>
            <h2>Agregar Receta</h2>
            <input type="text" name="nombre" placeholder="Nombre" value={receta.nombre} onChange={handleRecetaChange} />
            <textarea name="instrucciones" placeholder="Instrucciones" value={receta.instrucciones} onChange={handleRecetaChange} />
            <input type="number" name="tiempo" placeholder="Tiempo" value={receta.tiempo} onChange={handleRecetaChange} />
            <input type="number" name="personas" placeholder="Personas" value={receta.personas} onChange={handleRecetaChange} />
            <input type="number" name="cantidad_ingredientes" placeholder="Porciones" value={receta.cantidad_ingredientes} onChange={handleRecetaChange} />
            <input type="text" name="imagen" placeholder="Imagen" value={receta.imagen} onChange={handleRecetaChange} />
            <input type="text" name="id_ingredientes" placeholder="ID Ingredientes" value={receta.id_ingredientes} onChange={handleRecetaChange} />
            <input type="text" name="id_categoria" placeholder="ID Categoría" value={receta.id_categoria} onChange={handleRecetaChange} />
            <input type="text" name="id_comentarios" placeholder="ID Comentarios" value={receta.id_comentarios} onChange={handleRecetaChange} />
            <textarea name="descripcion" placeholder="Descripción" value={receta.descripcion} onChange={handleRecetaChange} />
            <button type="submit">Agregar Receta</button>
          </form>
        )}
      </div>

      <div className="section">
        <button onClick={() => { setShowReceta(false); setShowCategoria(true); setShowIngrediente(false); setShowUsuario(false); }} className="toggle-button">Categorías</button>
        {showCategoria && (
          <form onSubmit={handleSubmit}>
            <h2>Agregar Categoría</h2>
            <input type="text" name="nombre" placeholder="Nombre" value={categoria.nombre} onChange={handleCategoriaChange} />
            <textarea name="descripcion" placeholder="Descripción" value={categoria.descripcion} onChange={handleCategoriaChange} />
            <input type="text" name="imagen" placeholder="Imagen" value={categoria.imagen} onChange={handleCategoriaChange} />
            <button type="submit">Agregar Categoría</button>
          </form>
        )}
      </div>

      <div className="section">
        <button onClick={() => { setShowReceta(false); setShowCategoria(false); setShowIngrediente(true); setShowUsuario(false); }} className="toggle-button">Ingredientes</button>
        {showIngrediente && (
          <form onSubmit={handleSubmit}>
            <h2>Agregar Ingrediente</h2>
            <input type="text" name="nombre" placeholder="Nombre" value={ingrediente.nombre} onChange={handleIngredienteChange} />
            <textarea name="descripcion" placeholder="Descripción" value={ingrediente.descripcion} onChange={handleIngredienteChange} />
            <input type="text" name="imagen" placeholder="Imagen" value={ingrediente.imagen} onChange={handleIngredienteChange} />
            <button type="submit">Agregar Ingrediente</button>
          </form>
        )}
      </div>

      <div className="section">
        <button onClick={() => { setShowReceta(false); setShowCategoria(false); setShowIngrediente(false); setShowUsuario(true); }} className="toggle-button">Usuarios</button>
        {showUsuario && (
          <form onSubmit={handleSubmit}>
            <h2>Agregar Usuario</h2>
            <input type="text" name="nombre" placeholder="Nombre" value={usuario.nombre} onChange={handleUsuarioChange} />
            <input type="email" name="correo" placeholder="Correo" value={usuario.correo} onChange={handleUsuarioChange} />
            <input type="password" name="contraseña" placeholder="Contraseña" value={usuario.contraseña} onChange={handleUsuarioChange} />
            <input type="text" name="foto_perfil" placeholder="Foto de Perfil" value={usuario.foto_perfil} onChange={handleUsuarioChange} />
            <button type="submit">Agregar Usuario</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
import React from 'react';
import { Link } from 'react-router-dom';
import './ingredientes.css';

const AdminPanel = () => {
  return (
    <div className="admin-panel-container">
      <h1>Admin Panel</h1>
      <p>Aqui podrás gestionar más a fondo la web</p>
      <Link to="/">
        <button className="back-button">Volver a Inicio</button>
      </Link>
    </div>
  );
};

export default AdminPanel;
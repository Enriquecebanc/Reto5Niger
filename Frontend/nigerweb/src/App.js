import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Inicio from './pages/inicio/inicio';
import Postres from './pages/postres/postres';
import Ingredientes from './pages/ingredientes/ingredientes';
import Recetas from './pages/recetas/recetas';
import PlatoPrin from './pages/platoPrin/platoPrin';
import PlatoSec from './pages/platoSec/platoSec';
import Entrantes from './pages/entrantes/entrantes';
import PanelAdmin from './pages/panelAdmin/panelAdmin';
import Login from './pages/login/login';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = (email, password) => {
    // Aquí puedes agregar la lógica para autenticar al usuario
    // Por ahora, simplemente autenticamos a cualquier usuario
    if (email.endsWith('@gmail.com') && password) {
      setIsAuthenticated(true);
    } else {
      alert('Por favor, ingrese un correo electrónico de Gmail y una contraseña válidos.');
    }
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          {!isAuthenticated ? (
            <Route path="/" element={<Login onLogin={handleLogin} />} />
          ) : (
            <>
              <Route path="/" element={<Inicio />} />
              <Route path="/postres" element={<Postres />} />
              <Route path="/ingredientes" element={<Ingredientes />} />
              <Route path="/recetas" element={<Recetas />} />
              <Route path="/platoPrin" element={<PlatoPrin />} />
              <Route path="/platoSec" element={<PlatoSec />} />
              <Route path="/entrantes" element={<Entrantes />} />
              <Route path="/panelAdmin" element={<PanelAdmin />} />
            </>
          )}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
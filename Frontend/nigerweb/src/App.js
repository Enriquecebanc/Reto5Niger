import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Inicio from './pages/inicio/inicio';
import Postres from './pages/postres/postres';
import Ingredientes from './pages/ingredientes/ingredientes';
import PlatoPrin from './pages/platoPrin/platoPrin';
import PlatoSec from './pages/platoSec/platoSec';
import Entrantes from './pages/entrantes/entrantes';
import PanelAdmin from './pages/panelAdmin/panelAdmin';
import Login from './pages/login/login';
import ContraseñaOlvidada from './pages/login/contraseñaOlvidada';
import Registro from './pages/registro/registro';
import Opiniones from './pages/opiniones/opiniones';
import Perfil from './pages/perfil/perfil';
import SubirReceta from './pages/subirReceta/subirReceta';
import Exportar from './pages/exportar/exportar';
import Importar from './pages/importar/importar';
import Rss from './pages/RSS/Rss'; 




function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState('');

  const handleLogin = (email, password) => {
    // Aquí puedes agregar la lógica para autenticar al usuario
    // Por ahora, simplemente autenticamos a cualquier usuario
    if ((email.endsWith('@gmail.com') || email.endsWith('@hotmail.com') || email.endsWith('.es') || email.endsWith('.eus')) && password) {
      setIsAuthenticated(true);
      setUser(email.split('@')[0]); // Usar la parte del correo antes del @ como nombre de usuario
    } else {
      alert('Por favor, ingrese un correo electrónico de Gmail y una contraseña válidos.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser('');
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          {!isAuthenticated ? (
            <>
              <Route path="/" element={<Login onLogin={handleLogin} />} />
              <Route path="/registro" element={<Registro />} />
              <Route path="/contraseñaOlvidada" element={<ContraseñaOlvidada />} />
            </>
          ) : (
            <>
              <Route path="/" element={<Inicio user={user} onLogout={handleLogout} />} />
              <Route path="/postres" element={<Postres />} />
              <Route path="/ingredientes" element={<Ingredientes />} />
              <Route path="/platoPrin" element={<PlatoPrin />} />
              <Route path="/platoSec" element={<PlatoSec />} />
              <Route path="/entrantes" element={<Entrantes />} />
              <Route path="/panelAdmin" element={<PanelAdmin />} />
              <Route path="/opiniones" element={<Opiniones />} />
              <Route path="/perfil" element={<Perfil onLogout={handleLogout} />} />
              <Route path="/subirReceta" element={<SubirReceta />} />
              <Route path="/exportar" element={<Exportar />} />
              <Route path="/importar" element={<Importar />} />
              <Route path="/RSS" element={<Rss />} /> {/* Ruta para el RSS */}
            </>
          )}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
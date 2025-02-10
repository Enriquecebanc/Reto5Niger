// filepath: /c:/Users/igorl/OneDrive/Desktop/Reto5Niger/Frontend/nigerweb/src/pages/login/login.js
import React, { useState } from 'react';
import './login.css';

const Login = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onLogin(email, password);
    };

    return (
        <div className="login-container">
            <h1>Iniciar Sesión</h1>
            <form onSubmit={handleSubmit} className="login-form">
                <div className="form-group">
                    <label htmlFor="email">Correo Electrónico (Gmail):</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={handleEmailChange}
                        placeholder="ejemplo@gmail.com"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Contraseña:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={handlePasswordChange}
                        placeholder="Contraseña"
                        required
                    />
                </div>
                <button type="submit" className="login-button">Iniciar Sesión</button>
                <div className="forgot-password">
                    <a href="/contraseñaOlvidada">¿Has olvidado la contraseña?</a>
                </div>
            </form>
        </div>
    );
};

export default Login;
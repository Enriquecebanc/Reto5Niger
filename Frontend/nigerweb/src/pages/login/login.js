import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './login.css';

const Login = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.get('http://localhost:8000/usuarios', {
                headers: {
                    'Authorization': `Bearer Reto5Niger`,
                },
            });
            const usuarios = response.data;

            const usuario = usuarios.find(user => user.correo === email && user.contraseña === password);

            if (usuario) {
                onLogin(email, password);
                navigate('/');
            } else {
                setErrorMessage('Correo o contraseña incorrectos.');
            }
        } catch (error) {
            console.error('Error al verificar el usuario:', error);
            setErrorMessage('Error al verificar el usuario. Por favor, inténtalo de nuevo más tarde.');
        }
    };

    const handleRegister = () => {
        navigate('/registro');
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
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <button type="submit" className="login-button">Iniciar Sesión</button>
                <button type="button" className="register-button" onClick={handleRegister}>Registrar</button>
                <div className="forgot-password">
                    <a href="/contraseñaOlvidada">¿Has olvidado la contraseña?</a>
                </div>
            </form>
        </div>
    );
};

export default Login;
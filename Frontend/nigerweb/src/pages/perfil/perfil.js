import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import './perfil.css';

const Perfil = () => {
    const location = useLocation();
    const [user, setUser] = useState({
        nombre_usuario: '',
        correo: '',
        foto_perfil: '',
        respuesta_pregunta_1: '',
        respuesta_pregunta_2: '',
        respuesta_pregunta_3: ''
    });

    const [isEditing, setIsEditing] = useState({
        nombre_usuario: false,
        respuesta_pregunta_1: false,
        respuesta_pregunta_2: false,
        respuesta_pregunta_3: false
    });

    useEffect(() => {
        // Obtener la información del usuario
        const fetchUserProfile = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/usuarios/${location.state.id_usuario}`, {
                    headers: {
                        'Authorization': `Bearer Reto5Niger`,
                    },
                });
                setUser(response.data);
            } catch (error) {
                console.error('Error al obtener la información del usuario:', error);
            }
        };

        fetchUserProfile();
    }, [location.state.id_usuario]);

    const handleEditClick = (field) => {
        setIsEditing(prevState => ({
            ...prevState,
            [field]: true
        }));
    };

    const handleSaveClick = async (field) => {
        setIsEditing(prevState => ({
            ...prevState,
            [field]: false
        }));

        // Guardar los cambios en la base de datos
        try {
            await axios.put(`http://localhost:8000/usuarios/${location.state.id_usuario}`, user, {
                headers: {
                    'Authorization': `Bearer Reto5Niger`,
                },
            });
        } catch (error) {
            console.error('Error al guardar los cambios del usuario:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append('foto_perfil', file);

            try {
                const response = await axios.post(`http://localhost:8000/usuarios/${location.state.id_usuario}/foto`, formData, {
                    headers: {
                        'Authorization': `Bearer Reto5Niger`,
                        'Content-Type': 'multipart/form-data'
                    },
                });
                setUser(prevState => ({ ...prevState, foto_perfil: response.data.foto_perfil }));
            } catch (error) {
                console.error('Error al subir la imagen de perfil:', error);
            }
        }
    };

    return (
        <div className="perfil-container">
            <div className="perfil-header">
                <img src={`/images/${user.foto_perfil}.png`} alt="Profile" className="perfil-picture" />
                <input type="file" accept="image/*" onChange={handleImageChange} />
            </div>
            <div className="perfil-details">
                <p><strong>Correo:</strong> {user.correo}</p>
                <p><strong>Nombre:</strong>
                    {isEditing.nombre_usuario ? 
                        <><input type="text" name="nombre_usuario" value={user.nombre_usuario} onChange={handleChange} /><button onClick={() => handleSaveClick('nombre_usuario')}>Guardar</button></> : 
                        <>{user.nombre_usuario} <button onClick={() => handleEditClick('nombre_usuario')}>Editar</button></>}
                </p>
                <p><strong>Respuesta 1:</strong>
                    {isEditing.respuesta_pregunta_1 ? 
                        <><input type="text" name="respuesta_pregunta_1" value={user.respuesta_pregunta_1} onChange={handleChange} /><button onClick={() => handleSaveClick('respuesta_pregunta_1')}>Guardar</button></> : 
                        <>{user.respuesta_pregunta_1} <button onClick={() => handleEditClick('respuesta_pregunta_1')}>Editar</button></>}
                </p>
                <p><strong>Respuesta 2:</strong>
                    {isEditing.respuesta_pregunta_2 ? 
                        <><input type="text" name="respuesta_pregunta_2" value={user.respuesta_pregunta_2} onChange={handleChange} /><button onClick={() => handleSaveClick('respuesta_pregunta_2')}>Guardar</button></> : 
                        <>{user.respuesta_pregunta_2} <button onClick={() => handleEditClick('respuesta_pregunta_2')}>Editar</button></>}
                </p>
                <p><strong>Respuesta 3:</strong>
                    {isEditing.respuesta_pregunta_3 ? 
                        <><input type="text" name="respuesta_pregunta_3" value={user.respuesta_pregunta_3} onChange={handleChange} /><button onClick={() => handleSaveClick('respuesta_pregunta_3')}>Guardar</button></> : 
                        <>{user.respuesta_pregunta_3} <button onClick={() => handleEditClick('respuesta_pregunta_3')}>Editar</button></>}
                </p>
            </div>
            <Link to="/">
                <button className="back-button">Volver a Inicio</button>
            </Link>
        </div>
    );
};

export default Perfil;
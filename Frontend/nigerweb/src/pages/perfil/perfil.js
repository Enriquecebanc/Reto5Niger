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

    const [showImagePopup, setShowImagePopup] = useState(false);
    const [availableImages, setAvailableImages] = useState([]);
    const [hoveredImage, setHoveredImage] = useState(null);

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

        // Cargar las imágenes disponibles
        const images = Array.from({ length: 17 }, (_, i) => require(`../../images/${i + 1}.png`));
        setAvailableImages(images);
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

    const handleImageChange = async (index) => {
        try {
            const response = await axios.put(`http://localhost:8000/usuarios/${location.state.id_usuario}/foto`, { foto_perfil: index + 1 }, {
                headers: {
                    'Authorization': `Bearer Reto5Niger`,
                },
            });
            setUser(prevState => ({ ...prevState, foto_perfil: response.data.foto_perfil }));
            setShowImagePopup(false);
        } catch (error) {
            console.error('Error al subir la imagen de perfil:', error);
        }
    };

    return (
        <div className="perfil-container">
            <div className="perfil-header">
                {user.foto_perfil && (
                    <img src={require(`../../images/${user.foto_perfil}.png`)} alt="Profile" className="perfil-picture" onClick={() => setShowImagePopup(true)} />
                )}
                {showImagePopup && (
                    <div className="image-popup">
                        <div className="image-popup-content">
                            {availableImages.map((src, index) => (
                                <img
                                    key={index}
                                    src={src}
                                    alt={`Perfil ${index + 1}`}
                                    className={`popup-image ${hoveredImage === index + 1 ? 'selected' : ''}`}
                                    onClick={() => handleImageChange(index + 1)}
                                    onMouseEnter={() => setHoveredImage(index + 1)}
                                    onMouseLeave={() => setHoveredImage(null)}
                                />
                            ))}
                            <button onClick={() => setShowImagePopup(false)}>Cerrar</button>
                        </div>
                    </div>
                )}
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
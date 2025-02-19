import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './perfil.css';

const Perfil = () => {
    const [user, setUser] = useState({
        name: '',
        email: 'johndoe@example.com',
        profilePicture: 'https://via.placeholder.com/150',
        password: '********',
        address: '',
        phone: '',
        birthDate: ''
    });

    const [isEditing, setIsEditing] = useState({
        name: false,
        address: false,
        phone: false,
        birthDate: false
    });

    const handleEditClick = (field) => {
        setIsEditing(prevState => ({
            ...prevState,
            [field]: true
        }));
    };

    const handleSaveClick = (field) => {
        setIsEditing(prevState => ({
            ...prevState,
            [field]: false
        }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setUser(prevState => ({ ...prevState, profilePicture: imageUrl }));
        }
    };

    return (
        <div className="perfil-container">
            <div className="perfil-header">
                <img src={user.profilePicture} alt="Profile" className="perfil-picture" />
                <input type="file" accept="image/*" onChange={handleImageChange} />
            </div>
            <div className="perfil-details">
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Password:</strong> {user.password}</p>
                <p><strong>Name:</strong> 
                    {isEditing.name ? 
                        <><input type="text" name="name" value={user.name} onChange={handleChange} /><button onClick={() => handleSaveClick('name')}>Save</button></> : 
                        <>{user.name} <button onClick={() => handleEditClick('name')}>Edit</button></>}
                </p>
                <p><strong>Address:</strong> 
                    {isEditing.address ? 
                        <><input type="text" name="address" value={user.address} onChange={handleChange} /><button onClick={() => handleSaveClick('address')}>Save</button></> : 
                        <>{user.address} <button onClick={() => handleEditClick('address')}>Edit</button></>}
                </p>
                <p><strong>Phone:</strong> 
                    {isEditing.phone ? 
                        <><input type="text" name="phone" value={user.phone} onChange={handleChange} /><button onClick={() => handleSaveClick('phone')}>Save</button></> : 
                        <>{user.phone} <button onClick={() => handleEditClick('phone')}>Edit</button></>}
                </p>
                <p><strong>Birth Date:</strong> 
                    {isEditing.birthDate ? 
                        <><input type="date" name="birthDate" value={user.birthDate} onChange={handleChange} /><button onClick={() => handleSaveClick('birthDate')}>Save</button></> : 
                        <>{user.birthDate} <button onClick={() => handleEditClick('birthDate')}>Edit</button></>}
                </p>
            </div>
            <Link to="/">
                <button className="back-button">Volver a Inicio</button>
            </Link>
        </div>
    );
};

export default Perfil;

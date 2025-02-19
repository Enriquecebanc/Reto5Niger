import React, { useState } from 'react';
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
                <p><strong>Name:</strong> <input type="text" name="name" value={user.name} onChange={handleChange} /></p>
                <p><strong>Address:</strong> <input type="text" name="address" value={user.address} onChange={handleChange} /></p>
                <p><strong>Phone:</strong> <input type="text" name="phone" value={user.phone} onChange={handleChange} /></p>
                <p><strong>Birth Date:</strong> <input type="date" name="birthDate" value={user.birthDate} onChange={handleChange} /></p>
            </div>
        </div>
    );
};

export default Perfil;

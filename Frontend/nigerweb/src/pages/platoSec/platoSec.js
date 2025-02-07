import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './platoSec.css';
import steakImage from '../../images/Steak.jpg';
import paellaImage from '../../images/Paella.jpg';
import salmonImage from '../../images/Salmon.jpg';
import lasañaImage from '../../images/Lasaña.jpg';
import polloajoImage from '../../images/Polloajo.jpg';

const recipes = [
  {
    id: 1,
    name: 'Steak a la Parrilla',
    description: 'Jugoso filete de ternera cocinado a la parrilla.',
    ingredients: ['Filete de ternera', 'Sal', 'Pimienta', 'Aceite de oliva', 'Ajo', 'Romero'],
    instructions: [
      'Sazona el filete con sal, pimienta y ajo picado.',
      'Calienta la parrilla y unta con aceite de oliva.',
      'Cocina el filete durante 3-4 minutos por cada lado.',
      'Deja reposar unos minutos antes de servir con romero fresco.'
    ],
    image: steakImage
  },
  {
    id: 2,
    name: 'Paella',
    description: 'Un clásico plato español con arroz y mariscos.',
    ingredients: ['Arroz', 'Gambas', 'Mejillones', 'Pollo', 'Pimiento rojo', 'Azafrán', 'Caldo de pescado'],
    instructions: [
      'Sofríe el pollo y los pimientos en una paellera.',
      'Añade el arroz y sofríelo unos minutos.',
      'Vierte el caldo de pescado y el azafrán.',
      'Cocina a fuego medio y agrega los mariscos al final.',
      'Deja reposar antes de servir.'
    ],
    image: paellaImage
  },
  {
    id: 3,
    name: 'Salmón al Horno',
    description: 'Salmón jugoso horneado con limón y eneldo.',
    ingredients: ['Salmón', 'Limón', 'Eneldo', 'Aceite de oliva', 'Sal', 'Pimienta'],
    instructions: [
      'Precalienta el horno a 180°C.',
      'Coloca el salmón en una bandeja para hornear.',
      'Rocía con aceite de oliva, sal, pimienta y jugo de limón.',
      'Hornea durante 12-15 minutos.',
      'Sirve con eneldo fresco por encima.'
    ],
    image: salmonImage
  },
  {
    id: 4,
    name: 'Lasaña',
    description: 'Un delicioso plato de pasta con carne y bechamel.',
    ingredients: ['Láminas de lasaña', 'Carne picada', 'Tomate', 'Cebolla', 'Queso', 'Bechamel'],
    instructions: [
      'Sofríe la carne con cebolla y tomate.',
      'Cocina la bechamel y reserva.',
      'En una bandeja, alterna capas de pasta, carne y bechamel.',
      'Cubre con queso rallado y hornea a 180°C durante 30 minutos.',
      'Deja reposar antes de servir.'
    ],
    image: lasañaImage
  },
  {
    id: 5,
    name: 'Pollo al Ajillo',
    description: 'Pollo dorado con ajo y vino blanco.',
    ingredients: ['Pollo', 'Ajo', 'Aceite de oliva', 'Vino blanco', 'Perejil', 'Sal', 'Pimienta'],
    instructions: [
      'Corta el pollo en trozos y sazona con sal y pimienta.',
      'Sofríe el ajo en aceite de oliva y añade el pollo.',
      'Dora bien el pollo por todos los lados.',
      'Añade el vino blanco y cocina a fuego lento hasta reducir.',
      'Sirve con perejil fresco.'
    ],
    image: polloajoImage
  }
];

const Segundos = () => {
  const [currentRecipeIndex, setCurrentRecipeIndex] = useState(0);

  const handleNext = () => {
    setCurrentRecipeIndex((prevIndex) => (prevIndex + 1) % recipes.length);
  };

  const handlePrev = () => {
    setCurrentRecipeIndex((prevIndex) => (prevIndex - 1 + recipes.length) % recipes.length);
  };

  const currentRecipe = recipes[currentRecipeIndex];

  return (
    <div className="segundos-container">
      <h1>Segundos Platos</h1>
      <p>Aquí encontrarás una variedad de segundos platos.</p>
      <div className="recipe-item">
        <button onClick={handlePrev} className="nav-button prev-button">❮</button>
        <div className="recipe-content">
          <h2>{currentRecipe.name}</h2>
          <img src={currentRecipe.image} alt={currentRecipe.name} className="recipe-image" />
          <p>{currentRecipe.description}</p>
          <h3>Ingredientes:</h3>
          <ul>
            {currentRecipe.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
          <h3>Instrucciones:</h3>
          <ol>
            {currentRecipe.instructions.map((instruction, index) => (
              <li key={index}>{instruction}</li>
            ))}
          </ol>
        </div>
        <button onClick={handleNext} className="nav-button next-button">❯</button>
      </div>
      <Link to="/">
        <button className="back-button">Volver a Inicio</button>
      </Link>
    </div>
  );
};

export default Segundos;

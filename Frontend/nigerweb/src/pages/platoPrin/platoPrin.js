import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './platoPrin.css';
import ensaladaImage from '../../images/Ensalada.jpg';
import sopaImage from '../../images/Sopa.jpg';
import cremaImage from '../../images/Crema.jpg';
import espaguetisImage from '../../images/Espaguetis.jpg';
import revueltoImage from '../../images/Revuelto.jpg';

const recipes = [
  {
    id: 1,
    name: 'Ensalada Mixta',
    description: 'Una refrescante ensalada con lechuga, tomate, cebolla y atún.',
    ingredients: ['Lechuga', 'Tomate', 'Cebolla', 'Atún', 'Aceitunas', 'Aceite de oliva', 'Vinagre', 'Sal'],
    instructions: [
      'Lava y corta la lechuga, el tomate y la cebolla.',
      'Mezcla todos los ingredientes en un bol.',
      'Aliña con aceite, vinagre y sal.',
      'Sirve fría.'
    ],
    image: ensaladaImage
  },
  {
    id: 2,
    name: 'Sopa de Verduras',
    description: 'Una sopa reconfortante con una variedad de verduras frescas.',
    ingredients: ['Calabacín', 'Zanahoria', 'Puerro', 'Patata', 'Caldo de verduras', 'Aceite de oliva', 'Sal', 'Pimienta'],
    instructions: [
      'Pela y corta todas las verduras en trozos pequeños.',
      'Sofríe las verduras en aceite de oliva.',
      'Añade el caldo de verduras y cocina hasta que estén tiernas.',
      'Tritura la sopa si lo deseas.',
      'Sirve caliente.'
    ],
    image: sopaImage
  },
  {
    id: 3,
    name: 'Crema de Calabaza',
    description: 'Una crema suave y dulce de calabaza con un toque de nuez moscada.',
    ingredients: ['Calabaza', 'Cebolla', 'Caldo de verduras', 'Nata', 'Nuez moscada', 'Aceite de oliva', 'Sal', 'Pimienta'],
    instructions: [
      'Pela y corta la calabaza y la cebolla.',
      'Sofríe la cebolla en aceite de oliva.',
      'Añade la calabaza y el caldo de verduras y cocina hasta que esté tierna.',
      'Tritura la crema.',
      'Añade la nata y la nuez moscada y calienta suavemente.',
      'Sirve caliente.'
    ],
    image: cremaImage
  },
  {
    id: 4,
    name: 'Espaguetis con Tomate',
    description: 'Un plato clásico de espaguetis con una salsa de tomate casera.',
    ingredients: ['Espaguetis', 'Tomate triturado', 'Cebolla', 'Ajo', 'Aceite de oliva', 'Azúcar', 'Sal', 'Pimienta'],
    instructions: [
      'Cuece los espaguetis según las instrucciones del paquete.',
      'Sofríe la cebolla y el ajo en aceite de oliva.',
      'Añade el tomate triturado, el azúcar, la sal y la pimienta.',
      'Cocina la salsa a fuego lento hasta que espese.',
      'Mezcla los espaguetis con la salsa y sirve.'
    ],
    image: espaguetisImage
  },
  {
    id: 5,
    name: 'Revuelto de Setas',
    description: 'Un revuelto cremoso con setas variadas y huevo.',
    ingredients: ['Huevos', 'Setas variadas', 'Ajo', 'Perejil', 'Aceite de oliva', 'Sal', 'Pimienta'],
    instructions: [
      'Limpia y corta las setas.',
      'Sofríe el ajo en aceite de oliva.',
      'Añade las setas y cocina hasta que estén tiernas.',
      'Bate los huevos con sal y pimienta.',
      'Vierte los huevos sobre las setas y remueve hasta que estén cuajados.',
      'Espolvorea perejil picado antes de servir.'
    ],
    image: revueltoImage
  }
];

const PrimerosPlatos = () => {
  const [currentRecipeIndex, setCurrentRecipeIndex] = useState(0);

  const handleNext = () => {
    setCurrentRecipeIndex((prevIndex) => (prevIndex + 1) % recipes.length);
  };

  const handlePrev = () => {
    setCurrentRecipeIndex((prevIndex) => (prevIndex - 1 + recipes.length) % recipes.length);
  };

  const currentRecipe = recipes[currentRecipeIndex];

  return (
    <div className="primerosplatos-container">
      <h1>Primeros Platos</h1>
      <p>Aquí encontrarás una variedad de deliciosos primeros platos.</p>
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

export default PrimerosPlatos;
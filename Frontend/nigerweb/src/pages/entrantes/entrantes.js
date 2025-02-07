import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './entrantes.css';
import croquetasImage from '../../images/Croquetas.jpg';
import gazpachoImage from '../../images/Gazpacho.jpg';
import bravasImage from '../../images/Bravas.jpg';
import bruschettaImage from '../../images/Bruschetta.jpg';
import hummusImage from '../../images/Hummus.jpg';

const recipes = [
  {
    id: 1,
    name: 'Croquetas',
    description: 'Deliciosas croquetas crujientes por fuera y cremosas por dentro.',
    ingredients: ['Harina', 'Leche', 'Mantequilla', 'Jamón', 'Huevo', 'Pan rallado'],
    instructions: [
      'Prepara una bechamel con harina, leche y mantequilla.',
      'Añade el jamón picado a la bechamel.',
      'Deja enfriar la mezcla y forma las croquetas.',
      'Pasa las croquetas por huevo batido y pan rallado.',
      'Fríe las croquetas hasta que estén doradas.'
    ],
    image: croquetasImage
  },
  {
    id: 2,
    name: 'Gazpacho',
    description: 'Una sopa fría de tomate, perfecta para los días calurosos.',
    ingredients: ['Tomate', 'Pepino', 'Pimiento', 'Cebolla', 'Ajo', 'Aceite de oliva', 'Vinagre', 'Sal'],
    instructions: [
      'Lava y corta los vegetales.',
      'Tritura todos los ingredientes en una licuadora hasta obtener una mezcla suave.',
      'Refrigera el gazpacho durante al menos una hora antes de servir.',
      'Sirve frío con un chorrito de aceite de oliva.'
    ],
    image: gazpachoImage
  },
  {
    id: 3,
    name: 'Patatas Bravas',
    description: 'Patatas fritas servidas con una salsa picante.',
    ingredients: ['Patatas', 'Aceite de oliva', 'Sal', 'Tomate', 'Ajo', 'Pimentón', 'Vinagre', 'Azúcar'],
    instructions: [
      'Pela y corta las patatas en cubos.',
      'Fríe las patatas en aceite de oliva hasta que estén doradas y crujientes.',
      'Para la salsa, sofríe el ajo y el pimentón en aceite de oliva.',
      'Añade el tomate triturado, el vinagre y el azúcar, y cocina a fuego lento hasta que espese.',
      'Sirve las patatas con la salsa por encima.'
    ],
    image: bravasImage
  },
  {
    id: 4,
    name: 'Bruschetta',
    description: 'Tostadas de pan con tomate, ajo y albahaca, un clásico aperitivo italiano.',
    ingredients: ['Pan', 'Tomate', 'Ajo', 'Albahaca', 'Aceite de oliva', 'Sal'],
    instructions: [
      'Tuesta las rebanadas de pan.',
      'Frota el ajo sobre el pan tostado.',
      'Corta los tomates en cubos y mézclalos con albahaca picada.',
      'Añade aceite de oliva y sal a la mezcla de tomate.',
      'Coloca la mezcla de tomate sobre el pan tostado y sirve.'
    ],
    image: bruschettaImage
  },
  {
    id: 5,
    name: 'Hummus',
    description: 'Un dip cremoso de garbanzos, perfecto para acompañar con pan pita.',
    ingredients: ['Garbanzos', 'Tahini', 'Ajo', 'Limón', 'Aceite de oliva', 'Sal'],
    instructions: [
      'Tritura los garbanzos cocidos con tahini, ajo y jugo de limón.',
      'Añade aceite de oliva y sal al gusto.',
      'Mezcla hasta obtener una consistencia suave.',
      'Sirve con pan pita o vegetales.'
    ],
    image: hummusImage
  }
];

const Entrantes = () => {
  const [currentRecipeIndex, setCurrentRecipeIndex] = useState(0);

  const handleNext = () => {
    setCurrentRecipeIndex((prevIndex) => (prevIndex + 1) % recipes.length);
  };

  const handlePrev = () => {
    setCurrentRecipeIndex((prevIndex) => (prevIndex - 1 + recipes.length) % recipes.length);
  };

  const currentRecipe = recipes[currentRecipeIndex];

  return (
    <div className="entrantes-container">
      <h1>Entrantes</h1>
      <p>Aquí encontrarás una variedad de entrantes.</p>
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

export default Entrantes;
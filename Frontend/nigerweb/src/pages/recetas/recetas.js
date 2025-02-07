import React from 'react';
import { Link } from 'react-router-dom';
import './recetas.css';
import carbonaraImage from '../../images/Carbonara.jpg';
import curryImage from '../../images/Pollo.jpg';
import burritosImage from '../../images/Burritos.jpg';
import txuletaImage from '../../images/Txuleta.jpg';
import pimientosImage from '../../images/Pimientos.jpg';

const recipes = [
  {
    id: 1,
    name: 'Spaghetti Carbonara',
    description: 'Un clásico plato de pasta italiana con una salsa cremosa de huevo, queso y panceta.',
    ingredients: ['Spaghetti', 'Huevos', 'Queso Pecorino', 'Panceta', 'Pimienta Negra'],
    instructions: [
      'Cocina los spaghetti en agua con sal.',
      'Bate los huevos y mezcla con el queso rallado.',
      'Fríe la panceta hasta que esté crujiente.',
      'Mezcla los spaghetti con la panceta y la mezcla de huevo y queso.',
      'Sirve con pimienta negra recién molida.'
    ],
    image: carbonaraImage
  },
  {
    id: 2,
    name: 'Pollo al Curry',
    description: 'Un plato picante y sabroso con pollo cocido en una rica salsa de curry.',
    ingredients: ['Pollo', 'Cebolla', 'Ajo', 'Jengibre', 'Tomate', 'Leche de Coco', 'Curry en Polvo'],
    instructions: [
      'Sofríe la cebolla, el ajo y el jengibre.',
      'Añade el pollo y cocina hasta que esté dorado.',
      'Agrega el tomate y el curry en polvo.',
      'Vierte la leche de coco y cocina a fuego lento.',
      'Sirve con arroz.'
    ],
    image: curryImage
  },
  {
    id: 3,
    name: 'Burritos',
    description: 'Tortillas de harina rellenas de carne, frijoles, arroz y otros ingredientes, típicos de la cocina mexicana.',
    ingredients: ['Tortillas de Harina', 'Carne de Res', 'Frijoles', 'Arroz', 'Queso', 'Lechuga', 'Tomate'],
    instructions: [
      'Cocina la carne de res con especias.',
      'Calienta las tortillas de harina.',
      'Rellena las tortillas con carne, frijoles, arroz, queso, lechuga y tomate.',
      'Enrolla las tortillas para formar los burritos.',
      'Sirve con salsa y guacamole.'
    ],
    image: burritosImage
  },
  {
    id: 4,
    name: 'Txuleta con Patatas',
    description: 'Un suculento chuletón de ternera acompañado de patatas fritas.',
    ingredients: ['Chuletón de Ternera', 'Patatas', 'Aceite de Oliva', 'Sal', 'Pimienta'],
    instructions: [
      'Sazona el chuletón con sal y pimienta.',
      'Fríe las patatas en aceite de oliva hasta que estén doradas.',
      'Cocina el chuletón a la parrilla al punto deseado.',
      'Sirve el chuletón con las patatas fritas.',
      'Acompaña con una ensalada si lo deseas.'
    ],
    image: txuletaImage
  },
  {
    id: 5,
    name: 'Pimientos Rellenos',
    description: 'Pimientos frescos rellenos de carne y arroz, cocidos en una salsa de tomate.',
    ingredients: ['Pimientos', 'Carne Molida', 'Arroz', 'Cebolla', 'Ajo', 'Tomate', 'Queso'],
    instructions: [
      'Corta la parte superior de los pimientos y retira las semillas.',
      'Cocina la carne molida con cebolla y ajo.',
      'Mezcla la carne con arroz cocido y rellena los pimientos.',
      'Coloca los pimientos en una bandeja para hornear y cúbrelos con salsa de tomate.',
      'Hornea hasta que los pimientos estén tiernos y el queso esté derretido.'
    ],
    image: pimientosImage
  }
];

const Recetas = () => {
  return (
    <div className="recetas-container">
      <h1>Recetas</h1>
      <p>Aquí encontrarás una variedad de recetas.</p>
      <div className="recipes-list">
        {recipes.map((recipe) => (
          <div key={recipe.id} className="recipe-item">
            <h2>{recipe.name}</h2>
            <img src={recipe.image} alt={recipe.name} className="recipe-image" />
            <p>{recipe.description}</p>
            <h3>Ingredientes:</h3>
            <ul>
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
            <h3>Instrucciones:</h3>
            <ol>
              {recipe.instructions.map((instruction, index) => (
                <li key={index}>{instruction}</li>
              ))}
            </ol>
          </div>
        ))}
      </div>
      <Link to="/">
        <button className="back-button">Volver a Inicio</button>
      </Link>
    </div>
  );
};

export default Recetas;
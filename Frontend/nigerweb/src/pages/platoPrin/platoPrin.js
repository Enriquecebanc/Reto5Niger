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
    description: (
        <>
            <strong>🕔 10 minutos</strong> | <strong>2 personas</strong> | Una refrescante ensalada con lechuga, tomate, cebolla y atún.
        </>
    ),
    ingredients: [
        '1 lechuga',
        '2 tomates',
        '1 cebolla',
        '1 lata de atún',
        'Unas aceitunas al gusto',
        '2 cucharadas de aceite de oliva',
        '1 cucharada de vinagre',
        'Sal al gusto'
    ],
    instructions: [
      'Lava y corta la lechuga, el tomate y la cebolla. (3 mins)',
      'Mezcla todos los ingredientes en un bol. (3 mins)',
      'Aliña con aceite, vinagre y sal. (2 mins)',
      'Sirve fría. (2 mins)'
    ],
    image: ensaladaImage
},
{
    id: 2,
    name: 'Sopa de Verduras',
    description: (
        <>
            <strong>🕔 40 minutos</strong> | <strong>4 personas</strong> | Una sopa reconfortante con una variedad de verduras frescas.
        </>
    ),
    ingredients: [
        '1 calabacín',
        '2 zanahorias',
        '1 puerro',
        '2 patatas',
        '1 litro de caldo de verduras',
        '2 cucharadas de aceite de oliva',
        'Sal al gusto',
        'Pimienta al gusto'
    ],
    instructions: [
      'Pela y corta todas las verduras en trozos pequeños. (10 mins)',
      'Sofríe las verduras en aceite de oliva. (5 mins)',
      'Añade el caldo de verduras y cocina hasta que estén tiernas. (15 mins)',
      'Tritura la sopa si lo deseas. (5 mins)',
      'Sirve caliente. (5 mins)'
    ],
    image: sopaImage
},
{
    id: 3,
    name: 'Crema de Calabaza',
    description: (
        <>
            <strong>🕔 45 minutos</strong> | <strong>4 personas</strong> | Una crema suave y dulce de calabaza con un toque de nuez moscada.
        </>
    ),
    ingredients: [
        '1 calabaza mediana',
        '1 cebolla',
        '1 litro de caldo de verduras',
        '200 ml de nata',
        '1/2 cucharadita de nuez moscada',
        '2 cucharadas de aceite de oliva',
        'Sal al gusto',
        'Pimienta al gusto'
    ],
    instructions: [
      'Pela y corta la calabaza y la cebolla. (10 mins)',
      'Sofríe la cebolla en aceite de oliva. (5 mins)',
      'Añade la calabaza y el caldo de verduras y cocina hasta que esté tierna. (15 mins)',
      'Tritura la crema. (5 mins)',
      'Añade la nata y la nuez moscada y calienta suavemente. (5 mins)',
      'Sirve caliente. (5 mins)'
    ],
    image: cremaImage
},
{
    id: 4,
    name: 'Espaguetis con Tomate',
    description: (
        <>
            <strong>🕔 30 minutos</strong> | <strong>2 personas</strong> | Un plato clásico de espaguetis con una salsa de tomate casera.
        </>
    ),
    ingredients: [
        '200 g de espaguetis',
        '400 g de tomate triturado',
        '1 cebolla',
        '2 dientes de ajo',
        '2 cucharadas de aceite de oliva',
        '1 cucharadita de azúcar',
        'Sal al gusto',
        'Pimienta al gusto'
    ],
    instructions: [
      'Cuece los espaguetis según las instrucciones del paquete. (10 mins)',
      'Sofríe la cebolla y el ajo en aceite de oliva. (5 mins)',
      'Añade el tomate triturado, el azúcar, la sal y la pimienta. (5 mins)',
      'Cocina la salsa a fuego lento hasta que espese. (7 mins)',
      'Mezcla los espaguetis con la salsa y sirve. (3 mins)'
    ],
    image: espaguetisImage
},
{
    id: 5,
    name: 'Revuelto de Setas',
    description: (
        <>
            <strong>🕔 20 minutos</strong> | <strong>2 personas</strong> | Un revuelto cremoso con setas variadas y huevo.
        </>
    ),
    ingredients: [
        '4 huevos',
        '200 g de setas variadas',
        '2 dientes de ajo',
        'Perejil al gusto',
        '2 cucharadas de aceite de oliva',
        'Sal al gusto',
        'Pimienta al gusto'
    ],
    instructions: [
      'Limpia y corta las setas. (5 mins)',
      'Sofríe el ajo en aceite de oliva. (3 mins)',
      'Añade las setas y cocina hasta que estén tiernas. (7 mins)',
      'Bate los huevos con sal y pimienta. (2 mins)',
      'Vierte los huevos sobre las setas y remueve hasta que estén cuajados. (3 mins)',
      'Espolvorea perejil picado antes de servir. (2 mins)'
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
      <h1>Primeros Platos </h1>
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
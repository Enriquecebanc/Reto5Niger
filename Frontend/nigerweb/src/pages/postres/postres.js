import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './postres.css'; // Crea un archivo postres.css
import tartaQuesoImage from '../../images/TartaQueso.jpg';
import brownieImage from '../../images/Brownie.jpg';
import flanImage from '../../images/Flan.jpg';
import arrozConLecheImage from '../../images/ArrozConLeche.jpg';
import heladoImage from '../../images/Helado.jpg';

const recipes = [
  {
    id: 1,
    name: 'Tarta de Queso',
    description: 'Una deliciosa tarta de queso cremosa y suave.',
    ingredients: ['Queso crema', 'Huevos', 'Azúcar', 'Nata', 'Galletas', 'Mantequilla'],
    instructions: [
      'Tritura las galletas y mézclalas con mantequilla derretida para hacer la base.',
      'Bate el queso crema con el azúcar hasta que quede suave.',
      'Añade los huevos y la nata y mezcla bien.',
      'Vierte la mezcla sobre la base de galletas.',
      'Hornea hasta que esté dorada y deja enfriar antes de servir.'
    ],
    image: tartaQuesoImage
  },
  {
    id: 2,
    name: 'Brownie',
    description: 'Un bizcocho de chocolate denso y delicioso.',
    ingredients: ['Chocolate', 'Mantequilla', 'Azúcar', 'Huevos', 'Harina', 'Nueces (opcional)'],
    instructions: [
      'Derrite el chocolate con la mantequilla.',
      'Bate los huevos con el azúcar hasta que estén espumosos.',
      'Añade la mezcla de chocolate y la harina.',
      'Incorpora las nueces si lo deseas.',
      'Hornea hasta que esté cocido pero aún ligeramente húmedo.'
    ],
    image: brownieImage
  },
  {
    id: 3,
    name: 'Flan',
    description: 'Un postre clásico de huevo y caramelo.',
    ingredients: ['Huevos', 'Leche', 'Azúcar', 'Vainilla'],
    instructions: [
      'Prepara un caramelo con azúcar y agua.',
      'Bate los huevos con la leche, el azúcar y la vainilla.',
      'Vierte la mezcla sobre el caramelo en un molde.',
      'Cocina al baño maría en el horno hasta que esté cuajado.',
      'Refrigera antes de desmoldar y servir.'
    ],
    image: flanImage
  },
  {
    id: 4,
    name: 'Arroz con Leche',
    description: 'Un postre tradicional de arroz cocido en leche con azúcar y canela.',
    ingredients: ['Arroz', 'Leche', 'Azúcar', 'Canela', 'Piel de limón'],
    instructions: [
      'Lava el arroz.',
      'Hierve la leche con la canela y la piel de limón.',
      'Añade el arroz y el azúcar.',
      'Cocina a fuego lento hasta que el arroz esté tierno y la leche haya espesado.',
      'Espolvorea canela por encima antes de servir.'
    ],
    image: arrozConLecheImage
  },
  {
    id: 5,
    name: 'Helado de chocolate',
    description: 'Un postre refrescante y delicioso.',
    ingredients: ['Nata', 'Leche', 'Azúcar', 'Chocolate', 'Frutas (opcional)'],
    instructions: [
      'Mezcla la nata, la leche, el azúcar y la vainilla.',
      'Si quieres, añade frutas trituradas.',
      'Congela la mezcla en una heladera o en el congelador, removiendo cada cierto tiempo.',
      'Sirve frío.'
    ],
    image: heladoImage
  }
];

const Postres = () => {
  const [currentRecipeIndex, setCurrentRecipeIndex] = useState(0);

  const handleNext = () => {
    setCurrentRecipeIndex((prevIndex) => (prevIndex + 1) % recipes.length);
  };

  const handlePrev = () => {
    setCurrentRecipeIndex((prevIndex) => (prevIndex - 1 + recipes.length) % recipes.length);
  };

  const currentRecipe = recipes[currentRecipeIndex];

  return (
    <div className="postres-container">
      <h1>Postres</h1>
      <p>Aquí encontrarás una variedad de postres deliciosos.</p>
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

export default Postres;
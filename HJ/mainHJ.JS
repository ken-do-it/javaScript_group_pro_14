// const API_TYPE = 'public';
// const APP_ID = 'eca0d2ce';
// const APP_KEY = '5c7761a24073cbd7ea715a9b3b7ae84a';

// const BASE_URL = `https://api.edamam.com/api/recipes/v2?type=${API_TYPE}&app_id=${APP_ID}&app_key=${APP_KEY}`;

// let url = '';

const renderRecipeBoxes = () => {
  const recipeContainer = document.querySelector('.recipe-container');

  for (let i = 1; i <= 8; i++) {
    const box = document.createElement('div');
    box.classList.add('box');
    box.textContent = `Recipe${i}`;
    recipeContainer.appendChild(box);
  }
};

renderRecipeBoxes();

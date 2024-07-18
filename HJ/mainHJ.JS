// const API_TYPE = 'public';
// const APP_ID = 'eca0d2ce';
// const APP_KEY = '5c7761a24073cbd7ea715a9b3b7ae84a';

// const BASE_URL = `https://api.edamam.com/api/recipes/v2?type=${API_TYPE}&app_id=${APP_ID}&app_key=${APP_KEY}`;

// let url = '';





// 혜정님 코드 시작 
// const renderRecipeBoxes = () => {
//   const recipeContainer = document.querySelector('.recipe-container');

//   for (let i = 1; i <= 8; i++) {
//     const box = document.createElement('div');
//     box.classList.add('box');
//     box.textContent = `Recipe${i}`;
//     recipeContainer.appendChild(box);
//   }
// };

// renderRecipeBoxes();
//혜정님 코드 끝 





// mainHJ.js
const renderRecipeBoxes = () => {
  const recipeContainer = document.querySelector('.recipe-container');
  recipeContainer.innerHTML = ''; // 기존 박스 초기화

  const containerWidth = recipeContainer.offsetWidth;
  const boxWidth = 150 + 16; // 박스 너비 + 그리드 갭
  const minBoxesPerRow = Math.floor(containerWidth / boxWidth);
  const numberOfRows = 2;
  const numberOfBoxes = minBoxesPerRow * numberOfRows;

  for (let i = 1; i <= numberOfBoxes; i++) {
    const box = document.createElement('div');
    box.classList.add('box');
    box.textContent = `Recipe${i}`;
    recipeContainer.appendChild(box);
  }
};

window.addEventListener('resize', renderRecipeBoxes);
window.addEventListener('load', renderRecipeBoxes);

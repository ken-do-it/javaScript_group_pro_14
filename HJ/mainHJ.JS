const API_TYPE = 'public';
const APP_ID = 'eca0d2ce';
const APP_KEY = '5c7761a24073cbd7ea715a9b3b7ae84a';
// const APP_KEY = config.apiKey;

const BASE_URL = `https://api.edamam.com/api/recipes/v2?type=${API_TYPE}&app_id=${APP_ID}&app_key=${APP_KEY}`;

let url = '';

const getRecipesInfo = async () => {
  url = new URL(`${BASE_URL}&q=salad`);
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data);
    const allRecipes = data.hits;
    renderCarousel(allRecipes);
  } catch (error) {
    console.error('Failed to fetch recipes:', error);
  }
};

const renderCarousel = (recipes) => {
  const carouselInner = document.querySelector('.carousel-inner');
  carouselInner.innerHTML = '';

  const itemsToRender = recipes.slice(0, 9); // 최대 9개의 항목만 렌더링
  const itemsPerSlide = 3; // 한 슬라이드에 3개의 이미지

  for (let i = 0; i < itemsToRender.length; i += itemsPerSlide) {
    const carouselItem = document.createElement('div');
    carouselItem.classList.add('carousel-item');
    if (i === 0) {
      carouselItem.classList.add('active');
    }

    const row = document.createElement('div');
    row.classList.add('row');

    for (let j = 0; j < itemsPerSlide; j++) {
      if (i + j < itemsToRender.length) {
        const recipe = itemsToRender[i + j];
        const label = recipe.recipe.label;
        const image = recipe.recipe.image;
        const url = recipe.recipe.url;

        const col = document.createElement('div');
        col.classList.add('col-4');

        col.innerHTML = `
          <a href="${url}" target="_blank">
            <img src="${image}" class="d-block w-100" alt="${label}">
          </a>
        `;

        row.appendChild(col); // Append each col to the row
      }
    }

    carouselItem.appendChild(row); // Append the row to the carousel-item (틀 완성)
    carouselInner.appendChild(carouselItem); // JS로 완성한 틀 html에 추가
  }
};

// Call getRecipesInfo to fetch data and render the carousel
getRecipesInfo();

////////////// 밑에 주석처리한 전체코드는 삭제필요 ////////////
//////////////////////////////////////////////////////
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
// const renderRecipeBoxes = () => {
//   const recipeContainer = document.querySelector('.recipe-container');
//   recipeContainer.innerHTML = ''; // 기존 박스 초기화

//   const containerWidth = recipeContainer.offsetWidth;
//   const boxWidth = 150 + 16; // 박스 너비 + 그리드 갭
//   const minBoxesPerRow = Math.floor(containerWidth / boxWidth);
//   const numberOfRows = 2;
//   const numberOfBoxes = minBoxesPerRow * numberOfRows;

//   for (let i = 1; i <= numberOfBoxes; i++) {
//     const box = document.createElement('div');
//     box.classList.add('box');
//     box.textContent = `Recipe${i}`;
//     recipeContainer.appendChild(box);
//   }
// };

// window.addEventListener('resize', renderRecipeBoxes);
// window.addEventListener('load', renderRecipeBoxes);

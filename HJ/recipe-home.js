const API_TYPE = 'public';
const APP_ID = 'eca0d2ce';
// const APP_KEY = config.apiKey;
const APP_KEY = '5c7761a24073cbd7ea715a9b3b7ae84a';

const BASE_URL = `https://api.edamam.com/api/recipes/v2?type=${API_TYPE}&app_id=${APP_ID}&app_key=${APP_KEY}`;

let url = '';

const container = document.querySelector('.container');
//pagination
const paginationContainer = document.querySelector('.pagination');
let currentPage = 1;
let itemsPerPage = 8;
let allRecipes = [];

const getRecipesByKeyword = () => {
  const keyword = document.getElementById('search-input').value;
  url = new URL(`${BASE_URL}&q=${keyword}&`);
  currentPage = 1; // 검색 시작하기전 currentPage를 1로 초기화
  // console.log(keyword);
  getRecipes();
};

const getRecipes = async () => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    allRecipes = data.hits;
    console.log(data);
    render(allRecipes, currentPage);

    if (data.count === 0) {
      container.classList.add('container-error');
      container.innerHTML = `<div class="error-message">No result for this search. </div>`;
      paginationContainer.style.display = 'none'; // Hide pagination
    } else {
      container.classList.remove('container-error');
      paginationContainer.style.display = 'flex'; // Show pagination if there are results
    }
  } catch (error) {
    pagination.style.display = 'none';
    container.classList.add('container-error');
    container.innerHTML = `<div class="error-message">Error fetching the recipes</div>`;
  }
};

const render = (recipes, page = 1) => {
  container.innerHTML = '';

  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const limitedRecipes = recipes.slice(start, end);

  limitedRecipes.forEach((recipe) => {
    const box = document.createElement('div');
    box.classList.add('box');

    // converting api values to strings
    const label = recipe.recipe.label;
    const image = recipe.recipe.image;
    const calories = recipe.recipe.calories.toFixed(0); // 칼로리 소수점 빼고 표시
    const ingredients = recipe.recipe.ingredients.length;
    const url = recipe.recipe.url;

    box.innerHTML = `
    <div>
    <a href="${url}" target="_blank" class="recipe-url">
    <div class="recipe-label"> ${label}</div>
    <br />
    <div>
    <img src="${image}" alt="${label}" style="max-width: 100%"</div>
    <br />
    <div class="recipe-info">
    <span class="calories"> Calories: <span class="calories-number">${calories} 
    </span></span> 
    <span class="ingredients"> Ingredients: 
    <span class="ingredients-number">${ingredients}
    </span></span>
    </div>
    </a>
    </div>
    `;

    container.appendChild(box);
  });

  renderPagination(recipes.length, page);
};

const renderPagination = (totalItems, currentPage) => {
  paginationContainer.innerHTML = ''; // Clear the existing pagination area
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Loop through each page to create pagination buttons
  for (let i = 1; i <= totalPages; i++) {
    const pageButton = document.createElement('button');
    pageButton.innerText = i;
    pageButton.classList.add('pagination-button');

    // Capture the current value of i
    ((pageNumber) => {
      pageButton.addEventListener('click', () => {
        render(allRecipes, pageNumber);
      });

      // Add 'active' class if the button corresponds to the current page
      if (pageNumber === currentPage) {
        pageButton.classList.add('active');
      }
    })(i); // Pass i as pageNumber to the IIFE

    paginationContainer.appendChild(pageButton);
  }
};

document.addEventListener('DOMContentLoaded', function () {
  const searchInput = document.getElementById('search-input');

  // Fetch and render initial recipes when the page loads
  url = new URL(`${BASE_URL}&q=salad`);
  getRecipes();

  searchInput.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
      getRecipesByKeyword();
      searchInput.value = '';
    }
  });
});

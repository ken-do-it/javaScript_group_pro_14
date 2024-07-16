const API_TYPE = 'public';
const APP_ID = 'eca0d2ce';
const APP_KEY = '5c7761a24073cbd7ea715a9b3b7ae84a';

const BASE_URL = `https://api.edamam.com/api/recipes/v2?type=${API_TYPE}&app_id=${APP_ID}&app_key=${APP_KEY}`;

let url = '';

const container = document.querySelector('.container');
const pagination = document.getElementsByClassName('pagination')[0]; // Access the first element

const getRecipesByKeyword = () => {
  const keyword = document.getElementById('search-input').value;
  url = new URL(`${BASE_URL}&q=${keyword}&`);
  // console.log(keyword);
  getRecipes();
};

const getRecipes = async () => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    render(data.hits);

    if (data.count === 0) {
      container.classList.add('container-error');
      container.innerHTML = `<div class="error-message">No result for this search. </div>`;
      pagination.style.display = 'none'; // Hide pagination
    } else {
      container.classList.remove('container-error');
      pagination.style.display = 'flex'; // Show pagination if there are results
    }
  } catch (error) {
    console.log('Error fetching the recipes');
    pagination.style.display = 'none';
    // container.classList.add('container-error');
    // container.innerHTML = `<div class="error-message">Error fetching the recipes</div>`;
  }
};

const render = (recipes) => {
  container.innerHTML = '';

  const limitedRecipes = recipes.slice(0, 12); // Limit to only 12 recipes are rendered (default value is 20)
  limitedRecipes.forEach((recipe, index) => {
    const box = document.createElement('div');
    box.classList.add('box');

    // converting api values to strings
    const label = recipe.recipe.label;
    const image = recipe.recipe.image;
    const calories = recipe.recipe.calories.toFixed(2); // 칼로리 소수점 2자리로 표시제한
    const ingredients = recipe.recipe.ingredients.length;

    box.innerHTML = `
    <div>
    <div>
    Recipe ${index + 1}</div>
    <br />
    <div class="recipe-label"> ${label}</div>
    <br />
    <div>
    <img src="${image}" alt="${label}" style="max-width: 100%"</div>
    <br />
    <div>Calories: ${calories}</div>
    <div>Ingredients: ${ingredients}</div>
    </div>
    `;

    container.appendChild(box);
  });
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

const APP_KEY = '5c7761a24073cbd7ea715a9b3b7ae84a';
const APP_ID = 'eca0d2ce';
const API_TYPE = 'public';
const BASE_URL = `https://api.edamam.com/api/recipes/v2?type=${API_TYPE}&app_id=${APP_ID}&app_key=${APP_KEY}`;

let url = '';

const getRecipesByKeyword = () => {
  const keyword = document.getElementById('search-input').value;
  url = new URL(`${BASE_URL}&q=${keyword}`);
  console.log(keyword);
  getRecipes();
};

const getRecipes = async () => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    render(data.hits);
  } catch (error) {
    console.log('Error fetching the recipes');
  }
};

const render = (recipes) => {
  const container = document.querySelector('.container');
  container.innerHTML = '';

  recipes.forEach((recipe, index) => {
    const box = document.createElement('div');
    box.classList.add('box');
    box.textContent = `Recipe ${index + 1}: ${recipe.recipe.label}`;
    container.appendChild(box);
  });
};

document.addEventListener('DOMContentLoaded', function () {
  const container = document.querySelector('.container');
  const searchInput = document.getElementById('search-input');

  // Create 12 boxes
  for (let i = 1; i <= 12; i++) {
    const box = document.createElement('div');
    box.classList.add('box');
    box.textContent = `Recipe ${i}`;
    container.appendChild(box);
  }

  searchInput.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
      getRecipesByKeyword();
      searchInput.value = '';
    }
  });
});

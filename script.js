const themeToggle = document.getElementById('theme-toggle');
const searchInput = document.getElementById('search-input');
const categoryFilter = document.getElementById('category-filter');
const sortSelect = document.getElementById('sort-select');
const recipesContainer = document.getElementById('recipes');
const recipeModal = document.getElementById('recipe-modal');
const noResults = document.getElementById('no-results');

let allMeals = [];
let likedMeals = new Set();

async function getRecipes() {
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput.value}`);
    const data = await res.json();
    
    allMeals = data.meals || [];

    applyFilters();
}


function renderRecipes(recipesToDisplay) {
    if (recipesToDisplay.length === 0) {
        recipesContainer.innerHTML = '';
        noResults.classList.remove('hidden');
        return;
    }
    
    noResults.classList.add('hidden');

    const htmlString = recipesToDisplay.map(meal => {
        
        const isLiked = likedMeals.has(meal.idMeal) ? 'liked' : '';
        const heartIcon = isLiked ? 'fa-solid' : 'fa-regular';

        return `
        <div class="card" onclick="openModal(event, '${meal.idMeal}')" style="cursor: pointer;">
            <div class="card-img-wrapper">
                <span class="category-badge">${meal.strCategory}</span>
                
                <button class="like-btn ${isLiked}" onclick="toggleLike('${meal.idMeal}')">
                    <i class="${heartIcon} fa-heart"></i>
                </button>
                
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}" loading="lazy">
            </div>
            
            <div class="card-body">
                <h3>${meal.strMeal}</h3>
            </div>
        </div>
        `;
    }).join('');

    recipesContainer.innerHTML = htmlString;
}

function applyFilters() {
    const query = searchInput.value.toLowerCase();
    const category = categoryFilter.value;
    const sortVal = sortSelect.value;

    let filteredMeals = allMeals.filter(meal => {
        const matchesName = meal.strMeal.toLowerCase().includes(query);
        const matchesCat = (category === 'All' || meal.strCategory === category);
        return matchesName && matchesCat;
    });

    if (sortVal === 'az') {
        filteredMeals.sort((a, b) => a.strMeal.localeCompare(b.strMeal));
    } else if (sortVal === 'za') {
        filteredMeals.sort((a, b) => b.strMeal.localeCompare(a.strMeal));
    }

    renderRecipes(filteredMeals);
}

window.openModal = function(event, mealId) {
    if (event.target.closest('.like-btn')) return;

    const meal = allMeals.find(m => m.idMeal === mealId);
    if (!meal) return;
    
    const indexes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
    
    const ingredientsHtml = indexes
        .map(i => {
            return {
                name: meal[`strIngredient${i}`], 
                measure: meal[`strMeasure${i}`]
            };
        })
        .filter(item => item.name && item.name.trim() !== '')
        .map(item => `<li><strong>${item.measure}</strong> ${item.name}</li>`) 
        .join('');

    document.getElementById('modal-body').innerHTML = `
        <div class="modal-grid">
            <img src="${meal.strMealThumb}" class="modal-img">
            <div class="modal-info">
                <h2>${meal.strMeal}</h2>
                <h4>Ingredients</h4>
                <ul>
                    ${ingredientsHtml}
                </ul>
                <h4>Instructions</h4>
                <p>${meal.strInstructions}</p>
            </div>
        </div>
    `;

    recipeModal.classList.remove('hidden');
};


window.toggleLike = function(mealId) {
    if (likedMeals.has(mealId)) {
        likedMeals.delete(mealId);
    } else {
        likedMeals.add(mealId); 
    }
    applyFilters();
};


searchInput.addEventListener('input', getRecipes);
categoryFilter.addEventListener('change', applyFilters);
sortSelect.addEventListener('change', applyFilters);


themeToggle.addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    document.documentElement.setAttribute('data-theme', isDark ? 'light' : 'dark');
    

    themeToggle.innerHTML = isDark ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
});


document.getElementById('close-modal').addEventListener('click', () => {
    recipeModal.classList.add('hidden');
});
recipeModal.addEventListener('click', (e) => {
    if (e.target === recipeModal) {
        recipeModal.classList.add('hidden');
    }
});

getRecipes();
// Get all elements from the HTML
const themeToggle = document.getElementById('theme-toggle');
const searchInput = document.getElementById('search-input');
const categoryFilter = document.getElementById('category-filter');
const sortSelect = document.getElementById('sort-select');
const recipesContainer = document.getElementById('recipes');
const recipeModal = document.getElementById('recipe-modal');
const noResults = document.getElementById('no-results');

// State variables to hold data
let allMeals = [];
let likedMeals = new Set(); // Set prevents duplicate hearts easily

// 1. Fetch Data
async function getRecipes() {
    // Fetch recipes matching the search input straight from the API
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput.value}`);
    const data = await res.json();
    
    // Save to our array (or empty Array if API returns null)
    allMeals = data.meals || [];
    
    // Update the screen with new data using our local HOF filters
    applyFilters();
}

// 2. Render App (Mapped dynamically without loops)
function renderRecipes(recipesToDisplay) {
    if (recipesToDisplay.length === 0) {
        recipesContainer.innerHTML = '';
        noResults.classList.remove('hidden');
        return;
    }
    
    noResults.classList.add('hidden');

    // Use .map() to loop over meals and return a long HTML string
    const htmlString = recipesToDisplay.map(meal => {
        
        // Find if this specific meal ID exists in our 'likedMeals' Set
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
    }).join(''); // .join('') turns our array of strings into one big string

    recipesContainer.innerHTML = htmlString;
}

// 3. Filtering and Sorting (Using only Array methods)
function applyFilters() {
    const query = searchInput.value.toLowerCase();
    const category = categoryFilter.value;
    const sortVal = sortSelect.value;

    // Filter using .filter()
    let filteredMeals = allMeals.filter(meal => {
        const matchesName = meal.strMeal.toLowerCase().includes(query);
        const matchesCat = (category === 'All' || meal.strCategory === category);
        return matchesName && matchesCat;
    });

    // Sort using .sort() method
    if (sortVal === 'az') {
        filteredMeals.sort((a, b) => a.strMeal.localeCompare(b.strMeal));
    } else if (sortVal === 'za') {
        filteredMeals.sort((a, b) => b.strMeal.localeCompare(a.strMeal));
    }

    renderRecipes(filteredMeals);
}

// 4. Modal Interactions
window.openModal = function(event, mealId) {
    // If the user clicked the Like button, do not open the modal!
    if (event.target.closest('.like-btn')) return;

    // Utilize .find() to grab the exact recipe object
    const meal = allMeals.find(m => m.idMeal === mealId);
    if (!meal) return;
    
    // We create a basic array of numbers 1-20 to get all possible ingredients.
    // This allows us to use map() instead of a 'for loop' to adhere to constraints.
    const indexes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
    
    const ingredientsHtml = indexes
        .map(i => {
            return {
                name: meal[`strIngredient${i}`], 
                measure: meal[`strMeasure${i}`]
            };
        })
        .filter(item => item.name && item.name.trim() !== '') // Drop the blank ones
        .map(item => `<li><strong>${item.measure}</strong> ${item.name}</li>`) // Wrap in HTML
        .join('');

    // Update modal body
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

    // Show the modal
    recipeModal.classList.remove('hidden');
};

// 5. User Interactive Functions
window.toggleLike = function(mealId) {
    if (likedMeals.has(mealId)) {
        likedMeals.delete(mealId); // Delete if already liked
    } else {
        likedMeals.add(mealId); // Save like
    }
    applyFilters(); // Re-render the visual changes immediately
};

// Listeners
searchInput.addEventListener('input', getRecipes); // Fetch on type
categoryFilter.addEventListener('change', applyFilters);
sortSelect.addEventListener('change', applyFilters);

// Theme Support
themeToggle.addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    document.documentElement.setAttribute('data-theme', isDark ? 'light' : 'dark');
    
    // Change moon/sun icon
    themeToggle.innerHTML = isDark ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
});

// Close Modals
document.getElementById('close-modal').addEventListener('click', () => {
    recipeModal.classList.add('hidden');
});
recipeModal.addEventListener('click', (e) => {
    if (e.target === recipeModal) {
        recipeModal.classList.add('hidden'); // Close if clicked on dim background
    }
});

// Run once when loaded
getRecipes();
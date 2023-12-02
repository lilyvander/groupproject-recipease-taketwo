const appId = 'dc36a5f3';
const appKey = 'f80e9e792751861c2b58f13cb2113115';

const searchInput = document.getElementById('recipeSearch');
const searchButton = document.getElementById('searchButton');
const recipeList = document.getElementById('recipeList');

searchButton.addEventListener('click', searchRecipes);

function searchRecipes() {
    const searchTerm = searchInput.value;
    if (searchTerm) {
        const apiEndpoint = `https://api.edamam.com/search?q=${searchTerm}&app_id=${appId}&app_key=${appKey}`;

        fetch(apiEndpoint)
            .then(function (response) {
                return response.json();
            })
            .then(function(data) {
                console.log(data.hits);
                displayRecipes(data.hits);
            })
            .catch(function(error) {
                console.error('Error fetching data:', error)
            });
    }
}

function displayRecipes(recipes) {
    recipeList.innerHTML = '';
    recipes.forEach((recipe, index) => {
        const recipeCard = document.createElement('div');
        recipeCard.classList.add('recipeCard');
        recipeCard.innerHTML = `
        <div class="recipeTop">
                <div class="recipe-image">
                    <img src="${recipe.recipe.image}" alt="${recipe.recipe.label}">
                </div>
                <div class="recipe-details">
                    <h3>${recipe.recipe.label}</h3>
                    <div class="recipe-cautions">${recipe.recipe.cautions}</div>
                    <a href="${recipe.recipe.url}" class="view-details">View Details</a>
                </div>
            </div>
            <div class="recipeBottom">
                <ul class="recipe-ingredients">
                    ${recipe.recipe.ingredientLines.map(ingredient => `<li>${ingredient}</li>`).join('')}
                </ul>
            </div>
        `;
        recipeList.appendChild(recipeCard);
    });
}



// Look up drink recipies info 

const drinkInput = document.querySelector('#drink-input');
const drinkSearchBtn = document.querySelector("#searchButtonDrinks");
const apiNinjas = '34OI8Z++sC2o2ypun3q94w==IYDU5y8iMC0HEDlA';
const apiOptions = {
  method: 'GET',
  headers: {'x-api-key' : '34OI8Z++sC2o2ypun3q94w==IYDU5y8iMC0HEDlA'}
}

searchDrinksAPI = function() {
    const drinkSearchInput = drinkInput.value;
    console.log(drinkSearchInput);
    const apiNinjasRecURL = `https://api.api-ninjas.com/v1/cocktail?name=${drinkSearchInput}`;

    fetch(apiNinjasRecURL, apiOptions)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data);

            if (Array.isArray(data) && data.length > 0) {
                const drinkInfo = data[0];
                const drinkName = drinkInfo.name;
                const drinkIngredients = drinkInfo.ingredients;
                const drinkInstructions = drinkInfo.instructions;

                console.log(drinkName);
                console.log(drinkIngredients);
                console.log(drinkInstructions);

                // Now you can use this information to dynamically create an HTML card
                // Call a function to display the drink card or do it directly here
                displayDrinksRecipes([drinkInfo]);
            } else {
                console.log('No data found for the given input.');
            }
        })
}

// Event to call drinks api on search button click 
drinkSearchBtn.addEventListener('click', searchDrinksAPI);

// Create a drink recipie div 
function displayDrinksRecipes(drinks) {
    drinkList.innerHTML = '';
    drinks.forEach((drink, index) => {
        const drinkCard = document.createElement('div');
        drinkCard.classList.add('drinkCard');
        drinkCard.innerHTML = `
            <div class="drinkTop">
                <div class='drink-emoji'></div>
                <div class='drink-details'>
                    <h3>${drink.name}</h3>
                </div>
            </div>
            <div class="drinkMiddle"> 
                <ul class="ingredients-list list-style-type-none">
                    ${drink.ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
                </ul>
            </div>
            <div class="drinkBottom">
                <p>${drink.instructions}</p>
            </div>
        `;
        drinkList.appendChild(drinkCard);
    });
}
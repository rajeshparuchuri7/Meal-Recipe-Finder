// ==============================
// DOM ELEMENTS
// ==============================

const mealsContainer = document.getElementById("mealsContainer");
const loader = document.getElementById("loader");
const noMeals = document.getElementById("noMeals");
const pageTitle = document.getElementById("pageTitle");


// ==============================
// URL PARAMETERS
// ==============================

const params = new URLSearchParams(window.location.search);

const search = params.get("search");
const category = params.get("category");


// ==============================
// PAGE LOAD
// ==============================

window.addEventListener("DOMContentLoaded", () => {

    if (search) {

        pageTitle.textContent = `"${search}" Recipes`;

        searchMeals(search);

    }

    else if (category) {

        pageTitle.textContent = `${category} Recipes`;

        loadCategoryMeals(category);

    }

    else {

        pageTitle.textContent = "Recipes";

        noMeals.style.display = "block";

    }

});


// ==============================
// SEARCH MEALS
// ==============================

async function searchMeals(keyword) {

    showLoader();

    try {

        const response = await fetch(
            `https://www.themealdb.com/api/json/v1/1/search.php?s=${keyword}`
        );

        const data = await response.json();

        hideLoader();

        displayMeals(data.meals);

    }

    catch (error) {

        console.error(error);

        hideLoader();

        showError();

    }

}


// ==============================
// CATEGORY MEALS
// ==============================

async function loadCategoryMeals(category) {

    showLoader();

    try {

        const response = await fetch(
            `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
        );

        const data = await response.json();

        hideLoader();

        displayMeals(data.meals);

    }

    catch (error) {

        console.error(error);

        hideLoader();

        showError();

    }

}


// ==============================
// DISPLAY MEALS
// ==============================

function displayMeals(meals) {

    mealsContainer.innerHTML = "";

    if (!meals || meals.length === 0) {

        noMeals.style.display = "block";

        return;

    }

    noMeals.style.display = "none";

    meals.forEach(meal => {

        mealsContainer.innerHTML += `

        <div class="meal-card">

            <img
                src="${meal.strMealThumb}"
                alt="${meal.strMeal}"
                loading="lazy">

            <h3>${meal.strMeal}</h3>

            <button onclick="openRecipe('${meal.idMeal}')">

                View Recipe

            </button>

        </div>

        `;

    });

}


// ==============================
// OPEN RECIPE
// ==============================

function openRecipe(id) {

    window.location.href = `recipe.html?id=${id}`;

}


// ==============================
// LOADER
// ==============================

function showLoader() {

    loader.style.display = "block";

    mealsContainer.innerHTML = "";

    noMeals.style.display = "none";

}

function hideLoader() {

    loader.style.display = "none";

}


// ==============================
// ERROR
// ==============================

function showError() {

    mealsContainer.innerHTML = `

        <h2 style="text-align:center;color:red;">

            Something went wrong.

            <br><br>

            Please try again later.

        </h2>

    `;

}
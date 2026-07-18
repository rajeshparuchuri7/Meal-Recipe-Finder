// ==============================
// DOM ELEMENTS
// ==============================

const recipeDetails = document.getElementById("recipeDetails");


// ==============================
// GET RECIPE ID FROM URL
// ==============================

const params = new URLSearchParams(window.location.search);
const mealId = params.get("id");


// ==============================
// PAGE LOAD
// ==============================

document.addEventListener("DOMContentLoaded", () => {

    if (!mealId) {

        recipeDetails.innerHTML = `
            <h2 style="text-align:center;">
                No recipe selected.
            </h2>
        `;

        return;

    }

    loadRecipe();

});


// ==============================
// LOAD RECIPE
// ==============================

async function loadRecipe() {

    recipeDetails.innerHTML = `
        <h2 style="text-align:center;">
            Loading recipe...
        </h2>
    `;

    try {

        const response = await fetch(
            `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
        );

        const data = await response.json();

        if (!data.meals) {

            recipeDetails.innerHTML = `
                <h2 style="text-align:center;">
                    Recipe not found.
                </h2>
            `;

            return;

        }

        displayRecipe(data.meals[0]);

    }

    catch (error) {

        console.error(error);

        recipeDetails.innerHTML = `
            <h2 style="text-align:center;color:red;">
                Unable to load recipe.
            </h2>
        `;

    }

}


// ==============================
// DISPLAY RECIPE
// ==============================

function displayRecipe(meal) {

    let ingredients = "";

    for (let i = 1; i <= 20; i++) {

        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];

        if (ingredient && ingredient.trim() !== "") {

            ingredients += `
                <li>
                    ${ingredient} ${measure ? `- ${measure}` : ""}
                </li>
            `;

        }

    }

    recipeDetails.innerHTML = `

        <div class="recipe-card">

            <h1>${meal.strMeal}</h1>

            <img
                src="${meal.strMealThumb}"
                alt="${meal.strMeal}"
                loading="lazy">

            <p><strong>Category:</strong> ${meal.strCategory}</p>

            <p><strong>Cuisine:</strong> ${meal.strArea}</p>

            <h2>Ingredients</h2>

            <ul>
                ${ingredients}
            </ul>

            <h2>Instructions</h2>

            <p>${meal.strInstructions}</p>

            <a
                class="youtube"
                href="${meal.strYoutube}"
                target="_blank"
                rel="noopener noreferrer">

                ▶ Watch on YouTube

            </a>

        </div>

    `;

}
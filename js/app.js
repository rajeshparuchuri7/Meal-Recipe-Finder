// ==============================
// DOM ELEMENTS
// ==============================

const categoryContainer = document.getElementById("categorycontainer");

const menuBtn = document.getElementById("btn");
const closeBtn = document.getElementById("closebutton");
const menuList = document.getElementById("menu-list");

const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");


// ==============================
// LOAD CATEGORIES
// ==============================

async function loadCategories() {

    try {

        const response = await fetch(
            "https://www.themealdb.com/api/json/v1/1/categories.php"
        );

        const data = await response.json();

        displayCategories(data.categories);

    } catch (error) {

        console.error("Error loading categories:", error);

        categoryContainer.innerHTML = `
            <h2 style="text-align:center;color:red;">
                Unable to load categories.
            </h2>
        `;

    }

}

loadCategories();


// ==============================
// DISPLAY CATEGORY CARDS
// ==============================

function displayCategories(categories) {

    categoryContainer.innerHTML = "";

    categories.forEach(category => {

        categoryContainer.innerHTML += `

            <div class="category_cards"
                 data-category="${category.strCategory}">

                <img
                    src="${category.strCategoryThumb}"
                    alt="${category.strCategory}">

                <p>${category.strCategory}</p>

            </div>

        `;

    });

}


// ==============================
// CATEGORY CARD CLICK
// ==============================

categoryContainer.addEventListener("click", (event) => {

    const card = event.target.closest(".category_cards");

    if (!card) return;

    const category = card.dataset.category;

    window.location.href =
        `results.html?category=${encodeURIComponent(category)}`;

});


// ==============================
// SIDEBAR CATEGORY CLICK
// ==============================

menuList.addEventListener("click", (event) => {

    if (event.target.tagName !== "LI") return;

    const category = event.target.dataset.category;

    menuList.style.right = "-320px";

    window.location.href =
        `results.html?category=${encodeURIComponent(category)}`;

});


// ==============================
// SEARCH FUNCTION
// ==============================

function searchMeal() {

    const keyword = searchInput.value.trim();

    if (keyword === "") {

        alert("Please enter a meal name.");

        searchInput.focus();

        return;

    }

    window.location.href =
        `results.html?search=${encodeURIComponent(keyword)}`;

}


// ==============================
// SEARCH EVENTS
// ==============================

searchBtn.addEventListener("click", searchMeal);

searchInput.addEventListener("keypress", (event) => {

    if (event.key === "Enter") {

        searchMeal();

    }

});


// ==============================
// OPEN SIDEBAR
// ==============================

menuBtn.addEventListener("click", () => {

    menuList.style.right = "0";

});


// ==============================
// CLOSE SIDEBAR
// ==============================

closeBtn.addEventListener("click", () => {

    menuList.style.right = "-320px";

});


// ==============================
// CLOSE SIDEBAR WHEN CLICKING OUTSIDE
// ==============================

document.addEventListener("click", (event) => {

    if (
        !menuList.contains(event.target) &&
        !menuBtn.contains(event.target)
    ) {

        menuList.style.right = "-320px";

    }

});





















// async function data() {
//     let apidata = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
//     // console.log(apidata);
//     let {categories} = await apidata.json()
//     console.log(categories);

    
//     let container = document.getElementById('categorycontainer');
//     categories.map(items => {
//       container.innerHTML += `
//       <div class="category_cards">
//       <p class="meal_name">${items.strCategory}</p>
//       <img src = ${items.strCategoryThumb} alt = ${items.strCategory}</img>
//       </div>
//       `
//     })
  
//     const menubtn = document.getElementById('btn');
//     const closebtn = document.getElementById('closebutton')
//       const menulist = document.getElementById('menu-list');
//       const categorycontainer = document.getElementById('categories');
//       const  mealscontainer =  document.getElementById('mealscontainer');

// function setupMenu() {
//       menubtn.addEventListener('click',() => {
//         menulist.style.display = menulist.style.display === 'block' ? 'none' : 'block';
//       });
//       closebtn.addEventListener('click',() =>{
//         menulist.style.display = menulist.style.display === 'none'? 'block' : 'none' ;
//       })

//       menulist.addEventListener('click' , (onclick) => {
//         if (onclick.target.tagName === 'LI') {
//           const selectedCategory = onclick.target.getAttribute('data-category');
//           MealsCategory(selectedCategory);
//              menulist.style.display = 'none';
//              categorycontainer.style.display ='none'; 
//              mealscontainer.style.display ='flex';
//          }
//       })
//     }
//     setupMenu()
// }
// data()

// async function MealsCategory(category) {
//   const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
//   const data = await response.json();
//   console.log(data.meals);
//   displayMeals(data.meals);
// }

// function displayMeals(meals) {
//   const mealscontainer = document.getElementById('mealscontainer');

//   mealscontainer.innerHTML = meals.map(meal => {
//     console.log(meals);
    
//     return `
//       <div class="meal-card">
//           <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
//           <p>${meal.strMeal}</p>
//       </div>
//   `

// })
//   console.log(mealscontainer);
 
  
// }


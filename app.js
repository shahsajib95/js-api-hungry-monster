const meals= document.getElementById("meals");
const mealsData= document.getElementById("mealDetails");
const base = `https://www.themealdb.com/api/json/v1/1`
const loading = `<div class="spinner-border" role="status">
    	            <span class="sr-only">Loading...</span>
                </div>`
const getSearch = () => {
  const search = document.getElementById("search").value;
  fetchFood(search);
};
const fetchFood = (search) => {
  const searchData = search ? search : "Beef";
  
  mealDetails.innerHTML = "";
  meals.innerHTML = `${loading}`;
  fetch(`${base}/search.php?s=${searchData}`)
    .then((res) => res.json())
    .then((data) => {
        meals.innerHTML = "";
        updateUi(data);
    });
};
fetchFood()
const updateUi = (data) => {
  const meals = document.getElementById("meals");
  meals.innerHTML = "";
  if (!data.meals) {
    meals.innerHTML += `<div> <i class="fas fa-eye-slash"></i> <p>No food found</p></div>`;
  } else {
    data.meals.map(
      (meal) =>
        (meals.innerHTML += `<div class="col-md-3">
                    <span onclick='fetchFoodDetails(${meal.idMeal})'>
                        <div class="card my-5">
                            <img class="card-img-top" src=${meal.strMealThumb}  alt="Card image cap">
                            <div class="card-body bg-light">
                                <p class="card-text text-center font-weight-bold">${meal.strMeal}</p>
                            </div>
                        </div>
                    </span>
                </div>`)
    );
  }
};

const fetchFoodDetails = (id) => {
    meals.innerHTML = `${loading}`;
    fetch(`${base}/lookup.php?i=${id}`)
    .then((res) => res.json())
    .then((data) => {
        updateDetailsUi(data);
        meals.innerHTML = '';
    });
};

const updateDetailsUi = (data) => {
  mealsData.innerHTML = "";

  var meal = data.meals[0];

  let index = 1;
  let ingredientArray = [];
  while (meal["strIngredient" + index]) {
    ingredientArray.push({
      name: meal["strIngredient" + index],
      amount: meal["strMeasure" + index],
    });
    index++;
  }
    mealsData.innerHTML += `<div class="mb-5">
        <img class="card-img-top w-50" src=${ meal.strMealThumb} alt="Card image cap">
        <h2 class="my-4 font-weight-bold">${meal.strMeal}</h2>
        <h4 class="font-weight-bold mb-3">Ingredients</h4>
           ${ingredientArray.map(
               (ingredient) =>
                 `<p class="text-muted">
                <i class="fas fa-check-square"></i>
                <span class="ml-2">${ingredient.amount} of ${ingredient.name}</span>
            </p>`
             )
             .join("")}
    </div>`;
};

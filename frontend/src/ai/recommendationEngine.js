// ============================================================
// VITAL AI RECOMMENDATION ENGINE
// ============================================================
// Personalized Indian food recommendations based on:
// - User goal
// - Diet preference
// - Current calories
// - Protein
// - Carbohydrates
// - Meal time
// - Daily recommendation history
//
// Nutrition values are approximate serving estimates.
// They are intended for recommendation/demo purposes.
// ============================================================


// ============================================================
// INDIAN FOOD DATABASE
// ============================================================

export const indianFoods  = [

  // ==========================================================
  // VEGETARIAN BREAKFAST
  // ==========================================================

  {
    name: "Moong Dal Chilla",
    meal: "Breakfast",
    calories: 220,
    protein: 12,
    carbs: 28,
    fat: 6,
    type: "high-protein",
    diet: "vegetarian",
  },

  {
    name: "Besan Chilla",
    meal: "Breakfast",
    calories: 230,
    protein: 11,
    carbs: 30,
    fat: 7,
    type: "high-protein",
    diet: "vegetarian",
  },

  {
    name: "Sprouts Chilla",
    meal: "Breakfast",
    calories: 210,
    protein: 13,
    carbs: 26,
    fat: 5,
    type: "high-protein",
    diet: "vegetarian",
  },

  {
    name: "Paneer Sandwich",
    meal: "Breakfast",
    calories: 300,
    protein: 15,
    carbs: 30,
    fat: 12,
    type: "high-protein",
    diet: "vegetarian",
  },

  {
    name: "Paneer Paratha with Curd",
    meal: "Breakfast",
    calories: 420,
    protein: 18,
    carbs: 45,
    fat: 18,
    type: "high-energy",
    diet: "vegetarian",
  },

  {
    name: "Vegetable Poha",
    meal: "Breakfast",
    calories: 220,
    protein: 5,
    carbs: 35,
    fat: 7,
    type: "light",
    diet: "vegetarian",
  },

  {
    name: "Peanut Poha",
    meal: "Breakfast",
    calories: 280,
    protein: 8,
    carbs: 38,
    fat: 10,
    type: "balanced",
    diet: "vegetarian",
  },

  {
    name: "Idli with Sambar",
    meal: "Breakfast",
    calories: 250,
    protein: 9,
    carbs: 42,
    fat: 4,
    type: "balanced",
    diet: "vegetarian",
  },

  {
    name: "Masala Dosa",
    meal: "Breakfast",
    calories: 360,
    protein: 8,
    carbs: 55,
    fat: 12,
    type: "high-carb",
    diet: "vegetarian",
  },

  {
    name: "Ragi Dosa",
    meal: "Breakfast",
    calories: 280,
    protein: 8,
    carbs: 42,
    fat: 7,
    type: "balanced",
    diet: "vegetarian",
  },

  {
    name: "Vegetable Upma",
    meal: "Breakfast",
    calories: 230,
    protein: 6,
    carbs: 34,
    fat: 8,
    type: "light",
    diet: "vegetarian",
  },

  {
    name: "Ragi Upma",
    meal: "Breakfast",
    calories: 250,
    protein: 7,
    carbs: 38,
    fat: 7,
    type: "balanced",
    diet: "vegetarian",
  },

  {
    name: "Vegetable Uttapam",
    meal: "Breakfast",
    calories: 280,
    protein: 8,
    carbs: 45,
    fat: 7,
    type: "balanced",
    diet: "vegetarian",
  },

  {
    name: "Dhokla",
    meal: "Breakfast",
    calories: 180,
    protein: 8,
    carbs: 28,
    fat: 4,
    type: "light",
    diet: "vegetarian",
  },

  {
    name: "Khandvi",
    meal: "Breakfast",
    calories: 190,
    protein: 7,
    carbs: 25,
    fat: 7,
    type: "light",
    diet: "vegetarian",
  },

  {
    name: "Vegetable Thepla with Curd",
    meal: "Breakfast",
    calories: 320,
    protein: 10,
    carbs: 42,
    fat: 12,
    type: "balanced",
    diet: "vegetarian",
  },

  {
    name: "Handvo",
    meal: "Breakfast",
    calories: 300,
    protein: 10,
    carbs: 38,
    fat: 10,
    type: "balanced",
    diet: "vegetarian",
  },

  {
    name: "Sabudana Khichdi",
    meal: "Breakfast",
    calories: 330,
    protein: 6,
    carbs: 52,
    fat: 11,
    type: "high-carb",
    diet: "vegetarian",
  },

  {
    name: "Vegetable Sevai Upma",
    meal: "Breakfast",
    calories: 250,
    protein: 7,
    carbs: 40,
    fat: 7,
    type: "balanced",
    diet: "vegetarian",
  },


  // ==========================================================
  // EGGETARIAN BREAKFAST
  // ==========================================================

  {
    name: "Masala Omelette",
    meal: "Breakfast",
    calories: 250,
    protein: 16,
    carbs: 5,
    fat: 18,
    type: "high-protein",
    diet: "eggetarian",
  },

  {
    name: "Boiled Eggs with Toast",
    meal: "Breakfast",
    calories: 280,
    protein: 16,
    carbs: 25,
    fat: 12,
    type: "high-protein",
    diet: "eggetarian",
  },

  {
    name: "Egg Bhurji Toast",
    meal: "Breakfast",
    calories: 300,
    protein: 18,
    carbs: 27,
    fat: 13,
    type: "high-protein",
    diet: "eggetarian",
  },

  {
    name: "Egg Paratha",
    meal: "Breakfast",
    calories: 380,
    protein: 17,
    carbs: 42,
    fat: 16,
    type: "high-energy",
    diet: "eggetarian",
  },

  {
    name: "Egg Sandwich",
    meal: "Breakfast",
    calories: 320,
    protein: 19,
    carbs: 32,
    fat: 12,
    type: "high-protein",
    diet: "eggetarian",
  },


  // ==========================================================
  // NON-VEGETARIAN BREAKFAST
  // ==========================================================

  {
    name: "Chicken Sandwich",
    meal: "Breakfast",
    calories: 350,
    protein: 25,
    carbs: 35,
    fat: 10,
    type: "high-protein",
    diet: "non-vegetarian",
  },

  {
    name: "Chicken Omelette",
    meal: "Breakfast",
    calories: 320,
    protein: 28,
    carbs: 6,
    fat: 19,
    type: "high-protein",
    diet: "non-vegetarian",
  },

  {
    name: "Chicken Wrap",
    meal: "Breakfast",
    calories: 360,
    protein: 27,
    carbs: 35,
    fat: 12,
    type: "high-protein",
    diet: "non-vegetarian",
  },


  // ==========================================================
  // VEGETARIAN LUNCH / DINNER
  // ==========================================================

  {
    name: "Dal Rice",
    meal: "Lunch/Dinner",
    calories: 350,
    protein: 12,
    carbs: 58,
    fat: 7,
    type: "balanced",
    diet: "vegetarian",
  },

  {
    name: "Roti with Dal",
    meal: "Lunch/Dinner",
    calories: 320,
    protein: 13,
    carbs: 48,
    fat: 7,
    type: "balanced",
    diet: "vegetarian",
  },

  {
    name: "Paneer Bhurji with Roti",
    meal: "Lunch/Dinner",
    calories: 400,
    protein: 22,
    carbs: 35,
    fat: 17,
    type: "high-protein",
    diet: "vegetarian",
  },

  {
    name: "Palak Paneer with Roti",
    meal: "Lunch/Dinner",
    calories: 420,
    protein: 20,
    carbs: 35,
    fat: 19,
    type: "high-protein",
    diet: "vegetarian",
  },

  {
    name: "Paneer Tikka with Roti",
    meal: "Lunch/Dinner",
    calories: 400,
    protein: 25,
    carbs: 30,
    fat: 16,
    type: "high-protein",
    diet: "vegetarian",
  },

  {
    name: "Soya Chunk Curry with Roti",
    meal: "Lunch/Dinner",
    calories: 390,
    protein: 28,
    carbs: 38,
    fat: 10,
    type: "high-protein",
    diet: "vegetarian",
  },

  {
    name: "Soya Keema with Roti",
    meal: "Lunch/Dinner",
    calories: 380,
    protein: 27,
    carbs: 40,
    fat: 9,
    type: "high-protein",
    diet: "vegetarian",
  },

  {
    name: "Chole with Roti",
    meal: "Lunch/Dinner",
    calories: 360,
    protein: 15,
    carbs: 52,
    fat: 9,
    type: "high-protein",
    diet: "vegetarian",
  },

  {
    name: "Rajma Rice",
    meal: "Lunch/Dinner",
    calories: 390,
    protein: 14,
    carbs: 65,
    fat: 6,
    type: "high-carb",
    diet: "vegetarian",
  },

  {
    name: "Rajma Roti",
    meal: "Lunch/Dinner",
    calories: 350,
    protein: 15,
    carbs: 50,
    fat: 7,
    type: "balanced",
    diet: "vegetarian",
  },

  {
    name: "Chole Rice",
    meal: "Lunch/Dinner",
    calories: 400,
    protein: 14,
    carbs: 65,
    fat: 8,
    type: "high-carb",
    diet: "vegetarian",
  },

  {
    name: "Dal Khichdi",
    meal: "Lunch/Dinner",
    calories: 330,
    protein: 12,
    carbs: 50,
    fat: 8,
    type: "balanced",
    diet: "vegetarian",
  },

  {
    name: "Moong Dal Khichdi",
    meal: "Lunch/Dinner",
    calories: 300,
    protein: 13,
    carbs: 46,
    fat: 6,
    type: "balanced",
    diet: "vegetarian",
  },

  {
    name: "Vegetable Pulao with Raita",
    meal: "Lunch/Dinner",
    calories: 380,
    protein: 10,
    carbs: 55,
    fat: 12,
    type: "balanced",
    diet: "vegetarian",
  },

  {
    name: "Vegetable Biryani with Raita",
    meal: "Lunch/Dinner",
    calories: 420,
    protein: 10,
    carbs: 62,
    fat: 13,
    type: "high-carb",
    diet: "vegetarian",
  },

  {
    name: "Tofu Bhurji with Roti",
    meal: "Lunch/Dinner",
    calories: 360,
    protein: 22,
    carbs: 34,
    fat: 14,
    type: "high-protein",
    diet: "vegetarian",
  },

  {
    name: "Tofu Tikka with Roti",
    meal: "Lunch/Dinner",
    calories: 370,
    protein: 24,
    carbs: 32,
    fat: 13,
    type: "high-protein",
    diet: "vegetarian",
  },

  {
    name: "Mixed Dal with Roti",
    meal: "Lunch/Dinner",
    calories: 340,
    protein: 16,
    carbs: 48,
    fat: 7,
    type: "high-protein",
    diet: "vegetarian",
  },

  {
    name: "Palak Dal with Roti",
    meal: "Lunch/Dinner",
    calories: 330,
    protein: 15,
    carbs: 46,
    fat: 7,
    type: "balanced",
    diet: "vegetarian",
  },

  {
    name: "Vegetable Roti Roll",
    meal: "Lunch/Dinner",
    calories: 300,
    protein: 8,
    carbs: 42,
    fat: 10,
    type: "light",
    diet: "vegetarian",
  },

  {
    name: "Curd Rice",
    meal: "Lunch/Dinner",
    calories: 300,
    protein: 9,
    carbs: 48,
    fat: 8,
    type: "light",
    diet: "vegetarian",
  },


  // ==========================================================
  // EGGETARIAN LUNCH / DINNER
  // ==========================================================

  {
    name: "Egg Bhurji with Roti",
    meal: "Lunch/Dinner",
    calories: 380,
    protein: 20,
    carbs: 35,
    fat: 16,
    type: "high-protein",
    diet: "eggetarian",
  },

  {
    name: "Egg Curry with Roti",
    meal: "Lunch/Dinner",
    calories: 400,
    protein: 21,
    carbs: 36,
    fat: 17,
    type: "high-protein",
    diet: "eggetarian",
  },

  {
    name: "Egg Rice",
    meal: "Lunch/Dinner",
    calories: 420,
    protein: 18,
    carbs: 55,
    fat: 12,
    type: "balanced",
    diet: "eggetarian",
  },

  {
    name: "Egg Biryani",
    meal: "Lunch/Dinner",
    calories: 450,
    protein: 20,
    carbs: 60,
    fat: 15,
    type: "high-energy",
    diet: "eggetarian",
  },

  {
    name: "Egg Roll",
    meal: "Lunch/Dinner",
    calories: 380,
    protein: 19,
    carbs: 40,
    fat: 14,
    type: "balanced",
    diet: "eggetarian",
  },


  // ==========================================================
  // NON-VEGETARIAN LUNCH / DINNER
  // ==========================================================

  {
    name: "Chicken Tikka with Roti",
    meal: "Lunch/Dinner",
    calories: 420,
    protein: 35,
    carbs: 30,
    fat: 15,
    type: "high-protein",
    diet: "non-vegetarian",
  },

  {
    name: "Chicken Curry with Roti",
    meal: "Lunch/Dinner",
    calories: 450,
    protein: 32,
    carbs: 35,
    fat: 19,
    type: "balanced",
    diet: "non-vegetarian",
  },

  {
    name: "Chicken Rice Bowl",
    meal: "Lunch/Dinner",
    calories: 450,
    protein: 32,
    carbs: 55,
    fat: 10,
    type: "balanced",
    diet: "non-vegetarian",
  },

  {
    name: "Chicken Biryani",
    meal: "Lunch/Dinner",
    calories: 520,
    protein: 30,
    carbs: 65,
    fat: 18,
    type: "high-energy",
    diet: "non-vegetarian",
  },

  {
    name: "Chicken Keema with Roti",
    meal: "Lunch/Dinner",
    calories: 430,
    protein: 34,
    carbs: 32,
    fat: 17,
    type: "high-protein",
    diet: "non-vegetarian",
  },

  {
    name: "Grilled Chicken with Roti",
    meal: "Lunch/Dinner",
    calories: 410,
    protein: 38,
    carbs: 28,
    fat: 13,
    type: "high-protein",
    diet: "non-vegetarian",
  },

  {
    name: "Chicken Tandoori with Roti",
    meal: "Lunch/Dinner",
    calories: 400,
    protein: 36,
    carbs: 28,
    fat: 13,
    type: "high-protein",
    diet: "non-vegetarian",
  },

  {
    name: "Fish Curry with Rice",
    meal: "Lunch/Dinner",
    calories: 430,
    protein: 28,
    carbs: 50,
    fat: 13,
    type: "balanced",
    diet: "non-vegetarian",
  },

  {
    name: "Grilled Fish with Roti",
    meal: "Lunch/Dinner",
    calories: 400,
    protein: 32,
    carbs: 30,
    fat: 14,
    type: "high-protein",
    diet: "non-vegetarian",
  },

  {
    name: "Fish Tikka with Roti",
    meal: "Lunch/Dinner",
    calories: 390,
    protein: 31,
    carbs: 28,
    fat: 13,
    type: "high-protein",
    diet: "non-vegetarian",
  },


  // ==========================================================
  // VEGETARIAN SNACKS
  // ==========================================================

  {
    name: "Sprouts Chaat",
    meal: "Snack",
    calories: 180,
    protein: 10,
    carbs: 25,
    fat: 4,
    type: "high-protein",
    diet: "vegetarian",
  },

  {
    name: "Moong Sprouts Salad",
    meal: "Snack",
    calories: 170,
    protein: 11,
    carbs: 24,
    fat: 3,
    type: "high-protein",
    diet: "vegetarian",
  },

  {
    name: "Chana Chaat",
    meal: "Snack",
    calories: 220,
    protein: 11,
    carbs: 32,
    fat: 5,
    type: "high-protein",
    diet: "vegetarian",
  },

  {
    name: "Roasted Chana",
    meal: "Snack",
    calories: 170,
    protein: 9,
    carbs: 27,
    fat: 3,
    type: "high-protein",
    diet: "vegetarian",
  },

  {
    name: "Peanut Chaat",
    meal: "Snack",
    calories: 220,
    protein: 9,
    carbs: 15,
    fat: 14,
    type: "balanced",
    diet: "vegetarian",
  },

  {
    name: "Fruit and Curd Bowl",
    meal: "Snack",
    calories: 180,
    protein: 8,
    carbs: 28,
    fat: 4,
    type: "light",
    diet: "vegetarian",
  },

  {
    name: "Greek Yogurt with Fruit",
    meal: "Snack",
    calories: 190,
    protein: 12,
    carbs: 24,
    fat: 4,
    type: "high-protein",
    diet: "vegetarian",
  },

  {
    name: "Paneer Tikka",
    meal: "Snack",
    calories: 250,
    protein: 18,
    carbs: 8,
    fat: 17,
    type: "high-protein",
    diet: "vegetarian",
  },

  {
    name: "Tofu Tikka",
    meal: "Snack",
    calories: 210,
    protein: 17,
    carbs: 9,
    fat: 12,
    type: "high-protein",
    diet: "vegetarian",
  },

  {
    name: "Makhana Roasted",
    meal: "Snack",
    calories: 150,
    protein: 5,
    carbs: 20,
    fat: 5,
    type: "light",
    diet: "vegetarian",
  },

  {
    name: "Peanut Sundal",
    meal: "Snack",
    calories: 230,
    protein: 10,
    carbs: 20,
    fat: 13,
    type: "balanced",
    diet: "vegetarian",
  },


  // ==========================================================
  // EGGETARIAN SNACKS
  // ==========================================================

  {
    name: "Boiled Eggs",
    meal: "Snack",
    calories: 155,
    protein: 13,
    carbs: 1,
    fat: 11,
    type: "high-protein",
    diet: "eggetarian",
  },

  {
    name: "Egg Chaat",
    meal: "Snack",
    calories: 180,
    protein: 14,
    carbs: 5,
    fat: 11,
    type: "high-protein",
    diet: "eggetarian",
  },

  {
    name: "Egg Sandwich",
    meal: "Snack",
    calories: 300,
    protein: 18,
    carbs: 30,
    fat: 12,
    type: "high-protein",
    diet: "eggetarian",
  },


  // ==========================================================
  // NON-VEGETARIAN SNACKS
  // ==========================================================

  {
    name: "Chicken Salad",
    meal: "Snack",
    calories: 250,
    protein: 28,
    carbs: 12,
    fat: 10,
    type: "high-protein",
    diet: "non-vegetarian",
  },

  {
    name: "Chicken Tikka",
    meal: "Snack",
    calories: 260,
    protein: 30,
    carbs: 6,
    fat: 13,
    type: "high-protein",
    diet: "non-vegetarian",
  },

  {
    name: "Chicken Seekh Kebab",
    meal: "Snack",
    calories: 280,
    protein: 27,
    carbs: 7,
    fat: 17,
    type: "high-protein",
    diet: "non-vegetarian",
  },

  {
    name: "Fish Tikka",
    meal: "Snack",
    calories: 230,
    protein: 27,
    carbs: 5,
    fat: 11,
    type: "high-protein",
    diet: "non-vegetarian",
  },


  // ==========================================================
  // EXTRA LIGHT OPTIONS
  // ==========================================================

  {
    name: "Vegetable Soup",
    meal: "Snack",
    calories: 120,
    protein: 4,
    carbs: 18,
    fat: 3,
    type: "light",
    diet: "vegetarian",
  },

  {
    name: "Tomato Soup",
    meal: "Snack",
    calories: 100,
    protein: 3,
    carbs: 16,
    fat: 2,
    type: "light",
    diet: "vegetarian",
  },

  {
    name: "Mixed Vegetable Salad",
    meal: "Snack",
    calories: 130,
    protein: 4,
    carbs: 20,
    fat: 4,
    type: "light",
    diet: "vegetarian",
  },
];


// ============================================================
// INDIAN DRINKS
// ============================================================

export const indianDrinks = [

  {
    name: "Buttermilk",
    calories: 60,
    type: "hydration",
  },

  {
    name: "Coconut Water",
    calories: 45,
    type: "hydration",
  },

  {
    name: "Lemon Water",
    calories: 20,
    type: "hydration",
  },

  {
    name: "Mint Lemon Water",
    calories: 25,
    type: "hydration",
  },

  {
    name: "Jeera Water",
    calories: 10,
    type: "hydration",
  },

  {
    name: "Fresh Orange Juice",
    calories: 110,
    type: "drink",
  },

  {
    name: "Unsweetened Lassi",
    calories: 100,
    type: "hydration",
  },
];


// ============================================================
// EXERCISES
// ============================================================

export const exercises = [

  {
    name: "Brisk Walking",
    duration: 30,
    type: "cardio",
  },

  {
    name: "Cycling",
    duration: 30,
    type: "cardio",
  },

  {
    name: "Yoga",
    duration: 30,
    type: "flexibility",
  },

  {
    name: "Bodyweight Workout",
    duration: 20,
    type: "strength",
  },

  {
    name: "Light Jogging",
    duration: 25,
    type: "cardio",
  },

  {
    name: "Home Workout",
    duration: 25,
    type: "strength",
  },

  {
    name: "Stretching",
    duration: 15,
    type: "flexibility",
  },

  {
    name: "Dance Workout",
    duration: 30,
    type: "cardio",
  },
];


// ============================================================
// LOCAL DATE
// ============================================================

function getLocalDateKey(date = new Date()) {

  const year = date.getFullYear();

  const month = String(
    date.getMonth() + 1
  ).padStart(2, "0");

  const day = String(
    date.getDate()
  ).padStart(2, "0");

  return `${year}-${month}-${day}`;
}


// ============================================================
// SIMPLE HASH
// ============================================================
// Used to make the daily choice stable.
// Same day + same conditions = same recommendation.
// ============================================================

function createHash(text) {

  let hash = 0;

  for (let i = 0; i < text.length; i++) {

    hash =
      (hash << 5) -
      hash +
      text.charCodeAt(i);

    hash |= 0;
  }

  return Math.abs(hash);
}


// ============================================================
// DIET FILTER
// ============================================================

// ============================================================
// DIET FILTER
// ============================================================

function getAllowedFoods(diet) {

  if (diet === "vegetarian") {
    return indianFoods.filter(
      food => food.diet === "vegetarian"
    );
  }

  if (diet === "eggetarian") {
    return indianFoods.filter(
      food =>
        food.diet === "vegetarian" ||
        food.diet === "eggetarian"
    );
  }

  if (diet === "non-vegetarian") {
    return indianFoods.filter(
      food =>
        food.diet === "vegetarian" ||
        food.diet === "eggetarian" ||
        food.diet === "non-vegetarian"
    );
  }

  return indianFoods.filter(
    food => food.diet === "vegetarian"
  );
}


// ============================================================
// PRIORITIZE DIET-SPECIFIC FOODS
// ============================================================

function prioritizeDietFoods(candidates, diet) {

  if (!candidates || candidates.length === 0) {
    return [];
  }

  // Vegetarian = vegetarian only
  if (diet === "vegetarian") {
    return candidates.filter(
      food => food.diet === "vegetarian"
    );
  }

  // Eggetarian = prefer egg foods
  if (diet === "eggetarian") {

    const eggFoods = candidates.filter(
      food => food.diet === "eggetarian"
    );

    if (eggFoods.length > 0) {
      return eggFoods;
    }

    return candidates;
  }

  // Non-vegetarian = strongly prefer chicken/fish/etc.
  if (diet === "non-vegetarian") {

    const nonVegFoods = candidates.filter(
      food => food.diet === "non-vegetarian"
    );

    if (nonVegFoods.length > 0) {
      return nonVegFoods;
    }

    return candidates;
  }

  return candidates;
}


// ============================================================
// MEAL TIME
// ============================================================

export function getCurrentMeal() {

  const hour = new Date().getHours();

  if (hour >= 5 && hour < 11) {
    return "Breakfast";
  }

  if (hour >= 11 && hour < 16) {
    return "Lunch";
  }

  if (hour >= 16 && hour < 19) {
    return "Snack";
  }

  return "Dinner";
}


// ============================================================
// MEAL FILTER
// ============================================================

function getMealFoods(foods, currentMeal) {

  return foods.filter(food => {

    if (currentMeal === "Breakfast") {
      return food.meal.includes("Breakfast");
    }

    if (
      currentMeal === "Lunch" ||
      currentMeal === "Dinner"
    ) {
      return (
        food.meal.includes("Lunch") ||
        food.meal.includes("Dinner")
      );
    }

    if (currentMeal === "Snack") {
      return food.meal.includes("Snack");
    }

    return true;
  });
}


// ============================================================
// NUTRITIONAL SIMILARITY
// ============================================================

export function nutritionalDistance(food, reference) {

  if (!reference) {
    return 0;
  }

  const calorieDifference =
    Math.abs(food.calories - reference.calories) /
    Math.max(reference.calories, 1);

  const proteinDifference =
    Math.abs(food.protein - reference.protein) /
    Math.max(reference.protein, 1);

  const carbDifference =
    Math.abs(food.carbs - reference.carbs) /
    Math.max(reference.carbs, 1);

  const fatDifference =
    Math.abs(food.fat - reference.fat) /
    Math.max(reference.fat, 1);

  return (
    calorieDifference * 0.35 +
    proteinDifference * 0.35 +
    carbDifference * 0.20 +
    fatDifference * 0.10
  );
}


// ============================================================
// TARGET NUTRITION
// ============================================================

function getNutritionReference(type) {

  if (type === "high-protein") {
    return {
      calories: 300,
      protein: 18,
      carbs: 30,
      fat: 10
    };
  }

  if (type === "light") {
    return {
      calories: 200,
      protein: 8,
      carbs: 25,
      fat: 5
    };
  }

  if (type === "high-energy") {
    return {
      calories: 420,
      protein: 18,
      carbs: 45,
      fat: 15
    };
  }

  if (type === "high-carb") {
    return {
      calories: 380,
      protein: 12,
      carbs: 55,
      fat: 8
    };
  }

  return {
    calories: 350,
    protein: 15,
    carbs: 42,
    fat: 10
  };
}


// ============================================================
// DAILY HISTORY
// ============================================================

const HISTORY_KEY =
  "vitalRecommendationHistory";


function getRecommendationHistory() {

  try {

    const saved =
      localStorage.getItem(HISTORY_KEY);

    if (!saved) {
      return [];
    }

    const history =
      JSON.parse(saved);

    if (!Array.isArray(history)) {
      return [];
    }

    return history;

  } catch {

    return [];
  }
}


// ============================================================
// GET PREVIOUS RECOMMENDATIONS
// IMPORTANT:
// Only use history from the SAME diet.
// ============================================================

function getPreviousRecommendations(today, diet) {

  const history =
    getRecommendationHistory();

  const previousEntries =
    history.filter(entry =>
      entry.date !== today &&
      entry.diet === diet
    );

  if (previousEntries.length === 0) {
    return {};
  }

  previousEntries.sort(
    (a, b) =>
      b.date.localeCompare(a.date)
  );

  return (
    previousEntries[0]?.recommendations ||
    {}
  );
}


// ============================================================
// SAVE TODAY'S RECOMMENDATIONS
// ============================================================

function saveDailyRecommendations(
  today,
  diet,
  goal,
  recommendations
) {

  try {

    let history =
      getRecommendationHistory();

    const existingIndex =
      history.findIndex(
        entry => entry.date === today
      );

    const entry = {
      date: today,
      diet,
      goal,
      recommendations
    };

    if (existingIndex >= 0) {

      history[existingIndex] =
        entry;

    } else {

      history.push(entry);
    }

    // Keep last 14 days
    history =
      history.slice(-14);

    localStorage.setItem(
      HISTORY_KEY,
      JSON.stringify(history)
    );

  } catch {
    // Ignore localStorage errors
  }
}


// ============================================================
// FIND FOOD BY NAME
// ============================================================

function findFoodByName(name) {

  if (!name) {
    return null;
  }

  return (
    indianFoods.find(
      food => food.name === name
    ) || null
  );
}


// ============================================================
// SMART DAILY FOOD SELECTION
// ============================================================

function chooseDailyFood({
  candidates,
  previousName,
  reference,
  today,
  category,
  usedNames = [],
  dietSeed = "",
  goalSeed = ""
}) {

  if (
    !candidates ||
    candidates.length === 0
  ) {
    return null;
  }

  // Remove previous recommendation
  let available =
    candidates.filter(
      food =>
        food.name !== previousName
    );

  // Avoid foods already used today
  const unused =
    available.filter(
      food =>
        !usedNames.includes(food.name)
    );

  if (unused.length > 0) {
    available = unused;
  }

  // Fallback
  if (available.length === 0) {

    available =
      candidates.filter(
        food =>
          !usedNames.includes(food.name)
      );
  }

  if (available.length === 0) {
    available = candidates;
  }

  // Rank nutritionally
  const ranked =
    [...available].sort(
      (a, b) =>
        nutritionalDistance(a, reference) -
        nutritionalDistance(b, reference)
    );

  // Keep top 4 for variety
  const topCandidates =
    ranked.slice(
      0,
      Math.min(4, ranked.length)
    );

  // IMPORTANT:
  // Include diet + goal in the seed.
  // Therefore changing diet changes
  // the recommendation even on the same day.

  const seed =
    createHash(
      `${today}-${dietSeed}-${goalSeed}-${category}-${reference?.calories || 0}-${reference?.protein || 0}`
    );

  const index =
    seed % topCandidates.length;

  return topCandidates[index];
}


// ============================================================
// CREATE FOOD RECOMMENDATION
// ============================================================

function createFoodRecommendation({
  food,
  category,
  description
}) {

  if (!food) {
    return null;
  }

  return {
    category,

    title:
      `🍽️ ${food.name}`,

    description,

    calories:
      food.calories,

    protein:
      food.protein,

    carbs:
      food.carbs,

    fat:
      food.fat
  };
}


// ============================================================
// GENERATE RECOMMENDATIONS
// ============================================================

export function generateRecommendations({
  profile,
  totals,
  water,
  exerciseMinutes
}) {

  const recommendations = [];

  const usedFoodNames = [];

  // ----------------------------------------------------------
  // TARGETS
  // ----------------------------------------------------------

  const calorieTarget =
    Number(totals?.calorieTarget) || 2000;

  const proteinTarget =
    Number(totals?.proteinTarget) || 100;

  const carbsTarget =
    Number(totals?.carbsTarget) || 250;

  const caloriesConsumed =
    Number(totals?.calories) || 0;

  const proteinConsumed =
    Number(totals?.protein) || 0;

  const carbsConsumed =
    Number(totals?.carbs) || 0;

  const caloriesRemaining =
    calorieTarget - caloriesConsumed;

  const proteinRemaining =
    proteinTarget - proteinConsumed;

  const carbsRemaining =
    carbsTarget - carbsConsumed;


  // ----------------------------------------------------------
  // USER DIET
  // ----------------------------------------------------------

  const diet =
    profile?.diet || "vegetarian";


  // ----------------------------------------------------------
  // USER GOAL
  // ----------------------------------------------------------

  const goal =
    profile?.goal || "maintenance";


  // ----------------------------------------------------------
  // CURRENT MEAL
  // ----------------------------------------------------------

  const currentMeal =
    getCurrentMeal();


  // ----------------------------------------------------------
  // ALLOWED FOODS
  // ----------------------------------------------------------

  const allowedFoods =
    getAllowedFoods(diet);


  // ----------------------------------------------------------
  // FOODS FOR CURRENT MEAL
  // ----------------------------------------------------------

  const mealFoods =
    getMealFoods(
      allowedFoods,
      currentMeal
    );


  // ----------------------------------------------------------
  // TODAY
  // ----------------------------------------------------------

  const today =
    getLocalDateKey();


  // ----------------------------------------------------------
  // PREVIOUS RECOMMENDATIONS
  // SAME DIET ONLY
  // ----------------------------------------------------------

  const previousRecommendations =
    getPreviousRecommendations(
      today,
      diet
    );


  // ==========================================================
  // 1. PROTEIN RECOMMENDATION
  // ==========================================================

  if (proteinRemaining > 20) {

    let proteinFoods =
      mealFoods.filter(
        food =>
          food.type === "high-protein"
      );

    if (proteinFoods.length === 0) {

      proteinFoods =
        mealFoods.filter(
          food =>
            food.protein >= 10
        );
    }

    // THIS IS THE IMPORTANT FIX
    proteinFoods =
      prioritizeDietFoods(
        proteinFoods,
        diet
      );

    const previousName =
      previousRecommendations.Protein;

    // Only use previous food if
    // it belongs to the current diet.
    let previousFood =
      findFoodByName(previousName);

    if (
      previousFood &&
      diet === "non-vegetarian" &&
      previousFood.diet !== "non-vegetarian"
    ) {
      previousFood = null;
    }

    if (
      previousFood &&
      diet === "eggetarian" &&
      previousFood.diet !== "eggetarian"
    ) {
      previousFood = null;
    }

    if (
      previousFood &&
      diet === "vegetarian" &&
      previousFood.diet !== "vegetarian"
    ) {
      previousFood = null;
    }

    const reference =
      previousFood ||
      getNutritionReference(
        "high-protein"
      );

    const food =
      chooseDailyFood({
        candidates: proteinFoods,
        previousName,
        reference,
        today,
        category: "Protein",
        usedNames: usedFoodNames,
        dietSeed: diet,
        goalSeed: goal
      });

    if (food) {

      usedFoodNames.push(
        food.name
      );

      const recommendation =
        createFoodRecommendation({

          food,

          category:
            "Protein",

          description:
            `Your protein intake is currently about ${Math.max(
              0,
              Math.round(proteinRemaining)
            )}g below your target. ${food.name} provides approximately ${food.protein}g of protein and is suitable for your ${currentMeal.toLowerCase()} meal.`
        });

      if (recommendation) {
        recommendations.push(
          recommendation
        );
      }
    }
  }


  // ==========================================================
  // 2. CALORIE RECOMMENDATION
  // ==========================================================

  if (caloriesRemaining > 400) {

    let desiredType =
      "balanced";

    if (goal === "loss") {
      desiredType = "light";
    }
    else if (goal === "gain") {
      desiredType = "high-energy";
    }

    let calorieFoods =
      mealFoods.filter(
        food =>
          food.type === desiredType
      );

    if (calorieFoods.length === 0) {

      calorieFoods =
        mealFoods.filter(
          food =>
            food.type === "balanced"
        );
    }

    if (calorieFoods.length === 0) {
      calorieFoods = mealFoods;
    }

    // IMPORTANT DIET PRIORITY
    calorieFoods =
      prioritizeDietFoods(
        calorieFoods,
        diet
      );

    const previousName =
      previousRecommendations.Calories;

    let previousFood =
      findFoodByName(previousName);

    if (
      previousFood &&
      previousFood.diet !== diet &&
      diet !== "non-vegetarian"
    ) {
      previousFood = null;
    }

    if (
      diet === "non-vegetarian" &&
      previousFood &&
      previousFood.diet !== "non-vegetarian"
    ) {
      previousFood = null;
    }

    const reference =
      previousFood ||
      getNutritionReference(
        desiredType
      );

    const food =
      chooseDailyFood({

        candidates:
          calorieFoods,

        previousName,

        reference,

        today,

        category:
          "Calories",

        usedNames:
          usedFoodNames,

        dietSeed:
          diet,

        goalSeed:
          goal
      });

    if (food) {

      usedFoodNames.push(
        food.name
      );

      let goalText =
        "balanced nutrition";

      if (goal === "loss") {
        goalText =
          "your weight-loss goal";
      }
      else if (goal === "gain") {
        goalText =
          "your weight-gain goal";
      }

      const recommendation =
        createFoodRecommendation({

          food,

          category:
            "Calories",

          description:
            `You have approximately ${Math.round(
              caloriesRemaining
            )} kcal remaining today. ${food.name} is a ${food.calories} kcal option selected for ${goalText}.`
        });

      if (recommendation) {
        recommendations.push(
          recommendation
        );
      }
    }
  }


  // ==========================================================
  // 3. CARBOHYDRATE RECOMMENDATION
  // ==========================================================

  if (carbsRemaining > 50) {

    let carbFoods =
      mealFoods.filter(
        food =>
          food.type === "high-carb"
      );

    if (carbFoods.length === 0) {

      carbFoods =
        mealFoods.filter(
          food =>
            food.type === "balanced"
        );
    }

    // Prefer non-veg / egg foods
    // when available.
    carbFoods =
      prioritizeDietFoods(
        carbFoods,
        diet
      );

    const previousName =
      previousRecommendations.Carbohydrates;

    let previousFood =
      findFoodByName(previousName);

    if (
      previousFood &&
      previousFood.diet !== diet &&
      diet !== "non-vegetarian"
    ) {
      previousFood = null;
    }

    if (
      diet === "non-vegetarian" &&
      previousFood &&
      previousFood.diet !== "non-vegetarian"
    ) {
      previousFood = null;
    }

    const reference =
      previousFood ||
      getNutritionReference(
        "high-carb"
      );

    const food =
      chooseDailyFood({

        candidates:
          carbFoods,

        previousName,

        reference,

        today,

        category:
          "Carbohydrates",

        usedNames:
          usedFoodNames,

        dietSeed:
          diet,

        goalSeed:
          goal
      });

    if (food) {

      usedFoodNames.push(
        food.name
      );

      const recommendation =
        createFoodRecommendation({

          food,

          category:
            "Carbohydrates",

          description:
            `Your carbohydrate intake is approximately ${Math.max(
              0,
              Math.round(carbsRemaining)
            )}g below your target. ${food.name} provides a suitable carbohydrate source for your ${currentMeal.toLowerCase()} meal.`
        });

      if (recommendation) {
        recommendations.push(
          recommendation
        );
      }
    }
  }


  // ==========================================================
  // 4. HYDRATION
  // ==========================================================

  if (Number(water) < 6) {

    const previousDrinkName =
      previousRecommendations.Hydration;

    let availableDrinks =
      indianDrinks.filter(
        drink =>
          drink.name !== previousDrinkName
      );

    if (availableDrinks.length === 0) {
      availableDrinks =
        indianDrinks;
    }

    const drinkSeed =
      createHash(
        `${today}-${diet}-Hydration`
      );

    const drink =
      availableDrinks[
        drinkSeed %
        availableDrinks.length
      ];

    recommendations.push({

      category:
        "Hydration",

      title:
        `💧 Try ${drink.name}`,

      description:
        `You have logged ${Number(
          water
        )} glasses of water today. Your target is 8 glasses, so keep drinking water regularly.`
    });
  }


  // ==========================================================
  // 5. EXERCISE
  // ==========================================================

  if (Number(exerciseMinutes) < 30) {

    let suitableExercises =
      exercises;

    if (goal === "loss") {

      suitableExercises =
        exercises.filter(
          exercise =>
            exercise.type === "cardio"
        );

    }
    else if (goal === "gain") {

      suitableExercises =
        exercises.filter(
          exercise =>
            exercise.type === "strength"
        );
    }

    const previousExercise =
      previousRecommendations.Exercise;

    let availableExercises =
      suitableExercises.filter(
        exercise =>
          exercise.name !==
          previousExercise
      );

    if (availableExercises.length === 0) {
      availableExercises =
        suitableExercises;
    }

    const exerciseSeed =
      createHash(
        `${today}-Exercise-${goal}`
      );

    const exercise =
      availableExercises[
        exerciseSeed %
        availableExercises.length
      ];

    recommendations.push({

      category:
        "Exercise",

      title:
        `🏃 ${exercise.name}`,

      description:
        `You have logged ${Number(
          exerciseMinutes
        )} minutes of exercise today. Consider around ${exercise.duration} minutes of ${exercise.name.toLowerCase()} if it fits your routine.`
    });
  }


  // ==========================================================
  // SAVE TODAY'S RECOMMENDATIONS
  // ==========================================================

  const dailyFoodHistory = {};

  recommendations.forEach(
    recommendation => {

      if (
        recommendation.category === "Protein" ||
        recommendation.category === "Calories" ||
        recommendation.category === "Carbohydrates"
      ) {

        const title =
          recommendation.title
            .replace("🍽️ ", "")
            .trim();

        dailyFoodHistory[
          recommendation.category
        ] = title;
      }
    }
  );


  // Save hydration

  const hydrationRecommendation =
    recommendations.find(
      item =>
        item.category === "Hydration"
    );

  if (hydrationRecommendation) {

    dailyFoodHistory.Hydration =
      hydrationRecommendation.title
        .replace("💧 Try ", "")
        .trim();
  }


  // Save exercise

  const exerciseRecommendation =
    recommendations.find(
      item =>
        item.category === "Exercise"
    );

  if (exerciseRecommendation) {

    dailyFoodHistory.Exercise =
      exerciseRecommendation.title
        .replace("🏃 ", "")
        .trim();
  }


  // IMPORTANT:
  // Save diet + goal along with history.

  saveDailyRecommendations(
    today,
    diet,
    goal,
    dailyFoodHistory
  );


  return recommendations;
}
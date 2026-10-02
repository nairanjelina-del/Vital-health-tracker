import {
  indianFoods,
  indianDrinks,
  exercises,
  nutritionalDistance,
  getCurrentMeal,
} from "./recommendationEngine";


// ============================================================
// VITAL CHATBOT ENGINE
// ============================================================

function getProfile() {
  try {
    return (
      JSON.parse(
        localStorage.getItem("vitalProfile")
      ) || {}
    );
  } catch {
    return {};
  }
}


// ============================================================
// TODAY'S DATA
// ============================================================

function getTodayData() {
  const today = new Date()
    .toISOString()
    .split("T")[0];

  let foods = [];
  let exercise = [];

  try {
    foods =
      JSON.parse(
        localStorage.getItem("vitalFoods")
      ) || [];

    exercise =
      JSON.parse(
        localStorage.getItem("vitalExercises")
      ) || [];
  } catch {
    foods = [];
    exercise = [];
  }

  const todayFoods = foods.filter(
    (food) => food.date === today
  );

  const todayExercise = exercise.filter(
    (item) => item.date === today
  );

  const calories = todayFoods.reduce(
    (sum, food) =>
      sum + Number(food.calories || 0),
    0
  );

  const protein = todayFoods.reduce(
    (sum, food) =>
      sum + Number(food.protein || 0),
    0
  );

  const carbs = todayFoods.reduce(
    (sum, food) =>
      sum + Number(food.carbs || 0),
    0
  );

  const fat = todayFoods.reduce(
    (sum, food) =>
      sum + Number(food.fat || 0),
    0
  );

  const exerciseMinutes =
    todayExercise.reduce(
      (sum, item) =>
        sum + Number(item.duration || 0),
      0
    );

  let water = 0;

  try {
    water =
      Number(
        localStorage.getItem("vitalWater")
      ) || 0;
  } catch {
    water = 0;
  }

  return {
    calories,
    protein,
    carbs,
    fat,
    exerciseMinutes,
    water,
  };
}


// ============================================================
// DIET FILTER
// ============================================================

function filterByDiet(
  foods,
  diet
) {
  if (diet === "vegetarian") {
    return foods.filter(
      (food) =>
        food.diet === "vegetarian"
    );
  }

  if (diet === "eggetarian") {
    return foods.filter(
      (food) =>
        food.diet === "vegetarian" ||
        food.diet === "eggetarian"
    );
  }

  if (diet === "non-vegetarian") {
    return foods.filter(
      (food) =>
        food.diet === "vegetarian" ||
        food.diet === "eggetarian" ||
        food.diet === "non-vegetarian"
    );
  }

  return foods.filter(
    (food) =>
      food.diet === "vegetarian"
  );
}


// ============================================================
// EXPLICIT DIET REQUEST
// ============================================================

function detectRequestedDiet(message) {
  const text =
    message.toLowerCase();

  const nonVegWords = [
    "non veg",
    "non-veg",
    "nonveg",
    "chicken",
    "fish",
    "mutton",
    "meat",
    "non vegetarian",
    "non-vegetarian",
  ];

  const eggWords = [
    "egg",
    "eggetarian",
    "eggitarian",
  ];

  const vegWords = [
    "vegetarian",
    "veg",
  ];

  if (
    nonVegWords.some(
      (word) =>
        text.includes(word)
    )
  ) {
    return "non-vegetarian";
  }

  if (
    eggWords.some(
      (word) =>
        text.includes(word)
    )
  ) {
    return "eggetarian";
  }

  if (
    vegWords.some(
      (word) =>
        text.includes(word)
    )
  ) {
    return "vegetarian";
  }

  return null;
}


// ============================================================
// MEAL DETECTION
// ============================================================

function detectMeal(message) {
  const text =
    message.toLowerCase();

  if (
    text.includes("breakfast")
  ) {
    return "Breakfast";
  }

  if (
    text.includes("lunch")
  ) {
    return "Lunch";
  }

  if (
    text.includes("dinner")
  ) {
    return "Dinner";
  }

  if (
    text.includes("snack")
  ) {
    return "Snack";
  }

  return getCurrentMeal();
}


// ============================================================
// MEAL FILTER
// ============================================================

function filterByMeal(
  foods,
  meal
) {
  return foods.filter(
    (food) => {

      if (
        meal === "Breakfast"
      ) {
        return food.meal.includes(
          "Breakfast"
        );
      }

      if (
        meal === "Lunch" ||
        meal === "Dinner"
      ) {
        return (
          food.meal.includes(
            "Lunch"
          ) ||
          food.meal.includes(
            "Dinner"
          )
        );
      }

      if (
        meal === "Snack"
      ) {
        return food.meal.includes(
          "Snack"
        );
      }

      return true;
    }
  );
}


// ============================================================
// FOOD TYPE DETECTION
// ============================================================

function detectFoodType(message) {
  const text =
    message.toLowerCase();

  if (
    text.includes("protein") ||
    text.includes("high protein")
  ) {
    return "high-protein";
  }

  if (
    text.includes("low calorie") ||
    text.includes("low-calorie") ||
    text.includes("light")
  ) {
    return "light";
  }

  if (
    text.includes("high calorie") ||
    text.includes("high-calorie") ||
    text.includes("more calories")
  ) {
    return "high-energy";
  }

  if (
    text.includes("carb") ||
    text.includes("carbohydrate")
  ) {
    return "high-carb";
  }

  return "balanced";
}


// ============================================================
// FOOD SELECTION
// ============================================================

function chooseFood({
  foods,
  message,
  excludeName,
}) {
  if (
    !foods ||
    foods.length === 0
  ) {
    return null;
  }

  const type =
    detectFoodType(message);

  let candidates =
    foods.filter(
      (food) =>
        food.type === type
    );

  if (
    candidates.length === 0
  ) {
    candidates = foods;
  }

  if (excludeName) {
    const alternatives =
      candidates.filter(
        (food) =>
          food.name.toLowerCase() !==
          excludeName.toLowerCase()
      );

    if (
      alternatives.length > 0
    ) {
      candidates = alternatives;
    }
  }

  return candidates[0] || null;
}


// ============================================================
// NUTRITIONALLY SIMILAR ALTERNATIVES
// ============================================================

function findAlternatives({
  food,
  candidates,
  count = 3,
}) {
  if (
    !food ||
    candidates.length === 0
  ) {
    return [];
  }

  return [...candidates]
    .filter(
      (item) =>
        item.name !== food.name
    )
    .sort(
      (a, b) =>
        nutritionalDistance(
          a,
          food
        ) -
        nutritionalDistance(
          b,
          food
        )
    )
    .slice(0, count);
}


// ============================================================
// FIND FOOD FROM USER MESSAGE
// ============================================================

function findMentionedFood(message) {
  const text =
    message.toLowerCase();

  return (
    indianFoods.find(
      (food) =>
        text.includes(
          food.name.toLowerCase()
        )
    ) || null
  );
}


// ============================================================
// EXERCISE ALTERNATIVES
// ============================================================

function getExerciseAlternatives(
  message,
  profile
) {
  const text =
    message.toLowerCase();

  let candidates =
    [...exercises];

  if (
    text.includes("easy") ||
    text.includes("easier") ||
    text.includes("light")
  ) {
    candidates =
      candidates.filter(
        (exercise) =>
          exercise.duration <= 25 ||
          exercise.type ===
            "flexibility"
      );
  }

  if (
    text.includes("cardio")
  ) {
    candidates =
      candidates.filter(
        (exercise) =>
          exercise.type ===
          "cardio"
      );
  }

  if (
    text.includes("strength") ||
    text.includes("muscle")
  ) {
    candidates =
      candidates.filter(
        (exercise) =>
          exercise.type ===
          "strength"
      );
  }

  if (
    text.includes("yoga")
  ) {
    candidates =
      candidates.filter(
        (exercise) =>
          exercise.type ===
          "flexibility"
      );
  }

  if (
    text.includes("short") ||
    text.includes("10 minute") ||
    text.includes("15 minute") ||
    text.includes("20 minute")
  ) {
    candidates =
      candidates.filter(
        (exercise) =>
          exercise.duration <= 20
      );
  }

  if (
    candidates.length === 0
  ) {
    candidates =
      [...exercises];
  }

  return candidates.slice(0, 4);
}


// ============================================================
// DRINK ALTERNATIVES
// ============================================================

function getDrinkAlternatives(
  message
) {
  const text =
    message.toLowerCase();

  let drinks =
    [...indianDrinks];

  if (
    text.includes("low calorie") ||
    text.includes("low-calorie")
  ) {
    drinks =
      drinks.filter(
        (drink) =>
          drink.calories <= 50
      );
  }

  return drinks.slice(0, 4);
}


// ============================================================
// RECIPE DATABASE
// ============================================================

const recipes = {

  "Moong Dal Chilla":
    "Soak moong dal, blend it into a batter, add onion and spices, then cook thin chillas on a lightly greased pan.",

  "Besan Chilla":
    "Mix besan with water, onion, tomato and spices. Make a smooth batter and cook both sides on a hot pan.",

  "Paneer Bhurji with Roti":
    "Crumble paneer and cook with onion, tomato and spices. Serve with freshly prepared roti.",

  "Chicken Tikka":
    "Marinate chicken with curd, ginger-garlic, lemon and spices. Grill or air-fry until fully cooked.",

  "Chicken Tikka with Roti":
    "Marinate chicken with curd and spices, grill until fully cooked, and serve with roti and vegetables.",

  "Grilled Fish with Roti":
    "Marinate fish with lemon and spices, grill until fully cooked, and serve with roti and vegetables.",

  "Dal Rice":
    "Cook dal with turmeric and spices. Serve with cooked rice and vegetables.",

  "Vegetable Poha":
    "Cook flattened rice with vegetables, peanuts, onion and mild spices until soft and fluffy.",

  "Idli with Sambar":
    "Steam idli batter until cooked and serve with vegetable-rich sambar.",

  "Chole with Roti":
    "Cook chickpeas with onion, tomato and Indian spices. Serve with roti.",

  "Rajma Rice":
    "Cook soaked kidney beans with tomato and spices, then serve with cooked rice.",
};


// ============================================================
// RECIPE RESPONSE
// ============================================================

function getRecipe(food) {
  if (!food) {
    return null;
  }

  return (
    recipes[food.name] ||
    `For ${food.name}, use the ingredients normally associated with the dish, cook using moderate oil, and adjust spices to your preference.`
  );
}


// ============================================================
// RECIPE LINKS
// ============================================================

function getRecipeLinks(food) {
  if (!food) {
    return [];
  }

  const query = encodeURIComponent(
    `${food.name} recipe`
  );

  return [
    {
      label: "▶️ Watch recipe on YouTube",
      url:
        `https://www.youtube.com/results?search_query=${query}`,
    },

    {
      label: "🌐 Find detailed recipe",
      url:
        `https://www.google.com/search?q=${query}`,
    },
  ];
}


// ============================================================
// GOAL TEXT
// ============================================================

function getGoalText(goal) {
  if (goal === "loss") {
    return "weight loss";
  }

  if (goal === "gain") {
    return "weight gain";
  }

  return "weight maintenance";
}


// ============================================================
// CHAT RESPONSE
// ============================================================

export function getVitalChatResponse(
  message
) {

  const profile =
    getProfile();

  const data =
    getTodayData();

  const text =
    message.toLowerCase().trim();

  const savedDiet =
    profile.diet ||
    "vegetarian";

  const requestedDiet =
    detectRequestedDiet(
      message
    );

  const activeDiet =
    requestedDiet ||
    savedDiet;

  const meal =
    detectMeal(message);

  const goal =
    getGoalText(
      profile.goal
    );


  // ==========================================================
  // GREETING
  // ==========================================================

  if (
    text === "hi" ||
    text === "hello" ||
    text === "hey" ||
    text.includes("hi vital") ||
    text.includes("hello vital")
  ) {

    return {
      message:
        `Hi! I'm Vital 👋 I can help you with food, nutrition, exercise, hydration and alternatives based on your current plan.`,

      suggestions: [
        "Give me a food recommendation",
        "Give me another option",
        "Suggest an exercise",
        "How am I doing today?",
      ],
    };
  }


  // ==========================================================
  // TODAY'S SUMMARY
  // ==========================================================

  if (
    text.includes("how am i") ||
    text.includes("today's progress") ||
    text.includes("todays progress") ||
    text.includes("my progress") ||
    text.includes("today summary") ||
    text.includes("what have i eaten")
  ) {

    return {
      message:
        `Today's summary:\n\n🔥 Calories: ${Math.round(data.calories)} kcal\n💪 Protein: ${Math.round(data.protein)} g\n🍚 Carbs: ${Math.round(data.carbs)} g\n🥑 Fat: ${Math.round(data.fat)} g\n💧 Water: ${data.water} glasses\n🏃 Exercise: ${data.exerciseMinutes} minutes\n\nYour current goal is ${goal}.`,

      suggestions: [
        "What should I eat next?",
        "Give me a high-protein option",
        "Suggest an exercise",
      ],
    };
  }


  // ==========================================================
  // RECIPE REQUEST
  // ==========================================================

  if (
    text.includes("recipe") ||
    text.includes("how to make") ||
    text.includes("how do i make") ||
    text.includes("how can i make")
  ) {

    const mentionedFood =
      findMentionedFood(
        message
      );

    if (mentionedFood) {

      return {
        message:
          `🍳 ${mentionedFood.name}\n\n${getRecipe(
            mentionedFood
          )}`,

        links:
          getRecipeLinks(
            mentionedFood
          ),

        suggestions: [
          "Give me another food",
          "Give me a high-protein option",
        ],
      };
    }

    return {
      message:
        "Sure! Tell me the food name and I'll give you a simple recipe.",

      suggestions: [
        "Recipe for Moong Dal Chilla",
        "Recipe for Chicken Tikka",
        "Recipe for Paneer Bhurji",
      ],
    };
  }


  // ==========================================================
  // EXERCISE REQUEST
  // ==========================================================

  if (
    text.includes("exercise") ||
    text.includes("workout") ||
    text.includes("run") ||
    text.includes("walking") ||
    text.includes("cycling") ||
    text.includes("yoga")
  ) {

    const alternatives =
      getExerciseAlternatives(
        message,
        profile
      );

    const lines =
      alternatives.map(
        (exercise) =>
          `🏃 ${exercise.name} — ${exercise.duration} min`
      );

    return {
      message:
        `Here are some exercise options suitable for your ${goal} goal:\n\n${lines.join(
          "\n"
        )}`,

      suggestions: [
        "Give me an easier exercise",
        "Give me a short exercise",
        "Give me another exercise",
      ],
    };
  }


  // ==========================================================
  // HYDRATION REQUEST
  // ==========================================================

  if (
    text.includes("drink") ||
    text.includes("hydration") ||
    text.includes("water")
  ) {

    const drinks =
      getDrinkAlternatives(
        message
      );

    return {
      message:
        `💧 Your current water intake is ${data.water} glasses.\n\nSome options:\n\n${drinks
          .map(
            (drink) =>
              `• ${drink.name} — ${drink.calories} kcal`
          )
          .join("\n")}`,

      suggestions: [
        "Give me a low calorie drink",
        "Give me another drink",
      ],
    };
  }


  // ==========================================================
  // FIND SPECIFIC FOOD
  // ==========================================================

  const mentionedFood =
    findMentionedFood(
      message
    );


  // ==========================================================
  // ALTERNATIVE REQUEST
  // ==========================================================

  if (
    text.includes("another") ||
    text.includes("alternative") ||
    text.includes("instead") ||
    text.includes("don't want") ||
    text.includes("dont want") ||
    text.includes("different")
  ) {

    let candidates =
      filterByDiet(
        indianFoods,
        activeDiet
      );

    candidates =
      filterByMeal(
        candidates,
        meal
      );

    if (
      candidates.length === 0
    ) {

      candidates =
        filterByDiet(
          indianFoods,
          activeDiet
        );
    }

    const alternatives =
      mentionedFood
        ? findAlternatives({
            food:
              mentionedFood,

            candidates,

            count: 4,
          })
        : [
            chooseFood({
              foods: candidates,
              message,
            }),
          ].filter(Boolean);

    if (
      alternatives.length === 0
    ) {

      return {
        message:
          "I couldn't find a suitable alternative right now. Try asking for a different meal or nutrition type.",
      };
    }

    return {
      message:
        `Sure! Here are some alternatives based on your ${activeDiet} preference and ${meal.toLowerCase()}:\n\n${alternatives
          .map(
            (food) =>
              `🍽️ ${food.name} — ${food.calories} kcal | ${food.protein}g protein`
          )
          .join("\n")}`,

      suggestions: [
        "Give me another one",
        "Give me the recipe",
        "Give me a high-protein option",
      ],
    };
  }


  // ==========================================================
  // FOOD RECOMMENDATION
  // ==========================================================

  const foodWords = [
    "food",
    "eat",
    "meal",
    "breakfast",
    "lunch",
    "dinner",
    "snack",
    "dish",
    "recommend",
    "suggest",
    "hungry",
  ];

  if (
    foodWords.some(
      (word) =>
        text.includes(word)
    )
  ) {

    let candidates =
      filterByDiet(
        indianFoods,
        activeDiet
      );

    candidates =
      filterByMeal(
        candidates,
        meal
      );

    if (
      candidates.length === 0
    ) {

      candidates =
        filterByDiet(
          indianFoods,
          activeDiet
        );
    }

    const food =
      chooseFood({
        foods: candidates,
        message,
      });

    if (food) {

      const dietNotice =
        requestedDiet &&
        requestedDiet !== savedDiet
          ? `\n\nYou specifically asked for a ${requestedDiet} option, so I'm using that preference for this response only. Your saved profile remains ${savedDiet}.`
          : "";

      return {
        message:
          `🍽️ Try ${food.name}\n\n${food.calories} kcal | ${food.protein}g protein | ${food.carbs}g carbs | ${food.fat}g fat\n\nThis fits your ${goal} goal and is suitable for ${meal.toLowerCase()}.${dietNotice}`,

        suggestions: [
          "Give me another option",
          `Recipe for ${food.name}`,
          "Give me a high-protein option",
        ],
      };
    }
  }


  // ==========================================================
  // PROTEIN
  // ==========================================================

  if (
    text.includes("protein")
  ) {

    let candidates =
      filterByDiet(
        indianFoods,
        activeDiet
      );

    candidates =
      filterByMeal(
        candidates,
        meal
      );

    candidates =
      candidates.filter(
        (food) =>
          food.type ===
          "high-protein"
      );

    const food =
      chooseFood({
        foods: candidates,
        message,
      });

    if (food) {

      return {
        message:
          `💪 ${food.name}\n\n${food.protein}g protein | ${food.calories} kcal\n\nYou currently have approximately ${Math.max(
            0,
            Math.round(
              (Number(profile.proteinTarget) || 100) -
                data.protein
            )
          )}g protein to cover based on the available target information.`,

        suggestions: [
          "Give me another protein option",
          "Give me a non-veg protein option",
          "Give me a vegetarian protein option",
        ],
      };
    }
  }


  // ==========================================================
  // CALORIE
  // ==========================================================

  if (
    text.includes("calorie") ||
    text.includes("calories")
  ) {

    return {
      message:
        `🔥 You've logged approximately ${Math.round(
          data.calories
        )} kcal today. Your current goal is ${goal}. If you tell me what meal you're looking for, I can suggest a suitable option.`,

      suggestions: [
        "Give me a low calorie meal",
        "Give me a high calorie meal",
        "What should I eat next?",
      ],
    };
  }


  // ==========================================================
  // DEFAULT
  // ==========================================================

  return {
    message:
      `I can help with your Vital plan. Try asking me things like:\n\n• "Give me another food"\n• "I want a non-veg dinner"\n• "Give me a high-protein option"\n• "I don't want running, suggest another exercise"\n• "Give me a recipe for Chicken Tikka"\n• "How am I doing today?"`,

    suggestions: [
      "Give me a food recommendation",
      "Give me another option",
      "Suggest an exercise",
      "How am I doing today?",
    ],
  };
}
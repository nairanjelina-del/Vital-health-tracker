import { useState, useEffect } from "react";

function FoodLog() {
  const [food, setFood] = useState({
    meal: "Breakfast",
    name: "",
    calories: "",
    protein: "",
    carbs: "",
    fat: "",
  });

  const [foods, setFoods] = useState([]);
  useEffect(() => {
  const savedFoods = localStorage.getItem("vitalFoods");

  if (savedFoods) {
    setFoods(JSON.parse(savedFoods));
  }
}, []);

  const totals = foods.reduce(
  (total, item) => ({
    calories: total.calories + Number(item.calories),
    protein: total.protein + Number(item.protein),
    carbs: total.carbs + Number(item.carbs),
    fat: total.fat + Number(item.fat),
  }),
  {
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
  }
);

const foodSuggestions = [
  "Poha",
  "Dal Rice",
  "Roti",
  "Paneer",
  "Banana",
  "Apple",
  "Idli",
  "Dosa",
  "Upma",
  "Vegetable Pulao",
];

  const handleChange = (e) => {
    setFood({
      ...food,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedFoods = [...foods, food];

setFoods(updatedFoods);

localStorage.setItem(
  "vitalFoods",
  JSON.stringify(updatedFoods)
);

    setFood({
      meal: "Breakfast",
      name: "",
      calories: "",
      protein: "",
      carbs: "",
      fat: "",
    });
  };

  return (
    <div className="foodlog-page">
      <div className="foodlog-card">

        <h1>Food Log </h1>

        <p>
          Track what you eat and stay on top of your daily nutrition.
        </p>

        <form onSubmit={handleSubmit}>

          <select
            name="meal"
            value={food.meal}
            onChange={handleChange}
          >
            <option>Breakfast</option>
            <option>Lunch</option>
            <option>Dinner</option>
            <option>Snack</option>
          </select>

          <input
  type="text"
  name="name"
  placeholder="Food name"
  value={food.name}
  onChange={handleChange}
  required
/>

{food.name && (
  <div className="suggestions">
    {foodSuggestions
      .filter((item) =>
        item.toLowerCase().includes(food.name.toLowerCase())
      )
      .map((item, index) => (
       <div
  className="suggestion-item"
  key={index}
  onClick={() => {
    setFood({
      ...food,
      name: item,
    });
  }}
>
  {item}
</div>
      ))}
  </div>
)}

          <input
            type="number"
            name="calories"
            placeholder="Calories (kcal)"
            value={food.calories}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="protein"
            placeholder="Protein (g)"
            value={food.protein}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="carbs"
            placeholder="Carbs (g)"
            value={food.carbs}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="fat"
            placeholder="Fat (g)"
            value={food.fat}
            onChange={handleChange}
            required
          />

          <button type="submit">
            Add Food
          </button>

        </form>
        <div className="nutrition-summary">
  <h2>Today's Nutrition</h2>

  <div className="nutrition-grid">
    <div>
      <strong>{totals.calories}</strong>
      <span> kcal</span>
      <p>Calories</p>
    </div>

    <div>
      <strong>{totals.protein}</strong>
      <span> g</span>
      <p>Protein</p>
    </div>

    <div>
      <strong>{totals.carbs}</strong>
      <span> g</span>
      <p>Carbs</p>
    </div>

    <div>
      <strong>{totals.fat}</strong>
      <span> g</span>
      <p>Fat</p>
    </div>
  </div>
</div>

        <div className="meal-section">
          <h2>Today's Meals</h2>

          {foods.length === 0 ? (
            <p>No food added yet.</p>
          ) : (
            foods.map((item, index) => (
  <div className="meal-item" key={index}>
    <div>
      <strong>{item.name}</strong>
      <span> ({item.meal})</span>
    </div>

    <span>{item.calories} kcal</span>

    <button
      type="button"
     onClick={() => {
  const updatedFoods = foods.filter((_, i) => i !== index);

  setFoods(updatedFoods);

  localStorage.setItem(
    "vitalFoods",
    JSON.stringify(updatedFoods)
  );
}}
    >
      Delete
    </button>
  </div>
))
          )}

        </div>

      </div>
    </div>
  );
}

export default FoodLog;
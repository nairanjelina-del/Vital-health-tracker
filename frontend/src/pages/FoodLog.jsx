import { useState, useEffect } from "react";
import API, { todayLocal } from "../services/api";

const emptyForm = () => ({
  meal: "Breakfast",
  name: "",
  calories: "",
  protein: "",
  carbs: "",
  fat: "",
  date: todayLocal(),
});

const foodSuggestions = [
  "Poha", "Dal Rice", "Roti", "Paneer", "Banana",
  "Apple", "Idli", "Dosa", "Upma", "Vegetable Pulao",
];

function FoodLog() {
  const [food, setFood] = useState(emptyForm());
  const [foods, setFoods] = useState([]);
  const [error, setError] = useState("");

  // Load this user's logs from the database
  useEffect(() => {
    const loadFoods = async () => {
      try {
        const res = await API.get("/health/food");
        setFoods(res.data);
      } catch (err) {
        setError(err.response?.data?.message || "Could not load food logs");
      }
    };
    loadFoods();
  }, []);

  const today = todayLocal();

  // item.date comes back as an ISO string, e.g. "2026-10-05T00:00:00.000Z"
  const todaysFoods = foods.filter((item) => item.date.slice(0, 10) === today);

  const totals = todaysFoods.reduce(
    (total, item) => ({
      calories: total.calories + (Number(item.calories) || 0),
      protein: total.protein + (Number(item.protein) || 0),
      carbs: total.carbs + (Number(item.carbs) || 0),
      fat: total.fat + (Number(item.fat) || 0),
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0 }
  );

  const handleChange = (e) => {
    setFood({ ...food, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await API.post("/health/food", {
        meal: food.meal,
        foodItem: food.name,
        calories: food.calories,
        protein: food.protein,
        carbs: food.carbs,
        fat: food.fat,
        date: food.date,
      });

      // Use what the database returned (it has the real _id)
      setFoods([res.data, ...foods]);
      setFood(emptyForm());
    } catch (err) {
      setError(err.response?.data?.message || "Could not save food");
    }
  };

  const handleDelete = async (id) => {
    setError("");
    try {
      await API.delete(`/health/food/${id}`);
      setFoods(foods.filter((item) => item._id !== id));
    } catch (err) {
      setError(err.response?.data?.message || "Could not delete food");
    }
  };

  return (
    <div className="foodlog-page">
      <div className="foodlog-card">
        <h1>Food Log 🍽️</h1>

        <p>Track what you eat and stay on top of your daily nutrition.</p>

        {error && <p style={{ color: "red" }}>{error}</p>}

        {/* FOOD FORM */}
        <form onSubmit={handleSubmit}>
          <select name="meal" value={food.meal} onChange={handleChange}>
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

          {/* AUTOCOMPLETE */}
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
                    onClick={() => setFood({ ...food, name: item })}
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

          <button type="submit">Add Food</button>
        </form>

        {/* TODAY'S NUTRITION */}
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

        {/* TODAY'S MEALS */}
        <div className="meal-section">
          <h2>Today's Meals</h2>

          {todaysFoods.length === 0 ? (
            <p>No food added today.</p>
          ) : (
            todaysFoods.map((item) => (
              <div className="meal-item" key={item._id}>
                <div>
                  <strong>{item.foodItem}</strong>
                  <span> ({item.meal})</span>
                </div>

                <span>{item.calories} kcal</span>

                <button type="button" onClick={() => handleDelete(item._id)}>
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
import { useState, useEffect, useCallback } from "react";
import MacroBar from "./MacroBar";
import { generateRecommendations } from "../ai/recommendationEngine";
import API, { todayLocal } from "./api";

const sameDay = (item) => item.date.slice(0, 10) === todayLocal();
const sum = (items, key) =>
  items.reduce((total, item) => total + (Number(item[key]) || 0), 0);

function Dashboard() {
  const [data, setData] = useState({
    nutrition: { calories: 0, protein: 0, carbs: 0, fat: 0 },
    exercise: { minutes: 0, calories: 0 },
    waterMl: 0,
    profile: {},
    latestWeight: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const reload = useCallback(async () => {
    try {
      const [food, exercise, water, weight, profile] = await Promise.all([
        API.get("/health/food"),
        API.get("/health/exercise"),
        API.get("/health/water"),
        API.get("/health/weight"),
        API.get("/auth/profile"),
      ]);

      const todaysFood = food.data.filter(sameDay);
      const todaysExercise = exercise.data.filter(sameDay);
      const todaysWater = water.data.filter(sameDay);
      const weights = weight.data; // oldest -> newest

      setData({
        nutrition: {
          calories: sum(todaysFood, "calories"),
          protein: sum(todaysFood, "protein"),
          carbs: sum(todaysFood, "carbs"),
          fat: sum(todaysFood, "fat"),
        },
        exercise: {
          minutes: sum(todaysExercise, "durationMinutes"),
          calories: sum(todaysExercise, "caloriesBurned"),
        },
        waterMl: sum(todaysWater, "amountMl"),
        profile: profile.data,
        latestWeight: weights.length ? weights[weights.length - 1].weight : null,
      });
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Could not load dashboard");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  const { nutrition, exercise, waterMl, profile, latestWeight } = data;

  // Fallback nutrition targets based on profile fitness goal stored in DB
  const nutritionTargets = {
    loss: {
      calories: 1800,
      protein: 100,
      carbs: 200,
      fat: 60,
    },
    gain: {
      calories: 2500,
      protein: 120,
      carbs: 300,
      fat: 80,
    },
    maintenance: {
      calories: 2000,
      protein: 100,
      carbs: 250,
      fat: 70,
    },
  };

  const targets =
    nutritionTargets[profile?.goal || profile?.fitnessGoal] ||
    nutritionTargets.maintenance;

  // Handler to add water via backend API and trigger state reload
  const handleAddWater = async () => {
    try {
      await API.post("/health/water", { amountMl: 250 });
      reload(); // Refresh dashboard data from database
    } catch (err) {
      console.error("Failed to add water log:", err);
    }
  };

  const handleResetWater = async () => {
    try {
      reload();
    } catch (err) {
      console.error("Failed to reset water:", err);
    }
  };

  if (loading) {
    return <div className="dashboard-loading">Loading your health dashboard...</div>;
  }

  if (error) {
    return <div className="dashboard-error">Error: {error}</div>;
  }

  const glasses = Math.round(waterMl / 250);

  const recommendations = generateRecommendations({
    profile,
    totals: {
      ...nutrition,
      calorieTarget: targets.calories,
      proteinTarget: targets.protein,
      carbsTarget: targets.carbs,
    },
    water: glasses,
    exerciseMinutes: exercise.minutes,
  });

  return (
    <div className="dashboard">
      <h1>Welcome back, {profile?.name || "User"}!</h1>
      <p className="subtitle">
        Track your nutrition and stay on top of your health goals directly from your database.
      </p>

      {/* DASHBOARD CARDS */}
      <div className="dashboard-cards">
        <div className="card">
          <h2>Today's Nutrition</h2>
          <MacroBar
            label="Protein"
            current={nutrition.protein}
            target={targets.protein}
            unit="g"
          />
          <MacroBar
            label="Carbs"
            current={nutrition.carbs}
            target={targets.carbs}
            unit="g"
          />
          <MacroBar
            label="Fat"
            current={nutrition.fat}
            target={targets.fat}
            unit="g"
          />
        </div>

        <div className="card">
          <h2>Today's Calories</h2>
          <div className="calorie-number">
            {nutrition.calories}
          </div>
          <p>
            of {targets.calories.toLocaleString()} kcal target
          </p>
        </div>

        <div className="card">
          <h2>Current Weight</h2>
          <div className="weight-number">
            {latestWeight || profile?.weight || 0} kg
          </div>
          <p>
            Goal: {profile?.goalWeight || profile?.targetWeight || 0} kg
          </p>
        </div>

        <div className="card">
          <h2>Today's Exercise</h2>
          <div className="calorie-number">
            {exercise.minutes} min
          </div>
          <p>
            {exercise.calories} kcal burned
          </p>
        </div>
      </div>

      {/* WATER */}
      <div className="card">
        <h2>💧 Water Intake</h2>
        <div className="water-number">
          {glasses} / 8 glasses ({waterMl} ml)
        </div>
        <div className="water-track">
          <div
            className="water-fill"
            style={{
              width: `${Math.min((glasses / 8) * 100, 100)}%`,
            }}
          ></div>
        </div>
        <button className="water-btn" onClick={handleAddWater}>
          Add Glass (+250ml)
        </button>
        <button className="water-reset-btn" onClick={handleResetWater}>
          Refresh
        </button>
      </div>

      {/* AI HEALTH ASSISTANT */}
      <div className="ai-suggestions">
        <h2>🤖 Vital AI Health Assistant</h2>
        <p>
          Personalized suggestions based on your live database metrics.
        </p>
        <div className="suggestion-list">
          {recommendations.length === 0 ? (
            <div className="suggestion-card">
              <h3>✨ You're doing great!</h3>
              <p>Your current nutrition and activity levels are looking balanced today.</p>
            </div>
          ) : (
            recommendations.map((recommendation, index) => (
              <div className="suggestion-card" key={index}>
                <h3>{recommendation.title}</h3>
                <p>{recommendation.description}</p>
                {recommendation.calories && (
                  <small>Approx. {recommendation.calories} kcal</small>
                )}
                {recommendation.protein && (
                  <small> • {recommendation.protein}g protein</small>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
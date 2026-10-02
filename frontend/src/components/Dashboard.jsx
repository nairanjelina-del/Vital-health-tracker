import { useState, useEffect } from "react";
import MacroBar from "./MacroBar";
import { generateRecommendations } from "../ai/recommendationEngine";

function Dashboard() {
  const savedProfile =
    JSON.parse(localStorage.getItem("vitalProfile")) || {};

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
    nutritionTargets[savedProfile.goal] ||
    nutritionTargets.maintenance;

  const [foods, setFoods] = useState([]);
  const [water, setWater] = useState(0);
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    const savedFoods = localStorage.getItem("vitalFoods");

    if (savedFoods) {
      setFoods(JSON.parse(savedFoods));
    }
  }, []);

  useEffect(() => {
    const savedWater = localStorage.getItem("vitalWater");
    const today = new Date().toISOString().split("T")[0];

    if (savedWater) {
      const waterData = JSON.parse(savedWater);

      if (waterData.date === today) {
        setWater(waterData.amount);
      } else {
        setWater(0);
      }
    }
  }, []);

  useEffect(() => {
    const savedExercises =
      localStorage.getItem("vitalExercises");

    if (savedExercises) {
      setExercises(JSON.parse(savedExercises));
    }
  }, []);

  const today = new Date().toISOString().split("T")[0];

  const todaysFoods = foods.filter(
    (item) => item.date === today
  );

  const todaysExercises = exercises.filter(
    (item) => item.date === today
  );

  const totals = todaysFoods.reduce(
    (total, item) => ({
      calories:
        total.calories + Number(item.calories),

      protein:
        total.protein + Number(item.protein),

      carbs:
        total.carbs + Number(item.carbs),

      fat:
        total.fat + Number(item.fat),
    }),
    {
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
    }
  );

  const exerciseTotals = todaysExercises.reduce(
    (total, item) => ({
      duration:
        total.duration + Number(item.duration),

      calories:
        total.calories + Number(item.calories),
    }),
    {
      duration: 0,
      calories: 0,
    }
  );

  const recommendations = generateRecommendations({
    profile: savedProfile,

    totals: {
      ...totals,
      calorieTarget: targets.calories,
      proteinTarget: targets.protein,
      carbsTarget: targets.carbs,
    },

    water,

    exerciseMinutes: exerciseTotals.duration,
  });

  return (
    <div className="dashboard">

      <h1>Welcome to Vital!</h1>

      <p className="subtitle">
        Track your nutrition and stay on top of your health goals.
      </p>

      {/* DASHBOARD CARDS */}

      <div className="dashboard-cards">

        <div className="card">
          <h2>Today's Nutrition</h2>

          <MacroBar
            label="Protein"
            current={totals.protein}
            target={targets.protein}
            unit="g"
          />

          <MacroBar
            label="Carbs"
            current={totals.carbs}
            target={targets.carbs}
            unit="g"
          />

          <MacroBar
            label="Fat"
            current={totals.fat}
            target={targets.fat}
            unit="g"
          />
        </div>

        <div className="card">
          <h2>Today's Calories</h2>

          <div className="calorie-number">
            {totals.calories}
          </div>

          <p>
            of {targets.calories.toLocaleString()} kcal target
          </p>
        </div>

        <div className="card">
          <h2>Current Weight</h2>

          <div className="weight-number">
            {savedProfile.currentWeight || 0} kg
          </div>

          <p>
            Goal: {savedProfile.goalWeight || 0} kg
          </p>
        </div>

        <div className="card">
          <h2>Today's Exercise 🏃</h2>

          <div className="calorie-number">
            {exerciseTotals.duration} min
          </div>

          <p>
            {exerciseTotals.calories} kcal burned
          </p>
        </div>

      </div>

      {/* WATER */}

      <div className="card">

        <h2>💧 Water Intake</h2>

        <div className="water-number">
          {water} / 8 glasses
        </div>

        <div className="water-track">

          <div
            className="water-fill"
            style={{
              width: `${Math.min(
                (water / 8) * 100,
                100
              )}%`,
            }}
          ></div>

        </div>

        <button
          className="water-btn"
          onClick={() => {

            if (water < 8) {

              const newWater = water + 1;

              setWater(newWater);

              localStorage.setItem(
                "vitalWater",
                JSON.stringify({
                  date: today,
                  amount: newWater,
                })
              );
            }

          }}
        >
          Add Glass
        </button>

        <button
          className="water-reset-btn"
          onClick={() => {

            setWater(0);

            localStorage.setItem(
              "vitalWater",
              JSON.stringify({
                date: today,
                amount: 0,
              })
            );

          }}
        >
          Reset
        </button>

      </div>

      {/* AI HEALTH ASSISTANT */}

      <div className="ai-suggestions">

        <h2>
          🤖 Vital AI Health Assistant
        </h2>

        <p>
          Personalized suggestions based on your
          nutrition, hydration, exercise and goal.
        </p>

        <div className="suggestion-list">

          {recommendations.length === 0 ? (

            <div className="suggestion-card">

              <h3>
                🎉 You're doing great!
              </h3>

              <p>
                Your current nutrition and activity
                levels are looking balanced today.
              </p>

            </div>

          ) : (

            recommendations.map(
              (recommendation, index) => (

                <div
                  className="suggestion-card"
                  key={index}
                >

                  <h3>
                    {recommendation.title}
                  </h3>

                  <p>
                    {recommendation.description}
                  </p>

                  {recommendation.calories && (
                    <small>
                      Approx. {recommendation.calories} kcal
                    </small>
                  )}

                  {recommendation.protein && (
                    <small>
                      {" "}• {recommendation.protein}g protein
                    </small>
                  )}

                </div>

              )
            )

          )}

        </div>

      </div>

    </div>
  );
}

export default Dashboard;
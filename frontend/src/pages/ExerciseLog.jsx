import { useState, useEffect } from "react";
import API, { todayLocal } from "../services/api";

const emptyForm = () => ({
  type: "Walking",
  duration: "",
  calories: "",
  date: todayLocal(),
});

function ExerciseLog() {
  const [exercise, setExercise] = useState(emptyForm());
  const [exercises, setExercises] = useState([]);
  const [error, setError] = useState("");

  // Load this user's logs from the database
  useEffect(() => {
    const loadExercises = async () => {
      try {
        const res = await API.get("/health/exercise");
        setExercises(res.data);
      } catch (err) {
        setError(err.response?.data?.message || "Could not load exercise logs");
      }
    };
    loadExercises();
  }, []);

  const today = todayLocal();

  const todaysExercises = exercises.filter(
    (item) => item.date.slice(0, 10) === today
  );

  const exerciseTotals = todaysExercises.reduce(
    (total, item) => ({
      duration: total.duration + (Number(item.durationMinutes) || 0),
      calories: total.calories + (Number(item.caloriesBurned) || 0),
    }),
    { duration: 0, calories: 0 }
  );

  const handleChange = (e) => {
    setExercise({ ...exercise, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await API.post("/health/exercise", {
        exerciseName: exercise.type,
        durationMinutes: exercise.duration,
        caloriesBurned: exercise.calories,
        date: exercise.date,
      });

      setExercises([res.data, ...exercises]);
      setExercise(emptyForm());
    } catch (err) {
      setError(err.response?.data?.message || "Could not save exercise");
    }
  };

  const handleDelete = async (id) => {
    setError("");
    try {
      await API.delete(`/health/exercise/${id}`);
      setExercises(exercises.filter((item) => item._id !== id));
    } catch (err) {
      setError(err.response?.data?.message || "Could not delete exercise");
    }
  };

  return (
    <div className="exercise-page">
      <div className="exercise-card">
        <h1>Exercise Log 🏃</h1>

        <p>Track your daily physical activity and stay active.</p>

        {error && <p style={{ color: "red" }}>{error}</p>}

        {/* EXERCISE FORM */}
        <form onSubmit={handleSubmit}>
          <select name="type" value={exercise.type} onChange={handleChange}>
            <option>Walking</option>
            <option>Running</option>
            <option>Cycling</option>
            <option>Yoga</option>
            <option>Gym Workout</option>
            <option>Swimming</option>
          </select>

          <input
            type="number"
            name="duration"
            placeholder="Duration (minutes)"
            value={exercise.duration}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="calories"
            placeholder="Calories burned"
            value={exercise.calories}
            onChange={handleChange}
            required
          />

          <button type="submit">Add Exercise</button>
        </form>

        {/* TODAY'S EXERCISE SUMMARY */}
        <div className="exercise-summary">
          <h2>Today's Exercise</h2>

          <div className="exercise-summary-grid">
            <div>
              <strong>{exerciseTotals.duration}</strong>
              <span> min</span>
              <p>Duration</p>
            </div>

            <div>
              <strong>{exerciseTotals.calories}</strong>
              <span> kcal</span>
              <p>Calories Burned</p>
            </div>
          </div>
        </div>

        {/* TODAY'S EXERCISE HISTORY */}
        <div className="exercise-history">
          <h2>Today's Activities</h2>

          {todaysExercises.length === 0 ? (
            <p>No exercise added today.</p>
          ) : (
            todaysExercises.map((item) => (
              <div className="exercise-item" key={item._id}>
                <div>
                  <strong>{item.exerciseName}</strong>
                  <p>{item.durationMinutes} minutes</p>
                </div>

                <span>{item.caloriesBurned} kcal</span>

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

export default ExerciseLog;
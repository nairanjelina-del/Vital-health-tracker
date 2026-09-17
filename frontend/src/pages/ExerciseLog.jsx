import { useState, useEffect } from "react";

function ExerciseLog() {
  const [exercise, setExercise] = useState({
    type: "Walking",
    duration: "",
    calories: "",
    date: new Date().toISOString().split("T")[0],
  });

  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    const savedExercises =
      localStorage.getItem("vitalExercises");

    if (savedExercises) {
      setExercises(JSON.parse(savedExercises));
    }
  }, []);

  const today = new Date().toISOString().split("T")[0];

  const todaysExercises = exercises.filter(
    (item) => item.date === today
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

  const handleChange = (e) => {
    setExercise({
      ...exercise,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedExercises = [
      ...exercises,
      exercise,
    ];

    setExercises(updatedExercises);

    localStorage.setItem(
      "vitalExercises",
      JSON.stringify(updatedExercises)
    );

    setExercise({
      type: "Walking",
      duration: "",
      calories: "",
      date: new Date().toISOString().split("T")[0],
    });
  };

  const handleDelete = (itemToDelete) => {
    const updatedExercises = exercises.filter(
      (item) => item !== itemToDelete
    );

    setExercises(updatedExercises);

    localStorage.setItem(
      "vitalExercises",
      JSON.stringify(updatedExercises)
    );
  };

  return (
    <div className="exercise-page">
      <div className="exercise-card">

        <h1>Exercise Log 🏃</h1>

        <p>
          Track your daily physical activity and stay active.
        </p>

        {/* EXERCISE FORM */}

        <form onSubmit={handleSubmit}>

          <select
            name="type"
            value={exercise.type}
            onChange={handleChange}
          >
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

          <button type="submit">
            Add Exercise
          </button>

        </form>

        {/* TODAY'S EXERCISE SUMMARY */}

        <div className="exercise-summary">

          <h2>Today's Exercise</h2>

          <div className="exercise-summary-grid">

            <div>
              <strong>
                {exerciseTotals.duration}
              </strong>

              <span> min</span>

              <p>Duration</p>
            </div>

            <div>
              <strong>
                {exerciseTotals.calories}
              </strong>

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
            todaysExercises.map((item, index) => (
              <div
                className="exercise-item"
                key={index}
              >

                <div>
                  <strong>{item.type}</strong>

                  <p>
                    {item.duration} minutes
                  </p>
                </div>

                <span>
                  {item.calories} kcal
                </span>

                <button
                  type="button"
                  onClick={() =>
                    handleDelete(item)
                  }
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

export default ExerciseLog;
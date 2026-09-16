import { useState, useEffect } from "react";

function ExerciseLog() {
  const [exercise, setExercise] = useState({
    type: "Walking",
    duration: "",
    calories: "",
  });

  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    const savedExercises = localStorage.getItem("vitalExercises");

    if (savedExercises) {
      setExercises(JSON.parse(savedExercises));
    }
  }, []);

  const handleChange = (e) => {
    setExercise({
      ...exercise,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedExercises = [...exercises, exercise];

    setExercises(updatedExercises);

    localStorage.setItem(
      "vitalExercises",
      JSON.stringify(updatedExercises)
    );

    setExercise({
      type: "Walking",
      duration: "",
      calories: "",
    });
  };

  return (
    <div className="exercise-page">
      <div className="exercise-card">

        <h1>Exercise Log 🏃</h1>

        <p>
          Track your daily physical activity and stay active.
        </p>

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

        <div className="exercise-history">

          <h2>Today's Exercise</h2>

          {exercises.length === 0 ? (
            <p>No exercise added yet.</p>
          ) : (
            exercises.map((item, index) => (
              <div className="exercise-item" key={index}>

                <div>
                  <strong>{item.type}</strong>
                  <p>{item.duration} minutes</p>
                </div>

                <span>
                  {item.calories} kcal
                </span>

                <button
                  type="button"
                  onClick={() => {
                    const updatedExercises =
                      exercises.filter((_, i) => i !== index);

                    setExercises(updatedExercises);

                    localStorage.setItem(
                      "vitalExercises",
                      JSON.stringify(updatedExercises)
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

export default ExerciseLog;
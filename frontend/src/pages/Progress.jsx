import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function Progress() {
      const [profile, setProfile] = useState({});
      const [weightHistory, setWeightHistory] = useState([]);

  useEffect(() => {
    const savedProfile = localStorage.getItem("vitalProfile");

    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    }
  }, []);

  useEffect(() => {
  const savedWeights = localStorage.getItem("vitalWeightHistory");

  if (savedWeights) {
    setWeightHistory(JSON.parse(savedWeights));
  }
}, []);
    const weightData =
  weightHistory.length > 0
    ? weightHistory
    : [
        {
          day: "Current",
          weight: Number(profile.currentWeight) || 0,
        },
      ];

  const recentWeights = weightHistory.slice(-3);

  const isPlateau =
    recentWeights.length >= 3 &&
    Math.max(...recentWeights.map((item) => Number(item.weight))) -
      Math.min(...recentWeights.map((item) => Number(item.weight))) <= 0.5;



  return (
    <div className="progress-page">
      <div className="progress-card">

        <h1>Your Progress 📈</h1>

        <p>
          Track your weight changes and see how you're progressing
          toward your goal.
        </p>

        <form
  onSubmit={(e) => {
    e.preventDefault();

    const newWeight = Number(e.target.weight.value);

    if (!newWeight) return;

    const updatedWeights = [
      ...weightHistory,
      {
        day: `Day ${weightHistory.length + 1}`,
        weight: newWeight,
      },
    ];

    setWeightHistory(updatedWeights);

    localStorage.setItem(
      "vitalWeightHistory",
      JSON.stringify(updatedWeights)
    );

    e.target.reset();
  }}
>
  <input
    type="number"
    name="weight"
    placeholder="Enter today's weight (kg)"
    step="0.1"
    required
  />

  <button type="submit">
    Add Weight
  </button>
</form>

        <div className="progress-chart">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={weightData}>

              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="day" />

              <YAxis
                domain={["dataMin - 2", "dataMax + 2"]}
              />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="weight"
                stroke="#4caf50"
                strokeWidth={3}
              />

            </LineChart>
          </ResponsiveContainer>
        </div>
                

        <div className="weight-history">
          <h2>Weight History</h2>

          {weightHistory.length === 0 ? (
            <p>No weight entries yet.</p>
          ) : (
            weightHistory.map((item, index) => (
              <div className="weight-entry" key={index}>
                <span>{item.day}</span>
                <strong>{item.weight} kg</strong>
              </div>
            ))
          )}
        </div>

       {isPlateau &&  (
  <div className="plateau-alert">
    <h2>⚠️ Plateau Alert</h2>

    <p>
      Your weight has remained stable recently.
      Consider reviewing your nutrition and activity.
    </p>
  </div>
)} 

        <div className="progress-stats">

          <div>
            <h3>Starting Weight</h3>
            <p>70 kg</p>
          </div>

          <div>
            <h3>Current Weight</h3>
            <p>{profile.currentWeight || 0} kg</p>
          </div>

          <div>
            <h3>Goal Weight</h3>
            <p>{profile.goalWeight || 0} kg</p>
          </div>

        </div>

      </div>
      </div>
   
  );
}

export default Progress;
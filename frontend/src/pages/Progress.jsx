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
import API, { todayLocal } from "../services/api";

function Progress() {
  const [profile, setProfile] = useState({});
  const [weightHistory, setWeightHistory] = useState([]);
  const [error, setError] = useState("");

  // Load profile + weight history from the database
  useEffect(() => {
    const loadData = async () => {
      try {
        const [profileRes, weightRes] = await Promise.all([
          API.get("/auth/profile"),
          API.get("/health/weight"),
        ]);
        setProfile(profileRes.data);
        setWeightHistory(weightRes.data);
      } catch (err) {
        setError(err.response?.data?.message || "Could not load progress data");
      }
    };
    loadData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const form = e.target;
    const newWeight = Number(form.weight.value);
    if (!newWeight) return;

    try {
      const res = await API.post("/health/weight", {
        weight: newWeight,
        date: todayLocal(),
      });
      setWeightHistory([...weightHistory, res.data]);
      form.reset();
    } catch (err) {
      setError(err.response?.data?.message || "Could not save weight");
    }
  };

  // Chart data: label each entry by its date
  const chartEntries = weightHistory.map((item) => ({
    day: item.date.slice(0, 10),
    weight: item.weight,
  }));

  const weightData =
    chartEntries.length > 0
      ? chartEntries
      : [{ day: "Current", weight: Number(profile.currentWeight) || 0 }];

  const recentWeights = weightHistory.slice(-3);

  const isPlateau =
    recentWeights.length >= 3 &&
    Math.max(...recentWeights.map((item) => item.weight)) -
      Math.min(...recentWeights.map((item) => item.weight)) <= 0.5;

  // Starting = first logged weight (or profile weight if nothing logged yet)
  // Current = latest logged weight (or profile weight)
  const startingWeight =
    weightHistory.length > 0
      ? weightHistory[0].weight
      : profile.currentWeight || 0;

  const currentWeight =
    weightHistory.length > 0
      ? weightHistory[weightHistory.length - 1].weight
      : profile.currentWeight || 0;

  return (
    <div className="progress-page">
      <div className="progress-card">
        <h1>Your Progress 📈</h1>

        <p>
          Track your weight changes and see how you're progressing toward your
          goal.
        </p>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <form onSubmit={handleSubmit}>
          <input
            type="number"
            name="weight"
            placeholder="Enter today's weight (kg)"
            step="0.1"
            required
          />

          <button type="submit">Add Weight</button>
        </form>

        <div className="progress-chart">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={weightData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis domain={["dataMin - 2", "dataMax + 2"]} />
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
            weightHistory.map((item) => (
              <div className="weight-entry" key={item._id}>
                <span>{item.date.slice(0, 10)}</span>
                <strong>{item.weight} kg</strong>
              </div>
            ))
          )}
        </div>

        {isPlateau && (
          <div className="plateau-alert">
            <h2>⚠️ Plateau Alert</h2>

            <p>
              Your weight has remained stable recently. Consider reviewing your
              nutrition and activity.
            </p>
          </div>
        )}

        <div className="progress-stats">
          <div>
            <h3>Starting Weight</h3>
            <p>{startingWeight} kg</p>
          </div>

          <div>
            <h3>Current Weight</h3>
            <p>{currentWeight} kg</p>
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
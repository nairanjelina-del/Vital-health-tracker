import MacroBar from "./MacroBar";

function Dashboard() {
  return (
    <div className="dashboard">
      <h1>Welcome to Vital 👋</h1>
      <p className="subtitle">
        Track your nutrition and stay on top of your health goals.
      </p>

      <div className="dashboard-cards">

        <div className="card">
          <h2>Today's Nutrition</h2>

          <MacroBar
            label="Protein"
            current={65}
            target={100}
            unit="g"
          />

          <MacroBar
            label="Carbs"
            current={180}
            target={250}
            unit="g"
          />

          <MacroBar
            label="Fat"
            current={45}
            target={70}
            unit="g"
          />
        </div>

        <div className="card">
          <h2>Today's Calories</h2>

          <div className="calorie-number">
            1,450
          </div>

          <p>of 2,000 kcal target</p>
        </div>

        <div className="card">
          <h2>Current Weight</h2>

          <div className="weight-number">
            65 kg
          </div>

          <p>Goal: 60 kg</p>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;
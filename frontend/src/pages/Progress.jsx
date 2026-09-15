function Progress() {
  return (
    <div className="progress-page">
      <div className="progress-card">
        <h1>Your Progress 📈</h1>

        <p>
          Track your weight changes and see how you're progressing
          toward your goal.
        </p>

        <div className="progress-placeholder">
          Weight Progress Chart
        </div>

        <div className="progress-stats">
          <div>
            <h3>Starting Weight</h3>
            <p>70 kg</p>
          </div>

          <div>
            <h3>Current Weight</h3>
            <p>65 kg</p>
          </div>

          <div>
            <h3>Goal Weight</h3>
            <p>60 kg</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Progress;
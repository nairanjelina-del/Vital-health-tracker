function MacroBar({ label, current, target, unit }) {
  const percentage = Math.min((current / target) * 100, 100);

  return (
    <div className="macro-item">
      <div className="macro-info">
        <span className="macro-label">{label}</span>

        <span className="macro-value">
          {current} / {target} {unit}
        </span>
      </div>

      <div className="macro-track">
        <div
          className="macro-fill"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
}

export default MacroBar;
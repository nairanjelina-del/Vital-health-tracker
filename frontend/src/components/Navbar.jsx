import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="logo">
        Vital
      </div>

      <div className="nav-links">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/food-log">Food Log</Link>
        <Link to="/progress">Progress</Link>
        <Link to="/profile">Profile</Link>
      </div>

      <button
        className="logout-btn"
        onClick={() => navigate("/")}
      >
        Logout
      </button>
    </nav>
  );
}

export default Navbar;
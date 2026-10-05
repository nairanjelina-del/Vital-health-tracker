import { Link, useNavigate } from "react-router-dom";
import { clearSession } from "../services/api";


function Navbar() {
  const navigate = useNavigate();
  const handleLogout = () => {
  clearSession();
  navigate("/");
};
  return (
    <nav className="navbar">
      <div className="logo">
        Vital
      </div>

      <div className="nav-links">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/food-log">Food Log</Link>
        <Link to="/exercise-log">Exercise</Link>
        <Link to="/progress">Progress</Link>
        <Link to="/profile">Profile</Link>
      </div>

      <button
        className="logout-btn"
        onClick={handleLogout}
      >
        Logout
      </button>
    </nav>
  );
}

export default Navbar;
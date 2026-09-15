import { Link } from "react-router-dom";
function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        Vital
      </div>

      <div className="nav-links">
       <Link to="/dashboard">Dashboard</Link>
       <Link to="#">Food Log</Link>
       <Link to="/progress">Progress</Link>
       <Link to="/profile">Profile</Link>
      </div>

      <button className="logout-btn">
        Logout
      </button>
    </nav>
  );
}

export default Navbar;
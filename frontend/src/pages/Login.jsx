import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import API, { clearSession } from "../services/api";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await API.post("/auth/login", formData);
      const { token, user } = response.data;
if (token) {
  clearSession();
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));
}
      navigate("/dashboard");
    } catch (err) {
      console.error("Login error:", err);
      setError(
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Invalid email or password"
      );
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h1>Vital</h1>
        <p>Login to your health dashboard</p>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit">Login</button>
        </form>

        <p className="register-text">
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");

  try {

    const response = await API.post(
      "/auth/register",
      formData
    );

    const { token, user } = response.data;

    // Save authentication
    localStorage.setItem("token", token);

    // Save user information
    localStorage.setItem(
      "user",
      JSON.stringify(user)
    );

    navigate("/dashboard");

  } catch (err) {

    console.error("Registration error:", err);

    setError(
      err.response?.data?.message ||
      err.response?.data?.error ||
      "Registration failed"
    );
  }
};


  return (
    <div className="login-page">
      <div className="login-card">
        <h1>Vital</h1>
        <p>Create your account</p>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
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
          <button type="submit">Register</button>
        </form>

        <p className="register-text">
          Already have an account? <Link to="/">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
import { Link, useNavigate } from "react-router-dom";
function Register() {
  const navigate = useNavigate();
  return (
    <div className="login-page">
      <div className="login-card">
        <h1>Vital</h1>

        <p>Create your account</p>

       <form onSubmit={(e) => {
  e.preventDefault();
  navigate("/dashboard");
}}>
          <input
            type="text"
            placeholder="Full Name"
          />

          <input
            type="email"
            placeholder="Email"
          />

          <input
            type="password"
            placeholder="Password"
          />

          <button type="submit">
            Register
          </button>
        </form>

        <p className="register-text">
  Already have an account?{" "}
  <Link to="/">Login</Link>
</p>
      </div>
    </div>
  );
}

export default Register;
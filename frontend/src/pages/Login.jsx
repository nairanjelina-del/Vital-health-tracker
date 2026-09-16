import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();
  return (
    <div className="login-page">
      <div className="login-card">
        <h1>Vital</h1>

        <p>Login to your health dashboard</p>

        <form onSubmit={(e) => {
  e.preventDefault();
  navigate("/dashboard");
}}>
          <input
            type="email"
            placeholder="Email"
          />

          <input
            type="password"
            placeholder="Password"
          />

          <button type="submit">
            Login
          </button>
        </form>

        <p className="register-text">
  Don't have an account?{" "}
  <a href="/register">Register</a>
</p>
      </div>
    </div>
  );

}



export default Login;
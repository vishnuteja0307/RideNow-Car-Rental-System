
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // Demo admin login
    if (
      email === "admin@ridenow.com" &&
      password === "admin123"
    ) {
      const admin = {
        name: "Admin",
        email: email,
        role: "admin"
      };

      localStorage.setItem(
        "currentUser",
        JSON.stringify(admin)
      );

      alert("Admin login successful!");
      navigate("/admin");
      return;
    }

    // Normal user login
    const users =
      JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      localStorage.setItem(
        "currentUser",
        JSON.stringify(user)
      );

      alert("Login successful!");
      navigate("/");
    } else {
      alert("Invalid email or password!");
    }
  };

  return (
    <div className="container py-5">
      <div className="auth-form mx-auto">
        <h2 className="text-center fw-bold mb-2">
          Welcome 
        </h2>

        <p className="text-center text-muted mb-4">
          Login to your RideNow account
        </p>

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button className="btn btn-danger w-100 mt-2">
            Login
          </button>
        </form>

        <p className="text-center mt-4 mb-0">
          Don't have an account?{" "}
          <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;

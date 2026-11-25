
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const users = JSON.parse(
      localStorage.getItem("users") || "[]"
    );

    const exists = users.some(
      (user) => user.email === form.email
    );

    if (exists) {
      alert("Email already registered!");
      return;
    }

    const newUser = {
      id: Date.now(),
      name: form.name,
      email: form.email,
      phone: form.phone,
      password: form.password,
      role: "user"
    };

    localStorage.setItem(
      "users",
      JSON.stringify([...users, newUser])
    );

    alert("Registration successful! Please login.");
    navigate("/login");
  };

  return (
    <div className="container py-5">
      <div className="auth-form mx-auto">

        <h2 className="text-center fw-bold">Create Account</h2>
        <p className="text-center text-muted mb-4">
          Join RideNow and start your journey.
        </p>

        <form onSubmit={handleSubmit}>

          <label className="form-label">Full Name</label>
          <input
            className="form-control mb-3"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter your name"
            required
          />

          <label className="form-label">Email Address</label>
          <input
            type="email"
            className="form-control mb-3"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />

          <label className="form-label">Phone Number</label>
          <input
            type="tel"
            className="form-control mb-3"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="10-digit phone number"
            pattern="[0-9]{10}"
            required
          />

          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control mb-3"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Create password"
            minLength="6"
            required
          />

          <label className="form-label">Confirm Password</label>
          <input
            type="password"
            className="form-control mb-4"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm password"
            minLength="6"
            required
          />

          <button className="btn btn-danger w-100">
            Register
          </button>

        </form>

        <p className="text-center mt-4">
          Already have an account?{" "}
          <Link to="/login">Login here</Link>
        </p>

      </div>
    </div>
  );
}

export default Register;

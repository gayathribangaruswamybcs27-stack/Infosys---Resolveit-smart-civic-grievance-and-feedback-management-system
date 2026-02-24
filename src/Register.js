import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./App.css";

function Register() {
  const nav = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleRegister = (e) => {
    e.preventDefault();

    if (form.password !== form.confirm) {
      alert("Passwords do not match!");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    if (users.some((u) => u.email === form.email)) {
      alert("User already exists!");
      return;
    }

    const newUser = {
      name: form.name,
      email: form.email,
      password: form.password,
      role: "citizen",
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    alert("Citizen Registered Successfully! Please Login.");
    nav("/");
  };

  return (
  <div className="auth-bg">
    <div className="container">
      <div className="left">
        <h1>🏙️ ResolveIt</h1>
        <p className="sidebar-desc">
          Citizen registration portal for complaint management and tracking.
        </p>
        <ul className="features">
          <li>📝 Register Complaints</li>
          <li>📍 Track Status</li>
          <li>⭐ Feedback System</li>
        </ul>
      </div>

      <div className="right">
        <div className="form-box">
          <h2>Citizen Registration</h2>
          <p>Create your account</p>

          <form onSubmit={handleRegister}>
            <div className="form-group">
              <label>Full Name</label>
              <input name="name" onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                name="email"
                type="email"
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                name="password"
                type="password"
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Confirm Password</label>
              <input
                name="confirm"
                type="password"
                onChange={handleChange}
                required
              />
            </div>

            <button className="login-btn">Register</button>

            <div className="bottom-text">
              Already have account? <Link to="/">Login</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
);
}
export default Register; 
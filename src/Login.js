import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./App.css";

function Login() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Default Admin + Officer Accounts
    const defaultUsers = [
      { email: "admin@gmail.com", password: "admin123", role: "admin" },
      { email: "officer@gmail.com", password: "officer123", role: "officer" }
    ];

    const allUsers = [...users, ...defaultUsers];

    const user = allUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) {
      alert("Invalid Credentials!");
      return;
    }

    localStorage.setItem("loggedUser", JSON.stringify(user));

    if (user.role === "citizen") nav("/citizen-dashboard");
    else if (user.role === "admin") nav("/admin-dashboard");
    else if (user.role === "officer") nav("/officer-dashboard");
  };

  return (

    <div className="auth-bg">
  <div className="container">
      <div className="left">
        <h1>🏙️ ResolveIt</h1>
        <p className="sidebar-desc">
          Smart Civic Grievance & Feedback Management System
        </p>
        <ul className="features">
          <li>📝 Register Complaints</li>
          <li>📍 Track Status</li>
          <li>📊 Admin Analytics</li>
          <li>🔐 Secure Login</li>
        </ul>
      </div>

      <div className="right">
        <div className="form-box">
          <h2>Login</h2>
          <p>Access your dashboard</p>

          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label>Email</label>
              <input type="email" onChange={(e) => setEmail(e.target.value)} required />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input type="password" onChange={(e) => setPassword(e.target.value)} required />
            </div>

            <button className="login-btn">Login</button>

            <div className="bottom-text">
              New Citizen? <Link to="/register">Register</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Login;
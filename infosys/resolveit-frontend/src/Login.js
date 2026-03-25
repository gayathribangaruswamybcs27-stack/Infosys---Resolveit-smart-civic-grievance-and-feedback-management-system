import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import "./App.css";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // ---------------- NORMAL LOGIN ----------------
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post("http://localhost:8080/api/auth/login", { email, password });
      const user = res.data;
      localStorage.setItem("loggedUser", JSON.stringify(user));

      if (user.role === "citizen") navigate("/citizen-dashboard");
      else if (user.role === "officer") navigate("/officer-dashboard");
      else if (user.role === "admin") navigate("/admin-dashboard");
      else setError("Unknown user role. Contact admin.");
    } catch (err) {
      setError(err.response?.data || "Invalid Email or Password");
    }
    setLoading(false);
  };

  // ---------------- GOOGLE LOGIN ----------------
  const handleGoogleSuccess = async (credentialResponse) => {
    try {
    const decoded = jwtDecode(credentialResponse.credential);

      const userData = {
        name: decoded.name,
        email: decoded.email,
        picture: decoded.picture,
      };

      const res = await axios.post("http://localhost:8080/api/auth/google", userData);
      const user = res.data;

      localStorage.setItem("loggedUser", JSON.stringify(user));

      if (user.role === "citizen") navigate("/citizen-dashboard");
      else if (user.role === "officer") navigate("/officer-dashboard");
      else if (user.role === "admin") navigate("/admin-dashboard");
    } catch (err) {
      setError("Google login failed");
    }
  };

  const handleGoogleError = () => {
    setError("Google Login Failed");
  };

  const handleForgotPassword = () => navigate("/forgot-password");

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
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
              </div>

              {error && <p className="error-msg">{error}</p>}

              <button type="submit" className="login-btn" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>

            <div style={{ marginTop: "15px" }}>
              <button className="link-btn" onClick={handleForgotPassword}>
                Forgot Password?
              </button>

              {/* GOOGLE LOGIN BUTTON */}
              <div style={{ marginTop: "10px" }}>
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={handleGoogleError}
                />
              </div>
            </div>

            <div className="bottom-text">
              New Citizen? <Link to="/register">Register</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
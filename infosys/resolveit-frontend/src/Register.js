import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./App.css";

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [error, setError] = useState("");

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleRegister = async e => {
    e.preventDefault();
    setError("");
    const trimmedName = form.name.trim();
    const trimmedEmail = form.email.trim().toLowerCase();

    if (form.password !== form.confirm) { setError("Passwords do not match!"); return; }
    if (form.password.length < 6) { setError("Password must be at least 6 characters long"); return; }

    try {
      await axios.post("http://localhost:8080/api/auth/register", { name: trimmedName, email: trimmedEmail, password: form.password });
      alert("Citizen Registered Successfully!");
      navigate("/");
    } catch (err) {
      setError(err.response?.data ? "Registration Failed! " + err.response.data : "Registration Failed! Please try again.");
    }
  };

  return (
    <div className="auth-bg">
      <div className="container">
        <div className="left">
          <h1>🏙️ ResolveIt</h1>
          <p className="sidebar-desc">Citizen registration portal for complaint management and tracking.</p>
          <ul className="features">
            <li>📝 Register Complaints</li>
            <li>📍 Track Status</li>
            <li>⭐ Feedback System</li>
            <li>🔐 Secure Login</li>
          </ul>
        </div>

        <div className="right">
          <div className="form-box">
            <h2>Citizen Registration</h2>
            <p>Create your account</p>
            <form onSubmit={handleRegister}>
              <div className="form-group"><label>Full Name</label><input name="name" value={form.name} onChange={handleChange} placeholder="Enter your full name" required /></div>
              <div className="form-group"><label>Email</label><input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Enter your email" required /></div>
              <div className="form-group"><label>Password</label><input name="password" type="password" value={form.password} onChange={handleChange} placeholder="Enter your password" required /></div>
              <div className="form-group"><label>Confirm Password</label><input name="confirm" type="password" value={form.confirm} onChange={handleChange} placeholder="Confirm your password" required /></div>
              {error && <p className="error-msg">{error}</p>}
              <button type="submit" className="login-btn">Register</button>
            </form>
            <div className="bottom-text">Already have an account? <Link to="/">Login</Link></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
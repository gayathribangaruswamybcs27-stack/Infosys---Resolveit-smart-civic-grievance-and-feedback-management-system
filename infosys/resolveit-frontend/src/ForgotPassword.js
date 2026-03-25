import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./App.css";

function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRequestOtp = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!email) {
      setError("Please enter your registered email");
      return;
    }

    setLoading(true);
    try {
      await axios.post("http://localhost:8080/api/auth/request-reset-otp", { email });
      setMessage("OTP sent to your email! Redirecting to verify OTP...");
      setTimeout(() => navigate("/reset-password", { state: { email } }), 2000);
    } catch (err) {
      setError(err.response?.data || "Failed to request OTP. Try again.");
    }
    setLoading(false);
  };

  return (
    <div className="auth-bg">
      <div className="container">
        <div className="left">
          <h1>🏙️ ResolveIt</h1>
          <p className="sidebar-desc">
            Reset your password and regain access. An OTP will be sent to your registered email.
          </p>
        </div>

        <div className="right">
          <div className="form-box">
            <h2>Forgot Password</h2>
            <form onSubmit={handleRequestOtp}>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your registered email"
                  required
                  disabled={loading}
                />
              </div>
              {error && <p className="error-msg">{error}</p>}
              {message && <p className="success-msg">{message}</p>}
              <button type="submit" className="login-btn" disabled={loading}>
                {loading ? "Sending OTP..." : "Send OTP"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
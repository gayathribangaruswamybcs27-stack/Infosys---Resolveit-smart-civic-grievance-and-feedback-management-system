import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "./api";
import "./App.css";

function VerifyOTP() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";

  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setError("");

    if (!otp) {
      setError("Please enter OTP");
      return;
    }

    setLoading(true);
    try {
      await api.post("/auth/verify-otp", { email, otp });
      navigate("/reset-password", { state: { email } });
    } catch (err) {
      if (err.response?.data?.message) setError(err.response.data.message);
      else setError("Invalid OTP. Try again.");
    }
    setLoading(false);
  };

  return (
    <div className="auth-bg">
      <div className="container">
        <div className="right">
          <div className="form-box">
            <h2>Verify OTP</h2>
            <p>Enter the OTP sent to your email</p>

            <form onSubmit={handleVerifyOTP}>
              <div className="form-group">
                <label>OTP</label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter OTP"
                  required
                />
              </div>

              {error && <p className="error-msg">{error}</p>}

              <button type="submit" className="login-btn" disabled={loading}>
                {loading ? "Verifying..." : "Verify OTP"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VerifyOTP;
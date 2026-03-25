import React, { useState } from "react";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function RegisterComplaint() {
  const nav = useNavigate();
  const user = JSON.parse(localStorage.getItem("loggedUser"));

  const [form, setForm] = useState({
    category: "",
    description: "",
    location: "",
    proof: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "proof") {
      setForm({ ...form, proof: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.category || !form.location || !form.description) {
      alert("Please fill all required fields");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("email", user.email);
      formData.append("category", form.category);
      formData.append("description", form.description);
      formData.append("location", form.location);

      if (form.proof) {
        formData.append("proof", form.proof);
      }

      await axios.post("http://localhost:8080/api/complaints/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Complaint Registered Successfully!");
      nav("/citizen-dashboard");
    } catch (err) {
      console.error(err);
      alert("Complaint Registration Failed!");
    }
  };

  const logout = () => {
    localStorage.removeItem("loggedUser");
    nav("/");
  };

  return (
    <div className="dash-main">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="logo">
          <h2>RESOLVEIT</h2>
          <p>Smart Civic Grievance</p>
        </div>

        <ul>
          <li><button onClick={() => nav("/citizen-dashboard")}>Dashboard</button></li>
          <li><button className="active" onClick={() => nav("/register-complaint")}>Register Complaint</button></li>
          <li><button onClick={() => nav("/my-complaints")}>My Complaints</button></li>
          <li><button onClick={() => nav("/feedback")}>Feedback</button></li>
          <li><button onClick={() => nav("/profile")}>Profile</button></li>
          <li><button onClick={logout}>Logout</button></li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="dash-content">
        {/* Top Banner */}
        <div className="register-top-banner">
          <div>
            <h2>Register a New Complaint</h2>
            <p>
              Report civic issues like potholes, drainage problems, garbage,
              water shortage, and streetlight failures quickly and easily.
            </p>
          </div>
          <div className="register-banner-badge">
            Fast • Simple • Transparent
          </div>
        </div>

        {/* Info Cards */}
        <div className="register-info-cards">
          <div className="register-info-card">
            <span>📝</span>
            <h4>Fill Complaint Details</h4>
            <p>Choose category, location, and explain the issue clearly.</p>
          </div>

          <div className="register-info-card">
            <span>📷</span>
            <h4>Add Proof</h4>
            <p>Upload an image to help officers understand the issue faster.</p>
          </div>

          <div className="register-info-card">
            <span>📍</span>
            <h4>Track Progress</h4>
            <p>Monitor complaint status from submission to resolution.</p>
          </div>
        </div>

        {/* Main Form Card */}
        <div className="register-layout">
          <div className="register-form-card">
            <div className="form-card-header">
              <h3>Complaint Submission Form</h3>
              <p>Please provide accurate details for faster resolution.</p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="register-grid">
                <div className="form-group">
                  <label>Complaint Category</label>
                  <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Category</option>
                    <option value="Pothole">Pothole</option>
                    <option value="Garbage">Garbage</option>
                    <option value="Water Issue">Water Issue</option>
                    <option value="Drainage">Drainage</option>
                    <option value="Street Light">Street Light</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Location</label>
                  <input
                    type="text"
                    name="location"
                    placeholder="Enter complaint location"
                    value={form.location}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  name="description"
                  rows="5"
                  placeholder="Describe the issue in detail..."
                  value={form.description}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Upload Proof (Optional)</label>
                <div className="upload-box">
                  <input
                    type="file"
                    name="proof"
                    accept="image/*"
                    onChange={handleChange}
                  />
                  <p>Upload a photo of the issue for better understanding</p>
                </div>

                {form.proof && (
                  <div className="proof-preview-card">
                    <p className="proof-file-name">Selected: {form.proof.name}</p>
                    <img
                      src={URL.createObjectURL(form.proof)}
                      alt="preview"
                      className="proof-preview-image"
                    />
                  </div>
                )}
              </div>

              <div className="register-btn-row">
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => nav("/citizen-dashboard")}
                >
                  Cancel
                </button>

                <button type="submit" className="submit-complaint-btn">
                  Submit Complaint
                </button>
              </div>
            </form>
          </div>

          {/* Right Side Help Card */}
          <div className="register-side-card">
            <h3>Tips for Better Complaint Submission</h3>

            <ul>
              <li>✔ Mention the exact location clearly</li>
              <li>✔ Add a short but meaningful description</li>
              <li>✔ Upload proof image if possible</li>
              <li>✔ Select the correct complaint category</li>
            </ul>

            <div className="side-highlight-box">
              <h4>Why this matters?</h4>
              <p>
                Accurate complaints help officers identify the issue quickly and
                take faster action for resolution.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterComplaint;
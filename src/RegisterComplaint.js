import React, { useState } from "react";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";

function RegisterComplaint() {
  const nav = useNavigate();
  const user = JSON.parse(localStorage.getItem("loggedUser"));

  const [form, setForm] = useState({
    category: "",
    description: "",
    location: "",
    proof: ""
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "proof") {
      setForm({ ...form, proof: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const complaints = JSON.parse(localStorage.getItem("complaints")) || [];

    const newComplaint = {
      id: "CMP" + (10000 + complaints.length),
      email: user.email,
      category: form.category,
      description: form.description,
      location: form.location,
      proof: form.proof ? form.proof.name : "",
      status: "Pending",
      date: new Date().toLocaleString()
    };

    complaints.push(newComplaint);
    localStorage.setItem("complaints", JSON.stringify(complaints));

    alert("Complaint Registered Successfully!");
    nav("/citizen-dashboard");
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
          <li><button onClick={() => nav("/register-complaint")}>Register Complaint</button></li>
          <li><button onClick={() => nav("/my-complaints")}>My Complaints</button></li>
          <li><button onClick={() => nav("/feedback")}>Feedback</button></li>
          <li><button onClick={logout}>Logout</button></li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="dash-content">
        <h2>Register New Complaint</h2>

        <form onSubmit={handleSubmit} className="form-box">
          {/* Category */}
          <div className="form-group">
            <label>Category</label>
            <select name="category" onChange={handleChange} required>
              <option value="">Select Category</option>
              <option>Pothole</option>
              <option>Garbage</option>
              <option>Water Issue</option>
              <option>Drainage</option>
              <option>Street Light</option>
              <option>Other</option>
            </select>
          </div>

          {/* Location */}
          <div className="form-group">
            <label>Location</label>
            <input
              type="text"
              name="location"
              placeholder="Enter complaint location"
              onChange={handleChange}
              required
            />
          </div>

          {/* Description */}
          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              rows="4"
              placeholder="Describe the issue clearly"
              onChange={handleChange}
              required
            />
          </div>

          {/* Upload Proof */}
          <div className="form-group">
            <label>Upload Proof (Image)</label>
            <input
              type="file"
              name="proof"
              accept="image/*"
              onChange={handleChange}
            />
          </div>

          <button className="new-complaint-btn">
            Submit Complaint
          </button>
        </form>
      </div>
    </div>
  );
}

export default RegisterComplaint;
import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const nav = useNavigate();
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    const all = JSON.parse(localStorage.getItem("complaints")) || [];
    setComplaints(all);
  }, []);

  const logout = () => {
    localStorage.removeItem("loggedUser");
    nav("/");
  };

  const total = complaints.length;
  const pending = complaints.filter(c => c.status === "Pending").length;
  const progress = complaints.filter(c => c.status === "In Progress").length;
  const resolved = complaints.filter(c => c.status === "Resolved").length;

  return (
    <div className="dash-container">
      <div className="dash-header">
        <h2>Admin Dashboard 🛠</h2>
        <button className="logout-btn" onClick={logout}>Logout</button>
      </div>

      {/* Analytics */}
      <div className="dash-grid">
        <div className="card stat total">
          <h3>Total Complaints</h3>
          <p>{total}</p>
        </div>

        <div className="card stat pending">
          <h3>Pending</h3>
          <p>{pending}</p>
        </div>

        <div className="card stat progress">
          <h3>In Progress</h3>
          <p>{progress}</p>
        </div>

        <div className="card stat resolved">
          <h3>Resolved</h3>
          <p>{resolved}</p>
        </div>
      </div>

      {/* Complaints Table */}
      <div className="card" style={{ marginTop: "20px" }}>
        <h3>📋 All Complaints</h3>

        {complaints.length === 0 ? (
          <p>No complaints available.</p>
        ) : (
          complaints.map((c, i) => (
            <div key={i} className={`complaint-box ${c.status.toLowerCase()}`}>
              <h4>{c.title}</h4>
              <p><b>Citizen:</b> {c.email}</p>
              <p><b>Category:</b> {c.category}</p>
              <p><b>Description:</b> {c.description}</p>
              <p><b>Status:</b> {c.status}</p>
              <p className="date">{c.date}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
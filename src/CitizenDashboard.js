import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";

function CitizenDashboard() {
  const nav = useNavigate();
  const user = JSON.parse(localStorage.getItem("loggedUser"));

  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    const all = JSON.parse(localStorage.getItem("complaints")) || [];
    setComplaints(all.filter(c => c.email === user.email));
  }, [user.email]);

  const logout = () => {
    localStorage.removeItem("loggedUser");
    nav("/");
  };

  // Summary counts
  const total = complaints.length;
  const pending = complaints.filter(c => c.status === "Pending").length;
  const inProgress = complaints.filter(c => c.status === "In Progress").length;
  const resolved = complaints.filter(c => c.status === "Resolved").length;

  return (
    <div className="dash-main">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="logo">
          <h2>RESOLVEIT</h2>
          <p>Smart Civic Grievance</p>
        </div>
        <ul>
          <li>
  <button onClick={() => nav("/citizen-dashboard")}>
    Dashboard
  </button>
</li>
          <li><button onClick={() => nav("/register-complaint")}>Register Complaint</button></li>
          <li><button onClick={() => nav("/my-complaints")}>My Complaints</button></li>
          <li><button onClick={() => nav("/feedback")}>Feedback</button></li>
          <li><button onClick={logout}>Logout</button></li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="dash-content">
        <div className="dash-header">
          <h2>Welcome, {user.name}!</h2>
          <p>Submit and track your complaints here.</p>
        </div>

        {/* Summary Cards */}
        <div className="summary-cards">
          <div className="card"><h3>{total}</h3><p>Total</p></div>
          <div className="card"><h3>{pending}</h3><p>Pending</p></div>
          <div className="card"><h3>{inProgress}</h3><p>In Progress</p></div>
          <div className="card"><h3>{resolved}</h3><p>Resolved</p></div>
        </div>

        {/* New Complaint Button */}
        <button className="new-complaint-btn" onClick={() => nav("/register-complaint")}>
          + New Complaint
        </button>

        {/* Complaints Table */}
        <table className="complaints-table">
          <thead>
            <tr>
              <th>Complaint ID</th>
              <th>Category</th>
              <th>Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {complaints.map((c, i) => (
              <tr key={i}>
                <td>{c.id || `CMP${12345 + i}`}</td>
                <td>{c.category}</td>
                <td>{c.date.split(",")[0]}</td>
                <td>{c.status}</td>
                <td style={{ cursor: "pointer", color: "#3498db" }}>View</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CitizenDashboard;
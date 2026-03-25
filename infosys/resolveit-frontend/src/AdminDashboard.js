import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const nav = useNavigate();
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/complaints/all")
      .then((res) => res.json())
      .then((data) => setComplaints(data))
      .catch((err) => console.error(err));
  }, []);

  const total = complaints.length;
  const pending = complaints.filter((c) => c.status === "Pending").length;
  const assigned = complaints.filter((c) => c.status === "Assigned").length;
  const inProgress = complaints.filter((c) => c.status === "In Progress").length;
  const resolved = complaints.filter((c) => c.status === "Resolved").length;

  const logout = () => {
    localStorage.removeItem("loggedUser");
    nav("/");
  };

  const getStatusClass = (status) => {
    if (status === "Pending") return "status-pending";
    if (status === "Assigned") return "status-assigned";
    if (status === "In Progress") return "status-inprogress";
    if (status === "Resolved") return "status-resolved";
    return "status-default";
  };

  return (
    <div className="dash-main">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="logo">
          <h2>RESOLVEIT</h2>
          <p>Admin Panel</p>
        </div>

        <ul>
          <li>
            <button className="active" onClick={() => nav("/admin-dashboard")}>
              Dashboard
            </button>
          </li>
          <li>
            <button onClick={() => nav("/user-management")}>
              User Management
            </button>
          </li>
          <li>
            <button onClick={() => nav("/department-management")}>
              Department Management
            </button>
          </li>
          <li>
            <button onClick={() => nav("/complaints-overview")}>
              Complaint Oversight
            </button>
          </li>
          <li>
            <button onClick={() => nav("/reports")}>Reports</button>
          </li>
          <li>
            <button onClick={logout}>Logout</button>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="dash-content">
        {/* Top Banner */}
        <div className="admin-top-banner">
          <div>
            <h2>Welcome, Admin </h2>
            <p>
              Monitor complaint activities, manage departments, and track system
              performance from one central dashboard.
            </p>
          </div>

          <div className="admin-banner-badge">
            Smart Monitoring • Better Control
          </div>
        </div>

        {/* Summary Cards */}
        <div className="summary-cards admin-summary-cards">
          <div className="card total admin-card">
            <div className="card-icon">📋</div>
            <h3>{total}</h3>
            <p>Total Complaints</p>
          </div>

          <div className="card pending admin-card">
            <div className="card-icon">⏳</div>
            <h3>{pending}</h3>
            <p>Pending</p>
          </div>

          <div className="card assigned admin-card">
            <div className="card-icon">👤</div>
            <h3>{assigned}</h3>
            <p>Assigned</p>
          </div>

          <div className="card in-progress admin-card">
            <div className="card-icon">⚙️</div>
            <h3>{inProgress}</h3>
            <p>In Progress</p>
          </div>

          <div className="card resolved admin-card">
            <div className="card-icon">✅</div>
            <h3>{resolved}</h3>
            <p>Resolved</p>
          </div>
        </div>

        {/* Recent Complaints Section */}
        <div className="admin-table-section">
          <div className="admin-table-header">
            <div>
              <h3>Recent Complaints</h3>
              <p>Latest registered complaints across the system</p>
            </div>

            <button
              className="admin-view-all-btn"
              onClick={() => nav("/complaints-overview")}
            >
              View All
            </button>
          </div>

          {complaints.length === 0 ? (
            <div className="admin-empty-state">
              <h3>No complaints submitted yet</h3>
              <p>All newly registered complaints will appear here.</p>
            </div>
          ) : (
            <table className="complaints-table">
              <thead>
                <tr>
                  <th>Complaint ID</th>
                  <th>User Email</th>
                  <th>Category</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {complaints.slice(-5).reverse().map((c) => (
                  <tr key={c.id}>
                    <td>{c.complaintId}</td>
                    <td>{c.email}</td>
                    <td>{c.category}</td>
                    <td>{c.date?.split("T")[0]}</td>
                    <td>
                      <span className={`status-badge ${getStatusClass(c.status)}`}>
                        {c.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
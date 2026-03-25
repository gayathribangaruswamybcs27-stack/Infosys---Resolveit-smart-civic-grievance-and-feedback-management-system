import React, { useState, useEffect, useCallback } from "react";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";

function OfficerDashboard() {
  const nav = useNavigate();
  const user = JSON.parse(localStorage.getItem("loggedUser"));
  const [complaints, setComplaints] = useState([]);

  const fetchComplaints = useCallback(() => {
    if (!user || !user.email) return;

    fetch(`http://localhost:8080/api/complaints/officer/${user.email}`)
      .then((res) => res.json())
      .then((data) => setComplaints(data))
      .catch((err) => console.error(err));
  }, [user]);

  useEffect(() => {
    fetchComplaints();
  }, [fetchComplaints]);

  const logout = () => {
    localStorage.removeItem("loggedUser");
    nav("/");
  };

  const assignedCount = complaints.filter(
    (c) => c.status === "Assigned" || c.status === "Pending"
  ).length;

  const inProgressCount = complaints.filter(
    (c) => c.status === "In Progress"
  ).length;

  const resolvedCount = complaints.filter(
    (c) => c.status === "Resolved"
  ).length;

  return (
    <div className="dash-main">
      <div className="sidebar">
        <div className="logo">
          <h2>RESOLVEIT</h2>
          <p>Officer Panel</p>
        </div>

        <ul>
          <li>
            <button className="active" onClick={() => nav("/officer-dashboard")}>
              Dashboard
            </button>
          </li>
          <li>
            <button onClick={() => nav("/assigned-complaints")}>
              Assigned Complaints
            </button>
          </li>
          <li>
            <button onClick={logout}>Logout</button>
          </li>
        </ul>
      </div>

      <div className="dash-content">
        {/* Header Section */}
        <div
          style={{
            background: "linear-gradient(135deg, #eff6ff, #f8fbff)",
            borderRadius: "22px",
            padding: "28px",
            marginBottom: "24px",
            boxShadow: "0 10px 30px rgba(37, 99, 235, 0.08)",
            border: "1px solid #dbeafe",
          }}
        >
          <h2 style={{ margin: 0, color: "#1e3a8a", fontSize: "28px" }}>
            Welcome, {user?.name || "Officer"}
          </h2>
          <p style={{ margin: "10px 0 0 0", color: "#475569", fontSize: "15px" }}>
            Monitor your assigned complaints and manage progress smoothly from one place.
          </p>
        </div>

        {/* Summary Cards */}
        <div className="summary-cards">
          <div
            className="card"
            style={{
              background: "linear-gradient(135deg, #fef3c7, #fff7ed)",
              border: "1px solid #fde68a",
              borderRadius: "20px",
              boxShadow: "0 10px 24px rgba(245, 158, 11, 0.12)",
            }}
          >
            <h3 style={{ color: "#b45309", fontSize: "28px" }}>{assignedCount}</h3>
            <p style={{ color: "#92400e", fontWeight: "600" }}>Assigned</p>
          </div>

          <div
            className="card"
            style={{
              background: "linear-gradient(135deg, #dbeafe, #eff6ff)",
              border: "1px solid #bfdbfe",
              borderRadius: "20px",
              boxShadow: "0 10px 24px rgba(59, 130, 246, 0.12)",
            }}
          >
            <h3 style={{ color: "#1d4ed8", fontSize: "28px" }}>{inProgressCount}</h3>
            <p style={{ color: "#1e40af", fontWeight: "600" }}>In Progress</p>
          </div>

          <div
            className="card"
            style={{
              background: "linear-gradient(135deg, #dcfce7, #f0fdf4)",
              border: "1px solid #bbf7d0",
              borderRadius: "20px",
              boxShadow: "0 10px 24px rgba(34, 197, 94, 0.12)",
            }}
          >
            <h3 style={{ color: "#15803d", fontSize: "28px" }}>{resolvedCount}</h3>
            <p style={{ color: "#166534", fontWeight: "600" }}>Resolved</p>
          </div>

          <div
            className="card"
            style={{
              background: "linear-gradient(135deg, #ede9fe, #f5f3ff)",
              border: "1px solid #ddd6fe",
              borderRadius: "20px",
              boxShadow: "0 10px 24px rgba(139, 92, 246, 0.12)",
            }}
          >
            <h3 style={{ color: "#6d28d9", fontSize: "28px" }}>{complaints.length}</h3>
            <p style={{ color: "#5b21b6", fontWeight: "600" }}>Total Complaints</p>
          </div>
        </div>

        {/* Table Section */}
        <div
          style={{
            background: "#ffffff",
            borderRadius: "22px",
            padding: "22px",
            marginTop: "26px",
            boxShadow: "0 10px 30px rgba(15, 23, 42, 0.06)",
            border: "1px solid #e2e8f0",
          }}
        >
          <div style={{ marginBottom: "18px" }}>
            <h3 style={{ margin: 0, color: "#1e293b", fontSize: "22px" }}>
              Recent Assigned Complaints
            </h3>
            <p style={{ margin: "6px 0 0 0", color: "#64748b", fontSize: "14px" }}>
              View the latest complaints assigned to you and check their current status.
            </p>
          </div>

          <div className="table-wrapper">
            <table className="complaints-table officer-table">
              <thead>
                <tr>
                  <th>Complaint ID</th>
                  <th>Category</th>
                  <th>Location</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>

              <tbody>
                {complaints.length > 0 ? (
                  complaints.map((c) => (
                    <tr key={c.id}>
                      <td>{c.complaintId}</td>
                      <td>{c.category}</td>
                      <td>{c.location}</td>
                      <td>
                        <span
                          className={`status-badge ${
                            c.status === "Resolved"
                              ? "status-resolved"
                              : c.status === "In Progress"
                              ? "status-inprogress"
                              : c.status === "Assigned"
                              ? "status-assigned"
                              : "status-pending"
                          }`}
                        >
                          {c.status}
                        </span>
                      </td>
                      <td>{c.date?.split("T")[0]}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="no-data">
                      No complaints assigned yet
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OfficerDashboard;
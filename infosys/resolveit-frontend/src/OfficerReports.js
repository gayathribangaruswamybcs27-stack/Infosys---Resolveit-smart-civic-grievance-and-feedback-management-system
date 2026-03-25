import React from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

function OfficerReports() {
  const nav = useNavigate();

  // Dummy data for summary cards
  const totalAssigned = 50;
  const resolved = 30;
  const pending = 20;

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
          <p>Officer Panel</p>
        </div>
        <ul>
          <li>
            <button onClick={() => nav("/officer-dashboard")}>Dashboard</button>
          </li>
          <li>
            <button onClick={() => nav("/assigned-complaints")}>Assigned Complaints</button>
          </li>
          <li>
            <button className="active">Reports</button>
          </li>
          <li>
            <button onClick={logout}>Logout</button>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="dash-content">
        <h2 style={{ marginBottom: "20px" }}>Officer Reports</h2>

        {/* Summary Cards */}
        <div
          style={{
            display: "flex",
            gap: "20px",
            marginBottom: "30px",
            flexWrap: "wrap",
          }}
        >
          <div className="summary-card" style={{ background: "#3498db", color: "#fff" }}>
            <h3>Total Assigned</h3>
            <p style={{ fontSize: "24px", fontWeight: "bold" }}>{totalAssigned}</p>
          </div>
          <div className="summary-card" style={{ background: "#2ecc71", color: "#fff" }}>
            <h3>Resolved</h3>
            <p style={{ fontSize: "24px", fontWeight: "bold" }}>{resolved}</p>
          </div>
          <div className="summary-card" style={{ background: "#e74c3c", color: "#fff" }}>
            <h3>Pending</h3>
            <p style={{ fontSize: "24px", fontWeight: "bold" }}>{pending}</p>
          </div>
        </div>

        {/* Chart Placeholder */}
        <div
          style={{
            width: "100%",
            height: "300px",
            borderRadius: "10px",
            background: "#f1f1f1",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#555",
            fontSize: "18px",
          }}
        >
          Chart will appear here
        </div>
      </div>
    </div>
  );
}

export default OfficerReports;
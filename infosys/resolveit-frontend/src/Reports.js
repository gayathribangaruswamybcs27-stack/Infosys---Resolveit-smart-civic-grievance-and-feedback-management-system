import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

function Reports() {
  const nav = useNavigate();
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/complaints/all")
      .then((res) => res.json())
      .then((data) => setComplaints(data))
      .catch((err) => console.error(err));
  }, []);

  const logout = () => {
    localStorage.removeItem("loggedUser");
    nav("/");
  };

  const total = complaints.length;
  const pending = complaints.filter((c) => c.status === "Pending").length;
  const assigned = complaints.filter((c) => c.status === "Assigned").length;
  const inProgress = complaints.filter((c) => c.status === "In Progress").length;
  const resolved = complaints.filter((c) => c.status === "Resolved").length;

  const chartData = [
    { name: "Pending", count: pending, color: "#f4c542" },
    { name: "Assigned", count: assigned, color: "#4a90e2" },
    { name: "In Progress", count: inProgress, color: "#17a2b8" },
    { name: "Resolved", count: resolved, color: "#28a745" },
  ];

  const getPercent = (value) => {
    if (total === 0) return "0%";
    return ((value / total) * 100).toFixed(1) + "%";
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
          <li><button onClick={() => nav("/admin-dashboard")}>Dashboard</button></li>
          <li><button onClick={() => nav("/user-management")}>User Management</button></li>
          <li><button onClick={() => nav("/department-management")}>Department Management</button></li>
          <li><button onClick={() => nav("/complaints-overview")}>Complaint Oversight</button></li>
          <li><button className="active" onClick={() => nav("/reports")}>Reports</button></li>
          <li><button onClick={logout}>Logout</button></li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="dash-content reports-page">
        <div className="reports-header-glass">
          <div>
            <h2>Complaint Reports</h2>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="reports-summary-grid">
          <div className="report-glass-card total-card">
            <h4>Total Complaints</h4>
            <h2>{total}</h2>
            <p>Overall registered complaints</p>
          </div>

          <div className="report-glass-card pending-card">
            <h4>Pending</h4>
            <h2>{pending}</h2>
            <p>{getPercent(pending)} of all complaints</p>
          </div>

          <div className="report-glass-card assigned-card">
            <h4>Assigned</h4>
            <h2>{assigned}</h2>
            <p>{getPercent(assigned)} of all complaints</p>
          </div>

          <div className="report-glass-card progress-card">
            <h4>In Progress</h4>
            <h2>{inProgress}</h2>
            <p>{getPercent(inProgress)} of all complaints</p>
          </div>

          <div className="report-glass-card resolved-card">
            <h4>Resolved</h4>
            <h2>{resolved}</h2>
            <p>{getPercent(resolved)} of all complaints</p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="reports-chart-grid">
          {/* Bar Chart */}
          <div className="chart-glass-box">
            <div className="chart-box-header">
              <h3>Status Overview</h3>
              <span>Bar Chart</span>
            </div>

            <div style={{ width: "100%", height: 350 }}>
              <ResponsiveContainer>
                <BarChart
                  data={chartData}
                  margin={{ top: 20, right: 20, left: 0, bottom: 10 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.15)" />
                  <XAxis dataKey="name" stroke="#dbeafe" />
                  <YAxis allowDecimals={false} stroke="#dbeafe" />
                  <Tooltip
                    contentStyle={{
                      background: "rgba(15, 23, 42, 0.9)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "12px",
                      color: "#fff",
                    }}
                  />
                  <Bar dataKey="count" radius={[10, 10, 0, 0]}>
                    {chartData.map((entry, index) => (
                      <Cell key={`bar-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Pie Chart */}
          <div className="chart-glass-box">
            <div className="chart-box-header">
              <h3>Status Distribution</h3>
              <span>Pie Chart</span>
            </div>

            <div style={{ width: "100%", height: 260 }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={chartData}
                    dataKey="count"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={85}
                    label
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`pie-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      background: "rgba(15, 23, 42, 0.9)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "12px",
                      color: "#fff",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="status-legend-list">
              {chartData.map((item, index) => (
                <div key={index} className="status-legend-item">
                  <div className="legend-left">
                    <span
                      className="legend-dot"
                      style={{ backgroundColor: item.color }}
                    ></span>
                    <span>{item.name}</span>
                  </div>
                  <strong>{getPercent(item.count)}</strong>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reports;
import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";

function OfficerDashboard() {
  const nav = useNavigate();
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    const all = JSON.parse(localStorage.getItem("complaints")) || [];
    setComplaints(all);
  }, []);

  const updateStatus = (index, status) => {
    const all = [...complaints];
    all[index].status = status;
    localStorage.setItem("complaints", JSON.stringify(all));
    setComplaints(all);
    alert("Status updated successfully!");
  };

  const logout = () => {
    localStorage.removeItem("loggedUser");
    nav("/");
  };

  return (
    <div className="dash-container">
      <div className="dash-header">
        <h2>Officer Dashboard 👮</h2>
        <button className="logout-btn" onClick={logout}>Logout</button>
      </div>

      <div className="card">
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

              <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                <button
                  className="status-btn inprogress"
                  onClick={() => updateStatus(i, "In Progress")}
                >
                  In Progress
                </button>

                <button
                  className="status-btn resolved"
                  onClick={() => updateStatus(i, "Resolved")}
                >
                  Resolved
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default OfficerDashboard;
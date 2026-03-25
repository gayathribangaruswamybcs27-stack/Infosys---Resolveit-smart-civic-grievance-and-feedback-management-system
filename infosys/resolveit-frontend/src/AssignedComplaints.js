import React, { useState, useEffect, useCallback } from "react";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";

function AssignedComplaints() {
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

  const updateStatus = (id, currentStatus) => {
  let nextStatus = "Resolved";

  if (currentStatus === "Assigned" || currentStatus === "Pending") {
    nextStatus = "In Progress";
  } else if (currentStatus === "In Progress") {
    nextStatus = "Resolved";
  }

  fetch(`http://localhost:8080/api/complaints/status/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status: nextStatus })
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Failed to update complaint status");
      }
      return res.text();
    })
    .then(() => {
      fetchComplaints();

      if (nextStatus === "Resolved") {
        alert("Complaint resolved notification sent to email");
      } else if (nextStatus === "In Progress") {
        alert("Complaint marked as In Progress");
      }
    })
    .catch((err) => {
      console.error(err);
      alert("Failed to update complaint status");
    });
};

  const logout = () => {
    localStorage.removeItem("loggedUser");
    nav("/");
  };

  return (
    <div className="dash-main">
      <div className="sidebar">
        <div className="logo">
          <h2>RESOLVEIT</h2>
          <p>Officer Panel</p>
        </div>

        <ul>
          <li>
            <button onClick={() => nav("/officer-dashboard")}>
              Dashboard
            </button>
          </li>
          <li>
            <button className="active" onClick={() => nav("/assigned-complaints")}>
              Assigned Complaints
            </button>
          </li>
          <li>
            <button onClick={logout}>Logout</button>
          </li>
        </ul>
      </div>

      <div className="dash-content">
        <div className="officer-topbar">
          <div>
            <h2>Assigned Complaints</h2>
            <p>All complaints assigned to you are listed below.</p>
          </div>
        </div>

        <div className="table-card">
          <div className="table-header">
            <h3>Complaint List</h3>
          </div>

          <div className="table-wrapper">
            <table className="complaints-table officer-table">
              <thead>
                <tr>
                  <th>Complaint ID</th>
                  <th>Category</th>
                  <th>Location</th>
                  <th>Description</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {complaints.length > 0 ? (
                  complaints.map((c) => (
                    <tr key={c.id}>
                      <td>{c.complaintId}</td>
                      <td>{c.category}</td>
                      <td>{c.location}</td>
                      <td>{c.description}</td>
                      <td>{c.date?.split("T")[0]}</td>
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
                      <td>
                        {c.status !== "Resolved" ? (
                          <button
                            className="progress-btn"
                            onClick={() => updateStatus(c.id, c.status)}
                          >
                            {c.status === "Assigned" || c.status === "Pending"
                              ? "Mark In Progress"
                              : "Mark Resolved"}
                          </button>
                        ) : (
                          <span className="completed-text">Completed</span>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="no-data">
                      No assigned complaints found
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

export default AssignedComplaints;
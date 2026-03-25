import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

function ComplaintOversight() {
  const nav = useNavigate();
  const [complaints, setComplaints] = useState([]);
  const [assignments, setAssignments] = useState({});
  const [officers, setOfficers] = useState([]);

  useEffect(() => {
    fetchComplaints();
    fetchOfficers();
  }, []);

  const fetchComplaints = () => {
    fetch("http://localhost:8080/api/complaints/all")
      .then((res) => res.json())
      .then((data) => setComplaints(data))
      .catch((err) => console.error(err));
  };

  const fetchOfficers = () => {
    fetch("http://localhost:8080/api/users/officers")
      .then((res) => res.json())
      .then((data) => setOfficers(data))
      .catch((err) => console.error(err));
  };

  const logout = () => {
    localStorage.removeItem("loggedUser");
    nav("/");
  };

  const assignOfficer = (id) => {
    const officerEmail = assignments[id];

    if (!officerEmail) {
      alert("Please select officer");
      return;
    }

    fetch(
      `http://localhost:8080/api/complaints/assign/${id}?officerEmail=${encodeURIComponent(officerEmail)}`,
      {
        method: "PUT",
      }
    )
      .then((res) => res.text())
      .then((msg) => {
        alert(msg);
        fetchComplaints();
      })
      .catch((err) => console.error(err));
  };

  const total = complaints.length;
  const pending = complaints.filter((c) => c.status === "Pending").length;
  const assigned = complaints.filter((c) => c.status === "Assigned").length;
  const inProgress = complaints.filter((c) => c.status === "In Progress").length;
  const resolved = complaints.filter((c) => c.status === "Resolved").length;

  const getStatusClass = (status) => {
    if (status === "Pending") return "status-pending";
    if (status === "Assigned") return "status-assigned";
    if (status === "In Progress") return "status-inprogress";
    if (status === "Resolved") return "status-resolved";
    return "status-default";
  };

  return (
    <div className="dash-main">
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
          <li><button onClick={() => nav("/reports")}>Reports</button></li>
          <li><button onClick={logout}>Logout</button></li>
        </ul>
      </div>

      <div className="dash-content">
        <h2>Complaint Oversight</h2>

        <div className="summary-cards">
          <div className="card total">
            <h3>{total}</h3>
            <p>Total Complaints</p>
          </div>

          <div className="card pending">
            <h3>{pending}</h3>
            <p>Pending</p>
          </div>

          <div className="card assigned">
            <h3>{assigned}</h3>
            <p>Assigned</p>
          </div>

          <div className="card in-progress">
            <h3>{inProgress}</h3>
            <p>In Progress</p>
          </div>

          <div className="card resolved">
            <h3>{resolved}</h3>
            <p>Resolved</p>
          </div>
        </div>

        <table className="complaints-table">
          <thead>
            <tr>
              <th>Complaint ID</th>
              <th>Email</th>
              <th>Category</th>
              <th>Location</th>
              <th>Description</th>
              <th>Date</th>
              <th>Status</th>
              <th>Proof</th>
              <th>Assign Officer</th>
            </tr>
          </thead>

          <tbody>
            {complaints.map((c) => (
              <tr key={c.id}>
                <td>{c.complaintId}</td>
                <td>{c.email}</td>
                <td>{c.category}</td>
                <td>{c.location}</td>
                <td>{c.description}</td>
                <td>{c.date ? c.date.split("T")[0] : ""}</td>

                <td>
                  <span className={`status-badge ${getStatusClass(c.status)}`}>
                    {c.status}
                  </span>
                </td>

                <td>
                  {c.proof ? (
                    <a
                      href={`http://localhost:8080/api/complaints/proof/${c.id}`}
                      target="_blank"
                      rel="noreferrer"
                      className="track-btn"
                    >
                      View
                    </a>
                  ) : (
                    "No Proof"
                  )}
                </td>

                <td>
                  {c.officerEmail ? (
                    <span style={{ color: "green", fontWeight: "bold" }}>
                      {c.officerEmail}
                    </span>
                  ) : (
                    <>
                      <select
                        value={assignments[c.id] || ""}
                        onChange={(e) =>
                          setAssignments({
                            ...assignments,
                            [c.id]: e.target.value,
                          })
                        }
                      >
                        <option value="">Select Officer</option>

                        {officers.map((o) => (
                          <option key={o.id} value={o.email}>
                            {o.name} ({o.email})
                          </option>
                        ))}
                      </select>

                      <button
                        className="assign-btn"
                        onClick={() => assignOfficer(c.id)}
                      >
                        Assign
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ComplaintOversight;
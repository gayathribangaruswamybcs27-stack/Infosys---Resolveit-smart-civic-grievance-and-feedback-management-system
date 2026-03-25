import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";

function StatusTimeline({ timeline }) {
  return (
    <div className="timeline-container">
      <h3>Status Timeline</h3>
      <div className="timeline-line">
        {timeline.map((step, index) => {
          const isCompleted = step.date !== null;
          const colors = {
            "Complaint Submitted": "#3498db",
            "Assigned to Officer": "#f59e0b",
            "In Progress": "#3b82f6",
            "Resolved": "#16a34a",
          };
          return (
            <div key={index} className="timeline-step">
              <div
                className="timeline-dot"
                style={{
                  backgroundColor: isCompleted ? colors[step.status] : "#cfd8dc",
                  border: isCompleted ? "none" : "2px solid #cfd8dc",
                }}
              >
                {isCompleted ? "✓" : ""}
              </div>

              <div className="timeline-info">
                <div className="timeline-status" style={{ color: colors[step.status] }}>
                  {step.status}
                </div>
                <div className="timeline-desc">{step.desc}</div>
                <div className="timeline-date">
                  {step.date
                    ? new Date(step.date).toLocaleString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })
                    : "—"}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function MyComplaints() {
  const nav = useNavigate();
  const user = JSON.parse(localStorage.getItem("loggedUser"));

  const [complaints, setComplaints] = useState([]);
  const [filteredComplaints, setFilteredComplaints] = useState([]);
  const [selectedComplaint, setSelectedComplaint] = useState(null);

  // Search & filter state
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  useEffect(() => {
    fetch(`http://localhost:8080/api/complaints/my/${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setComplaints(data);
        setFilteredComplaints(data);
      })
      .catch((err) => console.error(err));
  }, [user.email]);

  // Filter logic
  useEffect(() => {
    let temp = [...complaints];

    if (searchTerm) {
      temp = temp.filter(
        (c) =>
          c.complaintId.toLowerCase().includes(searchTerm.toLowerCase()) ||
          c.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
          c.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (c.description && c.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
          c.status.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (categoryFilter) {
      temp = temp.filter((c) => c.category === categoryFilter);
    }

    if (dateFrom) {
      temp = temp.filter((c) => new Date(c.date) >= new Date(dateFrom));
    }
    if (dateTo) {
      temp = temp.filter((c) => new Date(c.date) <= new Date(dateTo));
    }

    setFilteredComplaints(temp);
  }, [searchTerm, categoryFilter, dateFrom, dateTo, complaints]);

  const logout = () => {
    localStorage.removeItem("loggedUser");
    nav("/");
  };

  const generateTimeline = (complaint) => {
    if (!complaint) return [];
    return [
      { status: "Complaint Submitted", desc: "Your complaint has been received.", date: complaint.date || null },
      { status: "Assigned to Officer", desc: complaint.officerEmail ? `Assigned to ${complaint.officerEmail}` : "Not yet assigned", date: complaint.assignedAt || null },
      { status: "In Progress", desc: complaint.inProgressAt ? "Work started on your complaint." : "Work not started yet", date: complaint.inProgressAt || null },
      { status: "Resolved", desc: complaint.resolvedAt ? "Complaint resolved." : "Complaint not resolved yet", date: complaint.resolvedAt || null },
    ];
  };

  return (
    <div className="dash-main">
      <div className="sidebar">
        <div className="logo">
          <h2>RESOLVEIT</h2>
          <p>Smart Civic Grievance</p>
        </div>
        <ul>
          <li><button onClick={() => nav("/citizen-dashboard")}>Dashboard</button></li>
          <li><button onClick={() => nav("/register-complaint")}>Register Complaint</button></li>
          <li><button className="active" onClick={() => nav("/my-complaints")}>My Complaints</button></li>
          <li><button onClick={() => nav("/feedback")}>Feedback</button></li>
          <li><button onClick={() => nav("/profile")}>Profile</button></li>
          <li><button onClick={logout}>Logout</button></li>
        </ul>
      </div>

      <div className="dash-content">
        <h2>My Complaints</h2>

        {/* Search & Filter Box */}
        <div className="search-filter-box">
          <input
            type="text"
            placeholder="Search complaints..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
            <option value="">All Categories</option>
            {[...new Set(complaints.map(c => c.category))].map((cat, idx) => (
              <option key={idx} value={cat}>{cat}</option>
            ))}
          </select>

          <input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} />
          <input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} />

          <button onClick={() => { setSearchTerm(""); setCategoryFilter(""); setDateFrom(""); setDateTo(""); }}>
            Clear
          </button>
        </div>

        {filteredComplaints.length === 0 ? (
          <p>No complaints found.</p>
        ) : (
          <table className="complaints-table">
            <thead>
              <tr>
                <th>Complaint ID</th>
                <th>Category</th>
                <th>Location</th>
                <th>Date</th>
                <th>Status</th>
                <th>Proof</th>
                <th>Track</th>
              </tr>
            </thead>
            <tbody>
              {filteredComplaints.map((c) => (
                <tr key={c.id}>
                  <td>{c.complaintId}</td>
                  <td>{c.category}</td>
                  <td>{c.location}</td>
                  <td>{c.date ? new Date(c.date).toLocaleDateString("en-IN") : "-"}</td>
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
                    {c.proof ? (
                      <a href={`http://localhost:8080/api/complaints/proof/${c.id}`} target="_blank" rel="noreferrer" style={{ color: "#3498db" }}>View</a>
                    ) : "No Proof"}
                  </td>
                  <td>
                    <button className="track-btn" onClick={() => setSelectedComplaint(c)}>Track Status</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {selectedComplaint && (
          <div className="timeline-popup">
            <StatusTimeline timeline={generateTimeline(selectedComplaint)} />
            <button className="close-btn" onClick={() => setSelectedComplaint(null)}>Close</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default MyComplaints;
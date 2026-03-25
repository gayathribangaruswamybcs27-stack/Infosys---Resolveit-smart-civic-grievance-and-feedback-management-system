import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

function UserManagement() {
  const nav = useNavigate();
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/api/users/all")
      .then((res) => res.json())
      .then((data) => {
        const onlyUsers = data.filter(
          (u) => u.role && u.role.toLowerCase() === "citizen"
        );
        setUsers(onlyUsers);
      })
      .catch((err) => console.error(err));
  }, []);

  const logout = () => {
    localStorage.removeItem("loggedUser");
    nav("/");
  };

  const toggleStatus = (id, currentStatus) => {
    fetch(`http://localhost:8080/api/users/status/${id}`, {
      method: "PUT",
    })
      .then((res) => res.json())
      .then((updatedUser) => {
        const updated = users.map((u) => (u.id === id ? updatedUser : u));
        setUsers(updated);
      })
      .catch((err) => console.error(err));
  };

  const filteredUsers = users.filter(
    (u) =>
      u.name?.toLowerCase().includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase()) ||
      String(u.id).includes(search)
  );

  const totalUsers = users.length;
  const activeUsers = users.filter((u) => u.status === "Active").length;
  const blockedUsers = users.filter((u) => u.status !== "Active").length;

  return (
    <div className="dash-main">
      <div className="sidebar">
        <div className="logo">
          <h2>RESOLVEIT</h2>
          <p>Admin Panel</p>
        </div>

        <ul>
          <li>
            <button onClick={() => nav("/admin-dashboard")}>Dashboard</button>
          </li>
          <li>
            <button className="active" onClick={() => nav("/user-management")}>
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

      <div className="dash-content">
        {/* Top Banner */}
        <div className="user-manage-banner">
          <div>
            <h2>User Management</h2>
            <p>
              View all registered citizens, monitor account status, and manage
              user access in one place.
            </p>
          </div>
          <div className="user-manage-badge">Admin Control Panel</div>
        </div>

        {/* Summary Cards */}
        <div className="user-manage-summary">
          <div className="user-summary-card total-users-card">
            <span>👥</span>
            <h3>{totalUsers}</h3>
            <p>Total Users</p>
          </div>

          <div className="user-summary-card active-users-card">
            <span>✅</span>
            <h3>{activeUsers}</h3>
            <p>Active Users</p>
          </div>

          <div className="user-summary-card blocked-users-card">
            <span>⛔</span>
            <h3>{blockedUsers}</h3>
            <p>Blocked Users</p>
          </div>
        </div>

        {/* Table Section */}
        <div className="user-manage-table-card">
          <div className="user-manage-table-header">
            <div>
              <h3>Citizen Accounts</h3>
              <p>Manage registered user accounts and status</p>
            </div>

            <input
              type="text"
              placeholder="Search by name, email or ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="user-search-box"
            />
          </div>

          {filteredUsers.length === 0 ? (
            <div className="user-empty-state">
              <h3>No users found</h3>
              <p>No matching citizen accounts are available.</p>
            </div>
          ) : (
            <table className="complaints-table">
              <thead>
                <tr>
                  <th>User ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredUsers.map((u) => (
                  <tr key={u.id}>
                    <td>{u.id}</td>
                    <td>{u.name}</td>
                    <td>{u.email}</td>
                    <td>
                      <span
                        className={`user-status-badge ${
                          u.status === "Active"
                            ? "user-status-active"
                            : "user-status-blocked"
                        }`}
                      >
                        {u.status}
                      </span>
                    </td>

                    <td>
                      <button
                        className={
                          u.status === "Active"
                            ? "block-user-btn"
                            : "activate-user-btn"
                        }
                        onClick={() => toggleStatus(u.id, u.status)}
                      >
                        {u.status === "Active" ? "Block" : "Activate"}
                      </button>
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

export default UserManagement;
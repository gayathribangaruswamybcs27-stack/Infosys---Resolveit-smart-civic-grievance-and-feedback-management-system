import React from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

function AdminSidebar() {
  const nav = useNavigate();

  const logout = () => {
    localStorage.removeItem("loggedUser");
    nav("/");
  };

  return (
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
          <button onClick={() => nav("/manage-departments")}>Manage Departments</button>
        </li>
        <li>
          <button onClick={() => nav("/manage-officers")}>Manage Officers</button>
        </li>
        <li>
          <button onClick={() => nav("/manage-users")}>Manage Users</button>
        </li>
        <li>
          <button onClick={() => nav("/complaints-overview")}>Complaints Overview</button>
        </li>
        <li>
          <button onClick={() => nav("/analytics-reports")}>Analytics & Reports</button>
        </li>
        <li>
          <button onClick={() => nav("/notifications")}>Notifications</button>
        </li>
        <li>
          <button onClick={logout}>Logout</button>
        </li>
      </ul>
    </div>
  );
}

export default AdminSidebar;
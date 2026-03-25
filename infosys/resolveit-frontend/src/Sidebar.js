// src/Sidebar.js
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

function Sidebar() {
  const nav = useNavigate();
  const user = JSON.parse(localStorage.getItem("loggedUser"));

  const logout = () => {
    localStorage.removeItem("loggedUser");
    nav("/");
  };

  return (
    <div className="sidebar">
      <div className="logo">
        <h2>RESOLVEIT</h2>
        <p>Smart Civic Grievance</p>
        {user && <p style={{ marginTop: "10px", fontSize: "14px" }}>Hello, {user.name}</p>}
      </div>

      <ul>
        {user?.role === "citizen" && (
          <>
            <li><button onClick={() => nav("/citizen-dashboard")}>Dashboard</button></li>
            <li><button onClick={() => nav("/register-complaint")}>Register Complaint</button></li>
            <li><button onClick={() => nav("/my-complaints")}>My Complaints</button></li>
            <li><button onClick={() => nav("/feedback")}>Feedback</button></li>
            <li><button onClick={() => nav("/profile")}>Profile</button></li>
          </>
        )}

        {user?.role === "officer" && (
          <>
            <li><button onClick={() => nav("/officer-dashboard")}>Dashboard</button></li>
          </>
        )}

        {user?.role === "admin" && (
          <>
            <li><button onClick={() => nav("/admin-dashboard")}>Dashboard</button></li>
          </>
        )}

        <li><button onClick={logout}>Logout</button></li>
      </ul>
    </div>
  );
}

export default Sidebar;
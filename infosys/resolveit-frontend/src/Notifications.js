import React, { useState } from "react";
import AdminSidebar from "./AdminSidebar";
import "./Dashboard.css";

function Notifications() {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (!message) return;
    fetch("http://localhost:8080/api/admin/notifications/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    })
      .then(() => {
        alert("Notification sent!");
        setMessage("");
      })
      .catch(err => console.error(err));
  };

  return (
    <div className="dash-main">
      <AdminSidebar />
      <div className="dash-content">
        <h2>Notifications</h2>
        <textarea
          rows="4"
          placeholder="Enter notification message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="form-group-input"
        />
        <button className="new-complaint-btn" onClick={handleSend}>
          Send Notification
        </button>
      </div>
    </div>
  );
}

export default Notifications;
import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Feedback() {
  const nav = useNavigate();
  const user = JSON.parse(localStorage.getItem("loggedUser"));
  const [complaints, setComplaints] = useState([]);
  const [feedbackData, setFeedbackData] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/complaints/my/${user.email}`)
      .then((res) => {
        const resolved = res.data.filter((c) => c.status === "Resolved");
        setComplaints(resolved);
      })
      .catch((err) => console.error(err));
  }, [user.email]);

  const handleChange = (e, id) => {
    const { name, value } = e.target;

    setFeedbackData({
      ...feedbackData,
      [id]: {
        ...feedbackData[id],
        [name]: value,
      },
    });
  };

  const handleStarClick = (id, rating) => {
    setFeedbackData({
      ...feedbackData,
      [id]: {
        ...feedbackData[id],
        rating: rating,
      },
    });
  };

  const handleSubmit = async (id) => {
    if (!feedbackData[id]?.feedback || !feedbackData[id]?.rating) {
      alert("Please provide both feedback and rating.");
      return;
    }

    const payload = {
      complaintId: id,
      email: user.email,
      feedback: feedbackData[id].feedback,
      rating: parseInt(feedbackData[id].rating),
    };

    try {
      await axios.post("http://localhost:8080/api/feedback/add", payload);
      alert("Feedback submitted successfully!");

      setFeedbackData({
        ...feedbackData,
        [id]: {},
      });
    } catch (err) {
      console.error(err);
      alert("Failed to submit feedback!");
    }
  };

  const logout = () => {
    localStorage.removeItem("loggedUser");
    nav("/");
  };

  const getRatingText = (rating) => {
    switch (rating) {
      case 1:
        return "Poor";
      case 2:
        return "Fair";
      case 3:
        return "Good";
      case 4:
        return "Very Good";
      case 5:
        return "Excellent";
      default:
        return "Select your rating";
    }
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
          <li><button onClick={() => nav("/my-complaints")}>My Complaints</button></li>
          <li><button className="active" onClick={() => nav("/feedback")}>Feedback</button></li>
          <li><button onClick={() => nav("/profile")}>Profile</button></li>
          <li><button onClick={logout}>Logout</button></li>
        </ul>
      </div>

      <div className="dash-content">
        {/* Header */}
        <div className="feedback-header-card">
          <div>
            <h2>Feedback & Rating</h2>
            <p>
              Share your experience for resolved complaints and help improve service quality.
            </p>
          </div>
          <div className="feedback-header-badge">
            {complaints.length} Resolved Complaint{complaints.length !== 1 ? "s" : ""}
          </div>
        </div>

        {/* Summary cards */}
        <div className="feedback-summary-grid">
          <div className="feedback-summary-card summary-total">
            <h4>Total Resolved</h4>
            <h3>{complaints.length}</h3>
            <p>Complaints ready for feedback</p>
          </div>

          <div className="feedback-summary-card summary-rating">
            <h4>Your Review Space</h4>
            <h3>★ 1 - 5</h3>
            <p>Rate your experience clearly</p>
          </div>

          <div className="feedback-summary-card summary-help">
            <h4>Why Feedback Matters</h4>
            <h3>Improve</h3>
            <p>Your feedback helps improve service quality</p>
          </div>
        </div>

        {complaints.length === 0 ? (
          <div className="feedback-empty-card">
            <div className="feedback-empty-icon">💬</div>
            <h3>No resolved complaints available</h3>
            <p>
              Once a complaint is resolved, you can submit feedback here.
            </p>
          </div>
        ) : (
          <div className="feedback-list">
            {complaints.map((c) => {
              const currentRating = feedbackData[c.complaintId]?.rating || 0;

              return (
                <div key={c.complaintId} className="feedback-complaint-card">
                  <div className="feedback-card-top">
                    <div>
                      <h3>{c.category}</h3>
                      <p>
                        Complaint ID: <strong>{c.complaintId}</strong>
                      </p>
                    </div>

                    <span className="feedback-status-pill">
                      {c.status}
                    </span>
                  </div>

                  <div className="feedback-meta-row">
                    <span className="feedback-meta-chip">📍 {c.location}</span>
                    <span className="feedback-meta-chip">
                      📅 {c.date ? c.date.split("T")[0] : "No date"}
                    </span>
                  </div>

                  <div className="feedback-description-box">
                    <p>
                      <strong>Description:</strong> {c.description}
                    </p>
                  </div>

                  <div className="feedback-rating-block">
                    <label>Your Rating</label>

                    <div className="feedback-stars-row">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span
                          key={star}
                          onClick={() => handleStarClick(c.complaintId, star)}
                          className={`feedback-star ${
                            star <= currentRating ? "selected" : ""
                          }`}
                        >
                          ★
                        </span>
                      ))}

                      <span className="feedback-rating-text">
                        {getRatingText(currentRating)}
                      </span>
                    </div>
                  </div>

                  <div className="feedback-textarea-block">
                    <label>Your Feedback</label>

                    <textarea
                      name="feedback"
                      rows="4"
                      placeholder="Write your feedback here..."
                      value={feedbackData[c.complaintId]?.feedback || ""}
                      onChange={(e) => handleChange(e, c.complaintId)}
                      className="feedback-textarea"
                    />
                  </div>

                  <div className="feedback-btn-row">
                    <button
                      onClick={() => handleSubmit(c.complaintId)}
                      className="feedback-submit-btn"
                    >
                      Submit Feedback
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default Feedback;
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaCheckCircle, FaUsers, FaUserTie, FaSmile } from "react-icons/fa";
import "./App.css";

function CountUp({ end, suffix = "" }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const increment = end / 100;
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, duration / 100);

    return () => clearInterval(timer);
  }, [end]);

  return (
    <h3>
      {count.toLocaleString()}
      {suffix}
    </h3>
  );
}

function LandingPage() {
  return (
    <div className="landing-page">

      {/* Navbar */}
      <nav className="navbar">
        <h1 className="logo">ResolveIt</h1>
        <div className="nav-buttons">
          <Link to="/login" className="login-btn">Login</Link>
          <Link to="/register" className="register-btn">Sign Up</Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="hero">
        <div className="hero-content">
          <h2>Smart Civic Grievance & Feedback System</h2>
          <p>
            Report potholes, water issues, drainage problems, and track your
            complaints in real-time
          </p>
          <Link to="/register" className="cta-btn">Get Started</Link>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stat-card">
          <div className="stat-icon"><FaCheckCircle /></div>
          <CountUp end={10000} suffix="+" />
          <p>Complaints Resolved</p>
        </div>

        <div className="stat-card">
          <div className="stat-icon"><FaUsers /></div>
          <CountUp end={5000} suffix="+" />
          <p>Active Citizens</p>
        </div>

        <div className="stat-card">
          <div className="stat-icon"><FaUserTie /></div>
          <CountUp end={250} suffix="+" />
          <p>Officers Connected</p>
        </div>

        <div className="stat-card">
          <div className="stat-icon"><FaSmile /></div>
          <CountUp end={98} suffix="%" />
          <p>Citizen Satisfaction</p>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <h3>Features</h3>
        <div className="feature-cards">
          <div className="feature-card">📝 Register Complaints</div>
          <div className="feature-card">📍 Track Status</div>
          <div className="feature-card">📊 Analytics & Reports</div>
          <div className="feature-card">⭐ Feedback & Rating</div>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works">
        <h3>How It Works</h3>
        <div className="steps">
          <div className="step-card">
            <span>1️⃣</span>
            <h4>Register Your Complaint</h4>
            <p>Fill in the details, add proof if available, and submit your complaint.</p>
          </div>
          <div className="step-card">
            <span>2️⃣</span>
            <h4>Assigned to Officer</h4>
            <p>Your complaint is assigned to the responsible officer for action.</p>
          </div>
          <div className="step-card">
            <span>3️⃣</span>
            <h4>Track Status</h4>
            <p>Monitor the progress and get notified when the issue is resolved.</p>
          </div>
          <div className="step-card">
            <span>4️⃣</span>
            <h4>Provide Feedback</h4>
            <p>Share your feedback to help improve civic services further.</p>
          </div>
        </div>
      </section>

      {/* Screenshots */}
      <section className="screenshots">
        <h3>Dashboard Preview</h3>
        <div className="screenshot-cards">
          <div className="screenshot-card">
            <h4>Citizen Dashboard</h4>
            <p>Easily submit complaints, track status, and give feedback.</p>
          </div>
          <div className="screenshot-card">
            <h4>Officer Dashboard</h4>
            <p>View assigned complaints, update status, and manage urgent issues.</p>
          </div>
          <div className="screenshot-card">
            <h4>Admin Reports</h4>
            <p>Monitor all complaints city-wide and generate analytics reports.</p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials">
        <h3>What Users Say</h3>
        <div className="testimonial-cards">
          <div className="testimonial-card">
            <p>"ResolveIt made reporting civic issues simple and fast!"</p>
            <h4>- A Citizen</h4>
          </div>
          <div className="testimonial-card">
            <p>"Tracking complaints in real-time improved efficiency tremendously."</p>
            <h4>- City Officer</h4>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <h3>Ready to improve your city?</h3>
        <Link to="/register" className="cta-btn">Get Started</Link>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2026 ResolveIt. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default LandingPage;
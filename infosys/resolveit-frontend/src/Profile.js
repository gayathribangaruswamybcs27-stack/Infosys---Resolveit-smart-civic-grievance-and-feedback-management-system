import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Profile() {
  const nav = useNavigate();
  const user = JSON.parse(localStorage.getItem("loggedUser"));

  const [profile, setProfile] = useState({
    userId: user.id,
    phone: "",
    address: "",
    city: "",
    area: "",
    pincode: "",
    contactMethod: "",
    about: "",
    profileImage: ""
  });



  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/profile/${user.id}`)
      .then((res) => {
        if (res.data) {
          setProfile(res.data);
        }
      })
      .catch((err) => console.log(err));
  }, [user.id]);

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value
    });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setProfile({
        ...profile,
        profileImage: reader.result
      });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const saveProfile = (e) => {
  e.preventDefault();

  axios
    .post("http://localhost:8080/api/profile/save", profile)
    .then(() => {
      alert("Profile saved successfully!");
    })
    .catch((err) => {
      console.log(err);
      alert("Error saving profile");
    });
};

  const logout = () => {
    localStorage.removeItem("loggedUser");
    nav("/");
  };

  return (
    <div className="dash-main">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="logo">
          <h2>RESOLVEIT</h2>
          <p>Smart Civic Grievance</p>
        </div>

        <ul>
          <li><button onClick={() => nav("/citizen-dashboard")}>Dashboard</button></li>
          <li><button onClick={() => nav("/register-complaint")}>Register Complaint</button></li>
          <li><button onClick={() => nav("/my-complaints")}>My Complaints</button></li>
          <li><button onClick={() => nav("/feedback")}>Feedback</button></li>
          <li><button className="active" onClick={() => nav("/profile")}>Profile</button></li>
          <li><button onClick={logout}>Logout</button></li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="dash-content">
        <div className="profile-hero-banner">
          <div>
            <h2>My Profile</h2>
            <p>
              Manage your personal information, contact details, and account preferences
              for a better grievance reporting experience.
            </p>
          </div>
          <div className="profile-hero-tag">Citizen Profile</div>
        </div>

        <div className="profile-mini-cards">
          <div className="profile-mini-card card-blue">
            <span>👤</span>
            <div>
              <h4>Account Holder</h4>
              <p>{user.name || "Citizen User"}</p>
            </div>
          </div>

          <div className="profile-mini-card card-purple">
            <span>📧</span>
            <div>
              <h4>Email</h4>
              <p>{user.email}</p>
            </div>
          </div>

          <div className="profile-mini-card card-green">
            <span>📍</span>
            <div>
              <h4>Location Info</h4>
              <p>{profile.city || "Not updated yet"}</p>
            </div>
          </div>
        </div>


        <div className="profile-layout-new">
          {/* Left Summary */}
          <div className="profile-left-panel">
            <div className="profile-avatar-card">
              {profile.profileImage ? (
                <img src={profile.profileImage} alt="profile" className="profile-avatar-big" />
              ) : (
                <img
                  src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                  alt="profile"
                  className="profile-avatar-big"
                />
              )}

              <h3>{user.name || "Citizen User"}</h3>
              <p>{user.email}</p>

              <div className="profile-status-pill">Active Account</div>
            </div>

            <div className="profile-info-box">
              <h4>Quick Info</h4>

              <div className="quick-info-item">
                <span>📞</span>
                <div>
                  <strong>Phone</strong>
                  <p>{profile.phone || "Not added"}</p>
                </div>
              </div>

              <div className="quick-info-item">
                <span>🏙️</span>
                <div>
                  <strong>City</strong>
                  <p>{profile.city || "Not added"}</p>
                </div>
              </div>

              <div className="quick-info-item">
                <span>📌</span>
                <div>
                  <strong>Pincode</strong>
                  <p>{profile.pincode || "Not added"}</p>
                </div>
              </div>

              <div className="quick-info-item">
                <span>✉️</span>
                <div>
                  <strong>Preferred Contact</strong>
                  <p>{profile.contactMethod || "Not selected"}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Form */}
          <div className="profile-right-panel">
            <form onSubmit={saveProfile}>
              <div className="profile-section-box colorful-section">
                <div className="section-title-row">
                  <h3>Edit Profile Details</h3>
                  <span>Update Now</span>
                </div>
                <p className="section-subtext">
                  Keep your profile details accurate so officers can contact you easily.
                </p>

                <div className="profile-upload-box-new">
                  <div className="upload-left">
                    <h4>Upload Profile Image</h4>
                    <p>Select a profile picture for your account.</p>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImage}
                    className="profile-file-input-new"
                  />
                </div>

                <div className="profile-form-grid-new">
                  <div className="profile-field">
                    <label>Phone Number</label>
                    <input
                      type="text"
                      name="phone"
                      value={profile.phone || ""}
                      onChange={handleChange}
                      placeholder="Enter your phone number"
                    />
                  </div>

                  <div className="profile-field">
                    <label>City</label>
                    <input
                      type="text"
                      name="city"
                      value={profile.city || ""}
                      onChange={handleChange}
                      placeholder="Enter your city"
                    />
                  </div>

                  <div className="profile-field">
                    <label>Area</label>
                    <input
                      type="text"
                      name="area"
                      value={profile.area || ""}
                      onChange={handleChange}
                      placeholder="Enter your area"
                    />
                  </div>

                  <div className="profile-field">
                    <label>Pincode</label>
                    <input
                      type="text"
                      name="pincode"
                      value={profile.pincode || ""}
                      onChange={handleChange}
                      placeholder="Enter pincode"
                    />
                  </div>

                  <div className="profile-field full-span">
                    <label>Preferred Contact Method</label>
                    <select
                      name="contactMethod"
                      value={profile.contactMethod || ""}
                      onChange={handleChange}
                    >
                      <option value="">Select</option>
                      <option value="Phone">Phone</option>
                      <option value="Email">Email</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="profile-section-box soft-purple-section">
                <h3>Address Information</h3>
                <textarea
                  name="address"
                  value={profile.address || ""}
                  onChange={handleChange}
                  placeholder="Enter your full address"
                />
              </div>

              <div className="profile-section-box soft-green-section">
                <h3>About You</h3>
                <textarea
                  name="about"
                  value={profile.about || ""}
                  onChange={handleChange}
                  placeholder="Write something about yourself"
                />
              </div>

              <div className="profile-save-wrap">
                <button className="profile-save-main-btn">Save Profile</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
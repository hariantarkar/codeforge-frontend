import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";
import { getMyProfile, updateMyProfile } from "../../services/UserService";
import { useAuth } from "../../context/AuthContext";
import "./ProfilePage.css";

const IconUser = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="4" />
    <path d="M4 20c0-4.4 3.6-7.5 8-7.5s8 3.1 8 7.5" />
  </svg>
);

const IconMail = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" />
    <path d="M3.5 6.5l8.5 6 8.5-6" />
  </svg>
);

const IconLayers = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3 2 8.5 12 14l10-5.5L12 3Z" />
    <path d="M2 15.5 12 21l10-5.5" />
  </svg>
);

const IconCalendar = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3.5" y="5" width="17" height="15.5" rx="2.2" />
    <path d="M3.5 9.5h17M8 3v4M16 3v4" />
  </svg>
);

export default function ProfilePage() {
     const navigate = useNavigate();
  const { user, logout } = useAuth();
  //const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getMyProfile();
        setProfile(response.data);
        setEmail(response.data.email);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");

    const emailRegex = /^[A-Za-z0-9]+[A-Za-z0-9._%+-]*@[A-Za-z0-9-]+\.[A-Za-z]{2,3}$/;
    if (!emailRegex.test(email.trim())) {
      setError("Enter a valid email address");
      return;
    }

    setIsSaving(true);
    try {
      const response = await updateMyProfile(email.trim());
      setProfile(response.data);
      setSuccessMsg("Profile updated. Please sign in again with your new email.");
setTimeout(() => {
  logout();
  navigate("/login");
}, 1500);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSaving(false);
    }
  };

  const formattedJoinDate = profile?.createdAt
    ? new Date(profile.createdAt).toLocaleDateString(undefined, {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "";

  return (
    <div className="pp-page">
      <Navbar />

      <div className="pp-content">
        <h1 className="pp-title">Profile</h1>

        {isLoading ? (
          <div className="pp-loading">Loading profile...</div>
        ) : (
          <div className="pp-grid">
            <div className="pp-card pp-card--stats">
              <div className="pp-avatar">
                <IconUser />
              </div>
              <h2 className="pp-username">{profile?.username}</h2>
              <span className="pp-role-badge">{profile?.role}</span>

              <div className="pp-stat-row">
                <div className="pp-stat-icon">
                  <IconLayers />
                </div>
                <div>
                  <div className="pp-stat-value">{profile?.totalProjects}</div>
                  <div className="pp-stat-label">Projects</div>
                </div>
              </div>

              <div className="pp-stat-row">
                <div className="pp-stat-icon">
                  <IconCalendar />
                </div>
                <div>
                  <div className="pp-stat-value">{formattedJoinDate}</div>
                  <div className="pp-stat-label">Member since</div>
                </div>
              </div>
            </div>

            <div className="pp-card pp-card--form">
              <h3 className="pp-form-title">Account details</h3>
              <p className="pp-form-sub">Update the email address associated with your account.</p>

              <form onSubmit={handleSubmit} className="pp-form">
                {successMsg && <div className="pp-alert pp-alert--success">{successMsg}</div>}
                {error && <div className="pp-alert pp-alert--error">{error}</div>}

                <div className="pp-field">
                  <label className="pp-label" htmlFor="email">
                    Email address
                  </label>
                  <div className="pp-input-wrap">
                    <span className="pp-input-icon">
                      <IconMail />
                    </span>
                    <input
                      id="email"
                      type="email"
                      className="pp-input"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <button type="submit" className="pp-save-btn" disabled={isSaving || email === profile?.email}>
                  {isSaving ? "Saving..." : "Save changes"}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
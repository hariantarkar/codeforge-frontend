import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import ThemeToggle from "../common/ThemeToggle";
import "./Navbar.css";

const IconBracket = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 4 4 12l5 8" />
    <path d="M15 4l5 8-5 8" />
  </svg>
);

const IconUser = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="3.5" />
    <path d="M5 20c0-3.6 3.1-6 7-6s7 2.4 7 6" />
  </svg>
);

const IconLogout = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);

export default function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="cf-navbar">
      <button className="cf-navbar-brand" onClick={() => navigate("/dashboard")}>
        <span className="cf-navbar-brand-mark">
          <IconBracket />
        </span>
        <span className="cf-navbar-brand-text">
          Code<span className="cf-navbar-brand-accent">Forge</span>
        </span>
      </button>

      <div className="cf-navbar-right">
        <ThemeToggle />

        <button className="cf-navbar-user" onClick={() => navigate("/profile")}>
          <IconUser />
          <span>{user?.username}</span>
        </button>

        <button className="cf-navbar-logout" onClick={handleLogout} aria-label="Sign out" title="Sign out">
          <IconLogout />
        </button>
      </div>
    </header>
  );
}
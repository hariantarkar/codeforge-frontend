import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../services/AuthService";
import "./SignupPage.css";

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

const IconMail = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" />
    <path d="M3.5 6.5l8.5 6 8.5-6" />
  </svg>
);

const IconLock = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4.5" y="10.5" width="15" height="10" rx="2" />
    <path d="M7.5 10.5V7a4.5 4.5 0 0 1 9 0v3.5" />
  </svg>
);

const IconEye = ({ off }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7Z" />
    <circle cx="12" cy="12" r="3" />
    {off && <line x1="3" y1="21" x2="21" y2="3" />}
  </svg>
);

const IconArrowRight = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="4" y1="12" x2="20" y2="12" />
    <polyline points="13 5 20 12 13 19" />
  </svg>
);

const IconTerminal = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2.5" y="4" width="19" height="16" rx="2" />
    <path d="M6.5 9.5 10 12.5 6.5 15.5" />
    <path d="M12.5 15.5h5" />
  </svg>
);

const IconLayers = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3 2 8.5 12 14l10-5.5L12 3Z" />
    <path d="M2 15.5 12 21l10-5.5" />
  </svg>
);

export default function SignupPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};
    // Mirrors backend RegisterRequest @Pattern regexes exactly
    const usernameRegex = /^[A-Za-z0-9_ ]{3,30}$/;
    const emailRegex = /^[A-Za-z0-9]+[A-Za-z0-9._%+-]*@[A-Za-z0-9-]+\.[A-Za-z]{2,3}$/;

    const trimmedUsername = formData.username.trim();
    if (!trimmedUsername) {
      newErrors.username = "Username is required";
    } else if (!usernameRegex.test(trimmedUsername)) {
      newErrors.username = "Username must be 3-30 characters, letters/numbers/underscore/space only";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = "Enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6 || formData.password.length > 20) {
      newErrors.password = "Password must be between 6 and 20 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");
    setSuccessMsg("");

    if (!validate()) return;

    setIsSubmitting(true);
    try {
      await registerUser(formData);

      setSuccessMsg("Account created. Redirecting to sign in...");
      setFormData({ username: "", email: "", password: "" });
      setErrors({});

      setTimeout(() => {
        navigate("/login");
      }, 1200);
    } catch (err) {
      setApiError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="cf-auth-page">
      <div className="cf-auth-card">
        {/* Left panel */}
        <div className="cf-auth-panel cf-auth-panel--left">
          <button className="cf-auth-brand" onClick={() => navigate("/")}>
            <span className="cf-auth-brand-mark">
              <IconBracket />
            </span>
            <span className="cf-auth-brand-text">
              Code<span className="cf-auth-brand-accent">Forge</span>
            </span>
          </button>

          <h1 className="cf-auth-title">
            Start writing
            <br />
            Java today.
          </h1>

          <p className="cf-auth-subtext">
            Create an account to save your projects and run code from any browser — no local setup required.
          </p>

          <div className="cf-auth-features">
            <div className="cf-auth-feature">
              <div className="cf-auth-feature-icon">
                <IconLayers />
              </div>
              <div>
                <div className="cf-auth-feature-title">Projects that persist</div>
                <div className="cf-auth-feature-desc">Your work is saved to your account, not your browser tab.</div>
              </div>
            </div>

            <div className="cf-auth-feature">
              <div className="cf-auth-feature-icon">
                <IconTerminal />
              </div>
              <div>
                <div className="cf-auth-feature-title">Real compile output</div>
                <div className="cf-auth-feature-desc">See actual javac errors, not a sanitized approximation.</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right panel */}
        <div className="cf-auth-panel cf-auth-panel--right">
          <h2 className="cf-auth-welcome">Create account</h2>
          <p className="cf-auth-welcome-sub">Set up your CodeForge account to get started.</p>

          <form onSubmit={handleSubmit} className="cf-auth-form">
            {successMsg && <div className="cf-auth-alert cf-auth-alert--success">{successMsg}</div>}
            {apiError && <div className="cf-auth-alert cf-auth-alert--error">{apiError}</div>}

            <div className="cf-auth-field">
              <label className="cf-auth-label" htmlFor="username">
                Full name
              </label>
              <div className="cf-auth-input-wrap">
                <span className="cf-auth-input-icon">
                  <IconUser />
                </span>
                <input
                  id="username"
                  name="username"
                  type="text"
                  className="cf-auth-input"
                  placeholder="e.g. Your name"
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>
              {errors.username && <span className="cf-auth-error">{errors.username}</span>}
            </div>

            <div className="cf-auth-field">
              <label className="cf-auth-label" htmlFor="email">
                Email address
              </label>
              <div className="cf-auth-input-wrap">
                <span className="cf-auth-input-icon">
                  <IconMail />
                </span>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="cf-auth-input"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              {errors.email && <span className="cf-auth-error">{errors.email}</span>}
            </div>

            <div className="cf-auth-field">
              <label className="cf-auth-label" htmlFor="password">
                Password
              </label>
              <div className="cf-auth-input-wrap">
                <span className="cf-auth-input-icon">
                  <IconLock />
                </span>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  className="cf-auth-input"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="cf-auth-input-icon cf-auth-input-icon--right"
                  onClick={() => setShowPassword((s) => !s)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  <IconEye off={showPassword} />
                </button>
              </div>
              {errors.password ? (
                <span className="cf-auth-error">{errors.password}</span>
              ) : (
                <span className="cf-auth-hint">6-20 characters.</span>
              )}
            </div>

            <button type="submit" className="cf-auth-btn cf-auth-btn--primary" disabled={isSubmitting}>
              {isSubmitting ? "Creating account..." : "Create account"}
              {!isSubmitting && <IconArrowRight />}
            </button>
          </form>

          <div className="cf-auth-divider">
            <span>OR</span>
          </div>

          <button type="button" className="cf-auth-btn cf-auth-btn--outline" onClick={() => navigate("/login")}>
            Already have an account? Sign in
          </button>
        </div>
      </div>
    </div>
  );
}
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../services/AuthService";
import { useAuth } from "../../context/AuthContext";
import "./LoginPage.css";

const IconBracket = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 4 4 12l5 8" />
    <path d="M15 4l5 8-5 8" />
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

const IconPlay = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <path d="M6 4.5v15l13-7.5-13-7.5Z" />
  </svg>
);

const IconShield = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2 4 5v6c0 5 3.5 8.5 8 11 4.5-2.5 8-6 8-11V5l-8-3Z" />
    <path d="M9 12.2l2 2 4-4.4" />
  </svg>
);

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
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
    const emailRegex = /^[A-Za-z0-9]+[A-Za-z0-9._%+-]*@[A-Za-z0-9-]+\.[A-Za-z]{2,3}$/;

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = "Enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");

    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const response = await loginUser(formData);
      const { token, username, role } = response.data;

      login({ token, username, role });
      navigate("/dashboard");
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
            Welcome back
            <br />
            to your workspace.
          </h1>

          <p className="cf-auth-subtext">
            Sign in to pick up where you left off — your projects and files are waiting.
          </p>

          <div className="cf-auth-features">
            <div className="cf-auth-feature">
              <div className="cf-auth-feature-icon">
                <IconShield />
              </div>
              <div>
                <div className="cf-auth-feature-title">Secure sign-in</div>
                <div className="cf-auth-feature-desc">JWT-based authentication keeps your account protected.</div>
              </div>
            </div>

            <div className="cf-auth-feature">
              <div className="cf-auth-feature-icon">
                <IconPlay />
              </div>
              <div>
                <div className="cf-auth-feature-title">Pick up instantly</div>
                <div className="cf-auth-feature-desc">Open a project and start running code right away.</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right panel */}
        <div className="cf-auth-panel cf-auth-panel--right">
          <h2 className="cf-auth-welcome">Sign in</h2>
          <p className="cf-auth-welcome-sub">Enter your email and password to continue.</p>

          <form onSubmit={handleSubmit} className="cf-auth-form">
            {apiError && <div className="cf-auth-alert cf-auth-alert--error">{apiError}</div>}

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
                  placeholder="Enter your password"
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
              {errors.password && <span className="cf-auth-error">{errors.password}</span>}
            </div>

            <button type="submit" className="cf-auth-btn cf-auth-btn--primary" disabled={isSubmitting}>
              {isSubmitting ? "Signing in..." : "Sign in"}
              {!isSubmitting && <IconArrowRight />}
            </button>
          </form>

          <div className="cf-auth-divider">
            <span>OR</span>
          </div>

          <button type="button" className="cf-auth-btn cf-auth-btn--outline" onClick={() => navigate("/signup")}>
            Create a new account
          </button>
        </div>
      </div>
    </div>
  );
}
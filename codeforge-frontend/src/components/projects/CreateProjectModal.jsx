import React, { useState } from "react";
import "./CreateProjectModal.css";

export default function CreateProjectModal({ onClose, onCreate, isSubmitting }) {
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = name.trim();

    if (!trimmed) {
      setError("Project name is required");
      return;
    }
    if (trimmed.length < 2 || trimmed.length > 50) {
      setError("Project name must be between 2 and 50 characters");
      return;
    }

    onCreate(trimmed);
  };

  return (
    <div className="cpm-overlay" onClick={onClose}>
      <div className="cpm-modal" onClick={(e) => e.stopPropagation()}>
        <h3 className="cpm-title">New project</h3>
        <form onSubmit={handleSubmit}>
          <input
            className="cpm-input"
            type="text"
            placeholder="e.g. Algorithms Practice"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setError("");
            }}
            autoFocus
          />
          {error && <span className="cpm-error">{error}</span>}

          <div className="cpm-actions">
            <button type="button" className="cpm-btn cpm-btn--ghost" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="cpm-btn cpm-btn--primary" disabled={isSubmitting}>
              {isSubmitting ? "Creating..." : "Create project"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
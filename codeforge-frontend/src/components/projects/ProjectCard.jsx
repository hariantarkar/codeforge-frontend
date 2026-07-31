import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ProjectCard.css";

const IconFolder = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 6.5a2 2 0 0 1 2-2h4l2 2.5h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-10.5Z" />
  </svg>
);

const IconMore = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <circle cx="5" cy="12" r="1.8" />
    <circle cx="12" cy="12" r="1.8" />
    <circle cx="19" cy="12" r="1.8" />
  </svg>
);

export default function ProjectCard({ project, onRename, onDelete }) {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isRenaming, setIsRenaming] = useState(false);
  const [newName, setNewName] = useState(project.name);

  const formattedDate = new Date(project.updatedAt).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });

  const handleRenameSubmit = (e) => {
    e.preventDefault();
    const trimmed = newName.trim();
    if (trimmed && trimmed !== project.name) {
      onRename(project.id, trimmed);
    }
    setIsRenaming(false);
  };

  return (
    <div className="pc-card" onClick={() => !isRenaming && navigate(`/editor/${project.id}`)}>
      <div className="pc-top">
        <div className="pc-icon">
          <IconFolder />
        </div>
        <div className="pc-menu-wrap" onClick={(e) => e.stopPropagation()}>
          <button className="pc-menu-btn" onClick={() => setMenuOpen((v) => !v)} aria-label="Project options">
            <IconMore />
          </button>
          {menuOpen && (
            <div className="pc-menu">
              <button
                onClick={() => {
                  setIsRenaming(true);
                  setMenuOpen(false);
                }}
              >
                Rename
              </button>
              <button
                className="pc-menu-danger"
                onClick={() => {
                  setMenuOpen(false);
                  onDelete(project.id, project.name);
                }}
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

      {isRenaming ? (
        <form onSubmit={handleRenameSubmit} onClick={(e) => e.stopPropagation()}>
          <input
            className="pc-rename-input"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onBlur={handleRenameSubmit}
            autoFocus
          />
        </form>
      ) : (
        <h3 className="pc-name">{project.name}</h3>
      )}

      <div className="pc-meta">
        <span>{project.fileCount} file{project.fileCount === 1 ? "" : "s"}</span>
        <span className="pc-dot">·</span>
        <span>Updated {formattedDate}</span>
      </div>
    </div>
  );
}
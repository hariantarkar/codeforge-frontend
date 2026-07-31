import React, { useState } from "react";
import "./FileExplorer.css";

const IconFile = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2.5h8l4 4v14a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-17a1 1 0 0 1 1-1Z" />
    <path d="M14 2.5v4h4" />
  </svg>
);

const IconPlus = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const IconTrash = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 7h16" />
    <path d="M9 7V4.5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1V7" />
    <path d="M6 7l1 13a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1l1-13" />
  </svg>
);
const IconClose = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="5" x2="19" y2="19" />
    <line x1="19" y1="5" x2="5" y2="19" />
  </svg>
);

export default function FileExplorer({ files, activeFileId, onSelectFile, onCreateFile, onDeleteFile,isOpen, onClose }) {
  const [isCreating, setIsCreating] = useState(false);
  const [newFileName, setNewFileName] = useState("");

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    const trimmed = newFileName.trim();
    if (trimmed) {
      onCreateFile(trimmed.endsWith(".java") ? trimmed : `${trimmed}.java`);
    }
    setNewFileName("");
    setIsCreating(false);
  };

  return (
   <div className={`fe-panel ${isOpen ? "fe-panel--open" : ""}`}>
      <div className="fe-header">
        <span>Files</span>
        <div className="fe-header-actions">
          <button className="fe-add-btn" onClick={() => setIsCreating(true)} aria-label="New file">
            <IconPlus />
          </button>
          <button className="fe-close-btn" onClick={onClose} aria-label="Close files">
            <IconClose />
          </button>
        </div>
      </div>

      <div className="fe-list">
        {files.map((file) => (
          <div
            key={file.id}
            className={`fe-item ${activeFileId === file.id ? "fe-item--active" : ""}`}
            onClick={() => onSelectFile(file.id)}
          >
            <IconFile />
            <span className="fe-item-name">{file.fileName}</span>
            <button
              className="fe-delete-btn"
              onClick={(e) => {
                e.stopPropagation();
                onDeleteFile(file.id, file.fileName);
              }}
              aria-label="Delete file"
            >
              <IconTrash />
            </button>
          </div>
        ))}

        {isCreating && (
          <form onSubmit={handleCreateSubmit} className="fe-new-form">
            <input
              className="fe-new-input"
              placeholder="Main.java"
              value={newFileName}
              onChange={(e) => setNewFileName(e.target.value)}
              onBlur={handleCreateSubmit}
              autoFocus
            />
          </form>
        )}

        {files.length === 0 && !isCreating && (
          <div className="fe-empty">No files yet</div>
        )}
      </div>
    </div>
  );
}


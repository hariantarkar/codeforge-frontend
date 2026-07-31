import React from "react";
import "./RunButton.css";

const IconPlay = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <path d="M6 4.5v15l13-7.5-13-7.5Z" />
  </svg>
);

const IconSave = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 3h11l3 3v15H5V3Z" />
    <path d="M8 3v6h8V3" />
  </svg>
);

export default function RunButton({ onRun, onSave, isRunning, isSaving, hasUnsavedChanges }) {
  return (
    <div className="rb-bar">
      <button className="rb-save" onClick={onSave} disabled={isSaving || !hasUnsavedChanges}>
        <IconSave />
        {isSaving ? "Saving..." : hasUnsavedChanges ? "Save" : "Saved"}
      </button>

      <button className={`rb-run ${isRunning ? "rb-run--busy" : ""}`} onClick={onRun} disabled={isRunning}>
        <IconPlay />
        {isRunning ? "Running..." : "Run"}
      </button>
    </div>
  );
}


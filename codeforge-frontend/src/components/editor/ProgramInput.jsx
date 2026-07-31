import React, { useState } from "react";
import "./ProgramInput.css";

const IconChevron = ({ open }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform 150ms ease" }}
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

export default function ProgramInput({ value, onChange }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="pi-panel">
      <button className="pi-toggle" onClick={() => setIsOpen((v) => !v)}>
        <span>Input (provide before running) {value ? "· set" : ""}</span>
        <IconChevron open={isOpen} />
      </button>

      {isOpen && (
        <textarea
          className="pi-textarea"
          placeholder={"If your program reads input (e.g. Scanner), enter it here before clicking Run — one value per line:\n5\n10"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={3}
        />
      )}
    </div>
  );
}
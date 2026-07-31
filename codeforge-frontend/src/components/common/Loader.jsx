import React from "react";
import "./Loader.css";

export default function Loader({ size = "md" }) {
  return (
    <div className={`loader loader--${size}`}>
      <span />
      <span />
      <span />
    </div>
  );
}
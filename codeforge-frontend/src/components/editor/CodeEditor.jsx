import React from "react";
import Editor from "@monaco-editor/react";
import { useTheme } from "../../context/ThemeContext";
import "./CodeEditor.css";

export default function CodeEditor({ value, onChange, fileName }) {
  const { theme } = useTheme();

  return (
    <div className="ce-wrapper">
      <Editor
        height="100%"
        language="java"
        path={fileName}
        value={value}
        onChange={(val) => onChange(val ?? "")}
        theme={theme === "dark" ? "vs-dark" : "light"}
        options={{
          fontFamily: "JetBrains Mono, monospace",
          fontSize: 14,
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 4,
          padding: { top: 16 },
        }}
      />
    </div>
  );
}
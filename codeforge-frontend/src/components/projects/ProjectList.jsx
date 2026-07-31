import React from "react";
import ProjectCard from "./ProjectCard";
import "./ProjectList.css";

const IconFolderPlus = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 6.5a2 2 0 0 1 2-2h4l2 2.5h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-10.5Z" />
    <line x1="12" y1="11" x2="12" y2="16" />
    <line x1="9.5" y1="13.5" x2="14.5" y2="13.5" />
  </svg>
);

export default function ProjectList({ projects, onRename, onDelete, onCreateClick }) {
  if (projects.length === 0) {
    return (
      <div className="pl-empty">
        <div className="pl-empty-icon">
          <IconFolderPlus />
        </div>
        <h3 className="pl-empty-title">No projects yet</h3>
        <p className="pl-empty-desc">Create a project to start writing and running Java code.</p>
        <button className="pl-empty-btn" onClick={onCreateClick}>
          Create your first project
        </button>
      </div>
    );
  }

  return (
    <div className="pl-grid">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} onRename={onRename} onDelete={onDelete} />
      ))}
    </div>
  );
}
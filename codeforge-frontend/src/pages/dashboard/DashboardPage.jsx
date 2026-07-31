import React, { useState, useEffect } from "react";
import Navbar from "../../components/layout/Navbar";
import { useToast } from "../../context/ToastContext";
import ProjectList from "../../components/projects/ProjectList";
import CreateProjectModal from "../../components/projects/CreateProjectModal";
import { getAllProjects, createProject, renameProject, deleteProject } from "../../services/ProjectService";
import "./DashboardPage.css";

const IconPlus = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

export default function DashboardPage() {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
const { showToast } = useToast();

  const fetchProjects = async () => {
    setIsLoading(true);
    setError("");
    try {
      const response = await getAllProjects();
      setProjects(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleCreate = async (name) => {
    setIsCreating(true);
    try {
      const response = await createProject(name);
      setProjects((prev) => [response.data, ...prev]);
      setShowCreateModal(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsCreating(false);
    }
  };

  const handleRename = async (projectId, newName) => {
    try {
      const response = await renameProject(projectId, newName);
      setProjects((prev) => prev.map((p) => (p.id === projectId ? response.data : p)));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (projectId, projectName) => {
    const confirmed = window.confirm(`Delete "${projectName}"? This cannot be undone.`);
    if (!confirmed) return;

    try {
      await deleteProject(projectId);
      setProjects((prev) => prev.filter((p) => p.id !== projectId));
       showToast(`"${projectName}" deleted.`, "success");
    } catch (err) {
      showToast(err.message, "error");
    }
  };

  return (
    <div className="dp-page">
      <Navbar />

      <div className="dp-content">
        <div className="dp-header">
          <div>
            <h1 className="dp-title">Your projects</h1>
            <p className="dp-subtitle">
              {projects.length} project{projects.length === 1 ? "" : "s"}
            </p>
          </div>
          <button className="dp-create-btn" onClick={() => setShowCreateModal(true)}>
            <IconPlus />
            New project
          </button>
        </div>

        {error && <div className="dp-alert">{error}</div>}

        {isLoading ? (
          <div className="dp-loading">Loading projects...</div>
        ) : (
          <ProjectList
            projects={projects}
            onRename={handleRename}
            onDelete={handleDelete}
            onCreateClick={() => setShowCreateModal(true)}
          />
        )}
      </div>

      {showCreateModal && (
        <CreateProjectModal
          onClose={() => setShowCreateModal(false)}
          onCreate={handleCreate}
          isSubmitting={isCreating}
        />
      )}
    </div>
  );
}
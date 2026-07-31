import React, { useState, useEffect, useCallback,useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProgramInput from "../../components/editor/ProgramInput";
import Navbar from "../../components/layout/Navbar";
import FileExplorer from "../../components/files/FileExplorer";
import CodeEditor from "../../components/editor/CodeEditor";
import RunButton from "../../components/editor/RunButton";
import ConsoleOutput from "../../components/editor/ConsoleOutput";
import { getAllFiles, createFile, saveFileContent, deleteFile } from "../../services/FileService";
import { executeFile } from "../../services/ExecutionService";
import { getProjectById } from "../../services/ProjectService";
import "./EditorPage.css";
const IconMenu = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <line x1="4" y1="7" x2="20" y2="7" />
    <line x1="4" y1="12" x2="20" y2="12" />
    <line x1="4" y1="17" x2="20" y2="17" />
  </svg>
);
export default function EditorPage() {
  const { projectId } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState(null);
  const [files, setFiles] = useState([]);
  const [activeFileId, setActiveFileId] = useState(null);
  const [code, setCode] = useState("");
  const [savedCode, setSavedCode] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [executionResult, setExecutionResult] = useState(null);
  const [error, setError] = useState("");
  //const [error, setError] = useState("");
  const errorTimerRef = useRef(null);
  const [stdinInput, setStdinInput] = useState("");
const [sidebarOpen, setSidebarOpen] = useState(false);
  const activeFile = files.find((f) => f.id === activeFileId);

  const loadProject = useCallback(async () => {
    try {
      const [projectRes, filesRes] = await Promise.all([
        getProjectById(projectId),
        getAllFiles(projectId),
      ]);
      setProject(projectRes.data);
      setFiles(filesRes.data);

      if (filesRes.data.length > 0) {
        selectFile(filesRes.data[0]);
      }
    } catch (err) {
      showError(err.message)
    }
  }, [projectId]);

  useEffect(() => {
    loadProject();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId]);

 const selectFile = (file) => {
  setActiveFileId(file.id);
  setCode(file.content || "");
  setSavedCode(file.content || "");
  setExecutionResult(null);
  setStdinInput("");  // ← add this line
};

 

  const handleCreateFile = async (fileName) => {
    try {
      const response = await createFile(projectId, fileName);
      setFiles((prev) => [...prev, response.data]);
      selectFile(response.data);
    } catch (err) {
      showError(err.message)
    }
  };

  const handleDeleteFile = async (fileId, fileName) => {
    const confirmed = window.confirm(`Delete "${fileName}"?`);
    if (!confirmed) return;

    try {
      await deleteFile(projectId, fileId);
      const remaining = files.filter((f) => f.id !== fileId);
      setFiles(remaining);

      if (activeFileId === fileId) {
        if (remaining.length > 0) {
          selectFile(remaining[0]);
        } else {
          setActiveFileId(null);
          setCode("");
          setSavedCode("");
        }
      }
    } catch (err) {
      showError(err.message)
    }
  };

  const handleSave = async () => {
    if (!activeFile) return;
    setIsSaving(true);
    try {
      const response = await saveFileContent(projectId, activeFile.id, activeFile.fileName, code);
      setSavedCode(code);
      setFiles((prev) => prev.map((f) => (f.id === activeFile.id ? response.data : f)));
    } catch (err) {
      showError(err.message)
    } finally {
      setIsSaving(false);
    }
  };
const showError = (message) => {
    if (errorTimerRef.current) {
      clearTimeout(errorTimerRef.current);
    }
    setError(message);
    errorTimerRef.current = setTimeout(() => {
      setError("");
      errorTimerRef.current = null;
    }, 4000);
  };
  useEffect(() => {
    return () => {
      if (errorTimerRef.current) clearTimeout(errorTimerRef.current);
    };
  }, []);
  const handleRun = async () => {
  if (!activeFile) return;

  if (code !== savedCode) {
    await handleSave();
  }

  setIsRunning(true);
  setExecutionResult(null);
  try {
    const response = await executeFile(projectId, activeFile.id, stdinInput);
    setExecutionResult(response.data);
  } catch (err) {
    setExecutionResult({
      compiledSuccessfully: false,
      stderr: err.message,
      stdout: "",
      exitCode: -1,
      timedOut: false,
    });
  } finally {
    setIsRunning(false);
  }
};
const handleSelectFile = (fileId) => {
    const file = files.find((f) => f.id === fileId);
    if (file) selectFile(file);
    setSidebarOpen(false);
  };

  return (
   <div className="ep-page">
      <Navbar />

      <div className="ep-toolbar">
        <button className="ep-menu-toggle" onClick={() => setSidebarOpen(true)} aria-label="Open files">
          <IconMenu />
        </button>
        <button className="ep-back" onClick={() => navigate("/dashboard")}>
          ← Projects
        </button>
        <span className="ep-project-name">{project?.name}</span>
      </div>

      {error && <div className="ep-alert">{error}</div>}

      <div className="ep-body">
        {sidebarOpen && <div className="ep-backdrop" onClick={() => setSidebarOpen(false)} />}

        <FileExplorer
          files={files}
          activeFileId={activeFileId}
          onSelectFile={handleSelectFile}
          onCreateFile={handleCreateFile}
          onDeleteFile={handleDeleteFile}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        <div className="ep-main">
          {activeFile ? (
            <>
              <RunButton
                onRun={handleRun}
                onSave={handleSave}
                isRunning={isRunning}
                isSaving={isSaving}
                hasUnsavedChanges={code !== savedCode}
              />
              <ProgramInput value={stdinInput} onChange={setStdinInput} />
              <CodeEditor value={code} onChange={setCode} fileName={activeFile.fileName} />
              <ConsoleOutput result={executionResult} isRunning={isRunning} />
            </>
          ) : (
            <div className="ep-no-file">Create a file to start writing code.</div>
          )}
        </div>
      </div>
    </div>
  );
}
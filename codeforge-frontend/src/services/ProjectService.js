import API from "../api/axiosInstance";

export const getAllProjects = () => API.get("/api/projects");

export const getProjectById = (projectId) => API.get(`/api/projects/${projectId}`);

export const createProject = (name) => API.post("/api/projects", { name });

export const renameProject = (projectId, name) => API.put(`/api/projects/${projectId}`, { name });

export const deleteProject = (projectId) => API.delete(`/api/projects/${projectId}`);

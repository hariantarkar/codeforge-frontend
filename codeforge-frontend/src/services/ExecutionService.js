import API from "../api/axiosInstance";

export const executeFile = (projectId, fileId, input = "") =>
  API.post(`/api/projects/${projectId}/files/${fileId}/execute`, { input });
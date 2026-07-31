import API from "../api/axiosInstance";

export const getAllFiles = (projectId) => API.get(`/api/projects/${projectId}/files`);

export const getFileById = (projectId, fileId) => API.get(`/api/projects/${projectId}/files/${fileId}`);

export const createFile = (projectId, fileName) =>
  API.post(`/api/projects/${projectId}/files`, { fileName, content: "" });

export const saveFileContent = (projectId, fileId, fileName, content) =>
  API.put(`/api/projects/${projectId}/files/${fileId}/save`, { fileName, content });

export const renameFile = (projectId, fileId, fileName) =>
  API.put(`/api/projects/${projectId}/files/${fileId}/rename`, { fileName });

export const deleteFile = (projectId, fileId) => API.delete(`/api/projects/${projectId}/files/${fileId}`);
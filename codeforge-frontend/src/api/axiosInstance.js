import axios from "axios";

// Shared axios instance — every service file imports this instead of
// creating its own axios config.
const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach the JWT (saved at login) to every outgoing request automatically
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Normalize errors so every component can keep doing `catch(err) { err.message }`
// and get the backend's actual message instead of axios's generic one.
API.interceptors.response.use(
  (response) => response,
  (error) => {
    const data = error.response?.data;

    let message;
    if (data && typeof data === "object" && !Array.isArray(data)) {
      // Field-validation error object, e.g. { email: "...", password: "..." }
      // or ApiErrorResponse shape, e.g. { message: "...", status: 404 }
      message = data.message || Object.values(data)[0] || "Please fix the errors below.";
    } else if (typeof data === "string" && data) {
      message = data;
    } else {
      message = error.message || "Something went wrong. Please try again.";
    }

    const wrappedError = new Error(message);
    wrappedError.response = error.response;
    return Promise.reject(wrappedError);
  }
);

export default API;




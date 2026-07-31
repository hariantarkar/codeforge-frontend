import API from "../api/axiosInstance";

export const getMyProfile = () => API.get("/api/users/me");

export const updateMyProfile = (email) => API.put("/api/users/me", { email });
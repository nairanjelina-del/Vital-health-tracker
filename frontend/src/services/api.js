import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
});

// Read the token fresh on EVERY request so a new login always uses its own token
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// If the token is invalid/expired, clear the session and go to login
API.interceptors.response.use(
  (response) => response,
  (error) => {
    const url = error.config?.url || "";
    const isAuthCall = url.includes("/auth/login") || url.includes("/auth/register");
    if (error.response?.status === 401 && !isAuthCall) {
      clearSession();
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

// Removes everything belonging to the previous user (including old localStorage data
// from before the database was used)
export const clearSession = () => {
  localStorage.clear();
};

// Local (not UTC) date as YYYY-MM-DD. toISOString() gives the UTC date, which is
// yesterday's date in India between 12:00am and 5:30am.
export const todayLocal = () => {
  const d = new Date();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${month}-${day}`;
};

export default API;
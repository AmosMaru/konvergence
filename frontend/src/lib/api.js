import axios from "axios";

const API = axios.create({
  baseURL: "https://gynocare.kilush.com", // Set your base URL here
});

// Add Authorization header to every request if token exists
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default API;

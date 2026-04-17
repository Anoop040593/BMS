import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const message = error.response.data?.message || error.response.statusText;
      return Promise.reject(new Error(message));
    }

    if (error.request) {
      return Promise.reject(new Error("No response received from server."));
    }

    return Promise.reject(new Error(error.message || "Request setup failed."));
  },
);

export default api;

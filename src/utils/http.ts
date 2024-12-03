import axios from "axios";

const http = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

http.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("cadence-access-token");
    if (config.headers)
      config.headers.Authorization = token ? `Bearer ${token}` : "";
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

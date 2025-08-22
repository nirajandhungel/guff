import axios from "axios";
import { BASE_URL } from "./apiPaths";

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  withCredentials: true, //cookie bases auth
});

//intercept response for 401

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      window.location.href = "/login"; // redirect if unauthorized
    } else {
      console.error("API error:", error.response?.data || error.message);
    }
    return Promise.reject(error);
  }
);

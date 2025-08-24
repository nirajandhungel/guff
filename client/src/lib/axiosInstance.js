import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL

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
      // reject, don't reload the page
      console.warn("Unauthorized, user is not logged in");
    } else {
      console.error("API error:", error.response?.data || error.message);
    }
    return Promise.reject(error);
  }
);

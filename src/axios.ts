import axios from "axios";
import { useAuthStore } from "./stores/churchId";

const axiosInstance = axios.create({
  baseURL: "https://turningways-api-3hcn.onrender.com",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${useAuthStore.getState().token}`,
  },
});

axiosInstance.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// axios interceptor to refresh token
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    // check if the error is 401 and if the original request is the login request
    console.log(originalRequest.url);
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const response = await axiosInstance.post(
        "/api/v1/auth/refresh",
        {},
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        useAuthStore.getState().setToken(response.data.accessToken);
        return axiosInstance(originalRequest);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;

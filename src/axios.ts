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

// Maximum number of retries for token refresh
const MAX_RETRY_ATTEMPTS = 1;

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Initialize retry counter if not present
    if (!originalRequest._retry) {
      originalRequest._retry = 0;
    }

    // Check if the error is 401 and retry counter is within limit
    if (
      error.response.status === 401 &&
      originalRequest._retry < MAX_RETRY_ATTEMPTS
    ) {
      originalRequest._retry += 1;
      try {
        const response = await axiosInstance.post(
          "/api/v1/auth/refresh",
          {},
          {
            withCredentials: true,
          }
        );

        if (response.status === 200) {
          useAuthStore.getState().setToken(response.data.accessToken);
          // Update the Authorization header with the new token
          originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;
          return axiosInstance(originalRequest);
        }
      } catch (refreshError) {
        // Handle error from refresh token request
        return Promise.reject(refreshError);
      }
    }

    // If retry limit reached or non-401 error, reject the promise
    return Promise.reject(error);
  }
);

export default axiosInstance;

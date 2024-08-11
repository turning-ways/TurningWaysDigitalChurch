/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { useAuthStore } from "../stores/churchId";

const axiosInstance = axios.create({
  baseURL: "https://turningways-api-3hcn.onrender.com",
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
      originalRequest.url !== "/api/v1/auth/login" &&
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

class ApiClient<T> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  get = async () => {
    try {
      const response = await axiosInstance.get<T>(this.endpoint, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  };

  post = async (data: any) => {
    try {
      const response = await axiosInstance.post<T>(this.endpoint, data, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.error("Error posting data:", error);
      throw error;
    }
  };

  patch = async (data: any) => {
    try {
      const response = await axiosInstance.patch<T>(this.endpoint, data, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.error("Error updating data:", error);
      throw error;
    }
  };

  delete = async () => {
    try {
      const response = await axiosInstance.delete<T>(this.endpoint, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.error("Error deleting data:", error);
      throw error;
    }
  };
}

export default ApiClient;

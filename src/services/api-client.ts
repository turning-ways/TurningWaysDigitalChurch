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

// axios interceptor to refresh token
axiosInstance.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;
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
		return axiosInstance
			.post<T>(this.endpoint, data, { withCredentials: true })
			.then((res) => res.data);
	};

	patch = async (data: any) => {
		try {
			const response = await axiosInstance.patch<T>(this.endpoint, data, { withCredentials: true });
			return response.data;
		} catch (error) {
			console.error("Error fetching data:", error);
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
			console.error("Error fetching data:", error);
			throw error;
		}
	};
}

export default ApiClient;

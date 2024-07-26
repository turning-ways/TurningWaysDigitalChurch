import ApiClient from "./api-client";

const apiClient = (endpoint: string) => {
	return new ApiClient("/api/v1" + endpoint);
};

export default apiClient;

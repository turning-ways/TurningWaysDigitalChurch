import ApiClient from "./api-client";

const apiClient = (endpoint: string) => {
  return new ApiClient("/api/v1/users" + endpoint);
};

export default apiClient;

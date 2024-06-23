import ApiClient from "./api-client";

const apiClient = <T>(endpoint?: string) => {
  return new ApiClient<T>("/api/v1/churches" + endpoint);
};

export default apiClient;

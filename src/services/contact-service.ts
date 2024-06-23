import ApiClient from "./api-client";


const apiClient = <T>(churchId: string | undefined, contactId?: string | null, endpoint?: string) => {
  return new ApiClient<T>(
    `/api/v1/churches/${churchId}/contact/${contactId}` + endpoint
  );
};

export default apiClient;

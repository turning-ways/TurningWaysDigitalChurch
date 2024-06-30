import ApiClient from "./api-client";

export interface Member {
  member: {
    accessPermission: string;
    memberStatus: string;
    workType: string;
    ServiceUnit: string;
    first_name: string;
    last_name: string;
    middle_name: string;
    prefix: string;
    suffix: string;
    gender: string;
    dateOfBirth: string;
    email: string;
    address: {
      HomeAddress: string;
    };
    phone: {
      MainPhone: string;
    };
    // dateJoined, createdBy and updated at
    dateJoined: string;
    createdBy: string;
    updatedAt: string;
    photo: string;
    role: string;
    workerType: string;
    employmentStatus: string;
    educationalLevel: string;
    healthStatus: string;
  };
}

const apiClient = <T>(memberId: string | null, churchId: string | undefined, endpoint?:string) => {
  return new ApiClient<T>(`/api/v1/members/${churchId}/member/${memberId}` + `${endpoint ? endpoint : ""}`);
};

export default apiClient;

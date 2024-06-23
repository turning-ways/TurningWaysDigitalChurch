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
  };
}

const apiClient = (memberId: string | null, churchId: string | undefined) => {
  return new ApiClient<Member>(`/api/v1/members/${churchId}/member/${memberId}`);
};

export default apiClient;

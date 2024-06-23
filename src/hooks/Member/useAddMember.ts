import { useMutation, useQueryClient } from "@tanstack/react-query";
import { success } from "../useAuthData";
import { notify } from "../useAuthData";
import { useNavigate } from "react-router-dom";
// import { refetchAuth } from "../useAuthData";
import ApiClient from "../../services/api-client";

interface Member {
  role: string;
  howDidYouHear: string;
  phone: {
    MainPhone: string;
  };
  gender?: string;
  churchId: string;
  prefix?: string;
  suffix?: string;
  first_name?: string;
  middle_name?: string;
  last_name?: string;
  email?: string;
  address?: { HomeAddress: string };
  dateOfBirth?: string;
}

const useAddMember = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const handleRefresh = () => {
    queryClient.invalidateQueries({ queryKey: ["auth"] });
  };
  const apiClient = new ApiClient("/api/v1/members");
  return useMutation({
    mutationFn: (memberDetails: Member) => apiClient.post(memberDetails),
    onSuccess: () => {
      success("Member has been added successfully");
      handleRefresh();

      navigate("/admin/dashboard");
    },
    onError: () => notify("Couldn't add member"),
  });
};

export default useAddMember;

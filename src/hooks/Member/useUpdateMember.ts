import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { success } from "../useUpdatePassword";
import { notify } from "../useLogin";
import { useNavigate } from "react-router-dom";

interface Member {
  first_name: string;
  middle_name: string;
  suffix: string;
  email: string;
  last_name: string;
  churchId: string;
  gender?: string;
  phone: {
    MainPhone: string;
    workPhone?: string;
    otherPhone?: string[];
  };
  address: {
    HomeAddress: string;
    workAddress?: string;
  };
  title?: string;
  dateOfBirth?: string;
  workerType: string;
  ServiceUnit: string;
  memberStatus: string;

  MarriageStatus?: string;
}

const useUpdateMember = (memberId: string) => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (memberDetails: Member) =>
      axios
        .patch<Member>(
          `https://digital-church.onrender.com/api/v1/members/${memberId}`,
          memberDetails,
          {
            withCredentials: true,
          }
        )
        .then((res) => res.data),
    onSuccess: () => {
      success("Member has been updated successfully");
      navigate("/admin/dashboard");
    },
    onError: () => notify("Couldn't update member"),
  });
};

export default useUpdateMember;

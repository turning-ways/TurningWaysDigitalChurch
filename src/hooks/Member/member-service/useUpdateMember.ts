import { useMutation } from "@tanstack/react-query";
import memberService from "../../../services/member-service";

import { success, notify } from "../../useAuthData";
import { useUserAuth } from "../../../stores/user";
// import { useNavigate } from "react-router-dom";

interface Member {
  first_name: string;
  middle_name?: string;
  suffix?: string;
  email: string;
  last_name: string;
  churchId: string;
  gender: string;
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
  educationalLevel?:string;
  employmentStatus?:string;
  healthStatus?:string;

  MarriageStatus?: string;
}

const useUpdateMember = (memberId: string) => {
  // const navigate = useNavigate();
  const churchId = useUserAuth((auth) => auth?.user?.churchId?._id);
  return useMutation({
    mutationFn: (memberDetails: Member) =>
      memberService(memberId, churchId).patch(memberDetails),
    onSuccess: () => {
      success("Member has been updated successfully");
      // navigate("/admin/dashboard");
    },
    onError: () => notify("Couldn't update member"),
  });
};

export default useUpdateMember;

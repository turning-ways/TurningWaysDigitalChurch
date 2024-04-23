import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { success } from "../useUpdatePassword";
import { notify } from "../useLogin";
import { useNavigate } from "react-router-dom";

interface Member {
  first_name: string;
  middle_name: string;
  suffix: string;
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
  MarriageStatus?: string;
}

const useAddRegularMember = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (memberDetails: Member) =>
      axios
        .post<Member>(
          "https://digital-church.onrender.com/api/v1/members",
          memberDetails,
          {
            withCredentials: true,
          }
        )
        .then((res) => res.data),
    onSuccess: () => {
      success("Member has been added successfully");
      navigate("/overview/dashboard");
    },
    onError: () => notify("Couldn't add member"),
  });
};

export default useAddRegularMember;

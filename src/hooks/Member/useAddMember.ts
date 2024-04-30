import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { success } from "../useUpdatePassword";
import { notify } from "../useLogin";

interface Member {
  role: string;
  howDidYouHear: string;
  phone: {
    MainPhone: string;
  };
  churchId: string;
  prefix?: string;
  suffix?: string;
  first_name?: string;
  middle_name?: string;
  last_name?: string;
  email?: string;
  address?: { HomeAddress: string };
}

const useAddMember = () => {
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
    },
    onError: () => notify("Couldn't add member"),
  });
};

export default useAddMember;

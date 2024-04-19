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
}

const useAddMember = () => {
  return useMutation({
    mutationFn: (memberDetails: Member) =>
      axios
        .post<Member>(
          "https://digital-church.onrender.com/api/v1/members",
          memberDetails
        )
        .then((res) => res.data),
    onSuccess: () => success("Member has been added successfully"),
    onError: () => notify("Did not work boss"),
  });
};

export default useAddMember;

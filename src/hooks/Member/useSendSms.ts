import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { success } from "../useUpdatePassword";
import { notify } from "../useLogin";
import { useUserAuth } from "../../stores/user";

interface Member {
  message: string;
  members: string[];
}

const useSendSms = () => {
  const { user } = useUserAuth();
  return useMutation({
    mutationFn: (memberDetails: Member) =>
      axios
        .post<Member>(
          `https://digital-church.onrender.com/api/v1/churches/${user?.churchId?._id}/send-sms?dateparam=now&timeparam=now`,
          memberDetails,
          {
            withCredentials: true,
          }
        )
        .then((res) => res.data),
    onSuccess: () => {
      success("Sms has been been sent successfully");

    //   navigate("/admin/dashboard");
    },
    onError: () => notify("Couldn't send sms at this time"),
  });
};

export default useSendSms;

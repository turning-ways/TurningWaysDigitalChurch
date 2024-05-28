import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { success } from "../useUpdatePassword";

interface Email {
  email: string;
}

const useVerifyEmail = () => {
  return useMutation({
    mutationFn: (email: Email) =>
      axios
        .post<Email>(
          "https://digital-church.onrender.com/api/v1/users/verify-email",
          email
        )
        .then((res) => res.data),
    onSuccess: () => {
      success("Otp has been sent to email");
    },
  });
};

export default useVerifyEmail;

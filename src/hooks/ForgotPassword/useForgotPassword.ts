import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { notify } from "../useLogin";
import { success } from "../useUpdatePassword";

interface Email {
  email: string;
}

const useForgotPassword = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (email: Email) =>
      axios
        .patch<Email>(
          "https://digital-church.onrender.com/api/v1/users/forgot-password",
          email
        )
        .then((res) => res.data),
    onSuccess: () => {
      navigate("/forgot-password/otp-verification");
      success("Enter the otp that was sent");
    },
    onError: () => {
      notify("This email doesn't exist");
    },
  });
};

export default useForgotPassword;

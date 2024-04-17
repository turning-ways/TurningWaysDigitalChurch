import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useUserIdStore } from "../../stores/user";
import { useNavigate } from "react-router-dom";
import { notify } from "../useLogin";

interface Otp {
  token: string;
}

interface Response {
  message: "";
  status: "";
  userId: "";
}

const useVerifyOtp = () => {
  const { setUserId } = useUserIdStore();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (token: Otp) =>
      axios
        .patch<Response>(
          "https://digital-church.onrender.com/api/v1/users/verify-password-token",
          token
        )
        .then((res) => res.data),
    onSuccess: (res) => {
      setUserId(res.userId);
      navigate("/password-reset/set-new-password");
    },
    onError: () => {
      notify("Invalid OTP");
    },
  });
};

export default useVerifyOtp;

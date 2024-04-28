import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useUserIdStore } from "../../stores/user";
import { useNavigate } from "react-router-dom";

interface Otp {
  token: string;
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onSuccess: (res:any) => {
      setUserId(res.userId);
      navigate("/password-reset/set-new-password");
    },
  });
};

export default useVerifyOtp;

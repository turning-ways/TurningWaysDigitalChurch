import { useMutation } from "@tanstack/react-query";
import axios from "axios";

interface Otp {
  token: string;
}

const useVerifyOtp = () => {
  return useMutation({
    mutationFn: (token: Otp) =>
      axios
        .patch<Otp>(
          "https://digital-church.onrender.com/api/v1/users/verify-password-token",
          token
        )
        .then((res) => res.data),
    onSuccess: () => console.log("otp is correct"),
  });
};

export default useVerifyOtp;

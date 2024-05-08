import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { notify } from "../useLogin";
import { success } from "../useUpdatePassword";

interface Token {
  token: string;
}

const useVerifySignUpOtp = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (token: Token) =>
      axios
        .patch<Token>(
          "https://digital-church.onrender.com/api/v1/users/verify-email",
          token
        )
        .then((res) => res.data),
    onSuccess: () => {
      navigate("/register/personalinfo");
      success("Account Created, Please Create Church");
      console.log("Account created, please create church");
    },
    onError: () => notify("Invalid Otp!"),
  });
};

export default useVerifySignUpOtp;

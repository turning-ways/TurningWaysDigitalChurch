import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { success } from "../useUpdatePassword";

interface Phone {
  code: string;
}

const useVerifyPhoneSignUpOtp = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (code: Phone) =>
      axios
        .post<Phone>(
          "https://digital-church.onrender.com/api/v1/users/phone-auth-verify",
          code
        )
        .then((res) => res.data),
      onSuccess: () => {
        navigate("/login/phone");
        success("Verified! Please sign in to continue")
      }
  });
};

export default useVerifyPhoneSignUpOtp;

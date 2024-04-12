import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useUserDetailsStore } from "../../stores/user";
import useVerifyEmail from "./useVerifyEmail";
import { useNavigate } from "react-router-dom";

interface User {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  passwordConfirm: string;
}

const useRegister = () => {
  const { email } = useUserDetailsStore();
  const { mutate } = useVerifyEmail();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (user: User) =>
      axios
        .post<User>(
          "https://digital-church.onrender.com/api/v1/users/signupAdmin",
          user
        )
        .then((res) => res.data),
    onSuccess: () => {
      mutate({ email });
      navigate("/signup/otp-verification");
    },
  });
};
export default useRegister;

import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { notify } from "../useLogin";
import { success } from "../useUpdatePassword";

interface User {
  phoneNumber: string;
  first_name: string;
  last_name: string;
  password: string;
  passwordConfirm: string;
}

const useRegisterWithPhone = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (user: User) =>
      axios
        .post<User>(
          "https://digital-church.onrender.com/api/v1/users/phone-auth",
          user
        )
        .then((res) => res.data),
    onSuccess: () => {
      navigate("/register/phone-otp-verification");
      success("Please enter the otp that was sent");
    },
    onError: (err: { response: { data: { message: string } } }) => {
      const message = err.response.data.message;
      if (
        message ===
        "User validation failed: passwordConfirm: The passwords do not match!!"
      ) {
        notify(`Passwords don't match`);
      } else if (message.includes("duplicate")) {
        notify(`An account with this email already exists`);
      }
    },
  });
};
export default useRegisterWithPhone;

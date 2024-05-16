import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
    onSuccess: () => navigate("/forgot-password/otp-verification"),
    onError: (err) => console.log(err.message),
  });
};

export default useForgotPassword;

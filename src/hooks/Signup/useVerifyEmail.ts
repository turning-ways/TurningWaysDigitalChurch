import { useMutation } from "@tanstack/react-query";
import axios from "axios";

interface Email {
  email: string;
}

const useVerifyEmail = () => {
  return useMutation({
    mutationFn: (email: Email) =>
      axios
        .patch<Email>(
          "https://digital-church.onrender.com/api/v1/users/verify-email",
          email
        )
        .then((res) => res.data),
  });
};

export default useVerifyEmail;

import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const useVerifyOtp = () => {
  return useMutation({
    mutationFn: () =>
      axios
        .get(
          "https://digital-church.onrender.com/api/v1/users/verify-email"
        )
        .then((res) => res.data),
    onSuccess: (res) => {
      console.log(res.data);
    },
  });
};

export default useVerifyOtp;

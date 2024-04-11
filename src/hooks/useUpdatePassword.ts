import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useUserIdStore } from "../stores/user";

interface Password {
  password: string;
  passwordConfirm: string;
}

const useUpdatePassword = () => {

    const {userId} = useUserIdStore();

  return useMutation({
    mutationFn: (password: Password) =>
      axios
        .patch<Password>(
          `https://digital-church.onrender.com/api/v1/users/update-password/${userId}`,
          password
        )
        .then((res) => res.data),
    onSuccess: () => console.log("password has been changed"),
  });
};

export default useUpdatePassword;

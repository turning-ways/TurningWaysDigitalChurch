import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useUserIdStore } from "../stores/user";
import { Bounce, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

interface Password {
  password: string;
  passwordConfirm: string;
}

export const success = (success: string) => {
  toast.success(success, {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
  });
};

const useUpdatePassword = () => {
  const { userId, setUserId } = useUserIdStore();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (password: Password) =>
      axios
        .patch<Password>(
          `https://digital-church.onrender.com/api/v1/users/update-password/${userId}`,
          password
        )
        .then((res) => res.data),
    onSuccess: () => {
      success("Password has been changed");
      navigate('/login/email');
      setUserId(null);
    },
  });
};

export default useUpdatePassword;

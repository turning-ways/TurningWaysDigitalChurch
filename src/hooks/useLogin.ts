import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Bounce, toast } from "react-toastify";
import { success } from "./useUpdatePassword";
import { useChurchIdStore } from "../stores/churchId";
import { useNavigate } from "react-router-dom";

interface User {
  email: string;
  password: string;
}

export const notify = (err: string) => {
  toast.error(err, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
  });
};

const useLogin = () => {
  const navigate = useNavigate();
  const { setChurchId } = useChurchIdStore();
  return useMutation({
    mutationFn: (user: User) => {
      return axios
        .post<User>(
          "https://digital-church.onrender.com/api/v1/users/login",
          user,
          {
            withCredentials: true,
          }
        )
        .then((res) => res.data);
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
    onSuccess: (res: any) => {
      success("Sign In was Successfull");
      navigate("/admin/overview/dashboard/");
      setChurchId("1234567890");
    },
    onError: () => {
      notify("Incorrect Username or Password");
    },
  });
};

export default useLogin;

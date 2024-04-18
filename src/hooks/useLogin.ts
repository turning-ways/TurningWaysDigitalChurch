import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";

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
  return useMutation({
    mutationFn: (user: User) => {
      return axios
        .post<User>(
          "https://digital-church.onrender.com/api/v1/users/login",
          user
        )
        .then((res) => res.data);
    },
    onSuccess: () => {
      console.log("It works");
      navigate("/personalinfo");
    },
    onError: () => {
      notify("Incorrect Username or Password");
    },
  });
};

export default useLogin;

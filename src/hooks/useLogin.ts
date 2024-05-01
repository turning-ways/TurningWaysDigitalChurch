import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Bounce, toast } from "react-toastify";
import { success } from "./useUpdatePassword";
// import { useChurchIdStore } from "../stores/churchId";
import { useNavigate } from "react-router-dom";
import { useChurchIdStore } from "../stores/churchId";
import useVerifyEmail from "./Signup/useVerifyEmail";

interface User {
  email: string;
  password: string;
}

interface ErrorResponse {
  response: {
    data: {
      message: string;
      email: string;
      redirectUrl: string;
    };
  };
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
  // const { setChurchId } = useChurchIdStore();

  const { mutate } = useVerifyEmail();

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
      const url = new URL(res.redirectUrl);
      if (url.pathname === "/admin/dashboard") {
        setChurchId(res.churchId);
        success("Sign In was Successfull");
        navigate(url.pathname);
      }
      if (url.pathname === "/register/personalinfo")
        success("Sign In was Successfull, Please create your church");
      console.log(url, url.pathname);
    },
    onError: (err: ErrorResponse) => {
      notify(err.response.data.message);
      const url = new URL(err.response.data.redirectUrl);
      navigate(url.pathname);
      mutate({ email: err.response.data.email });
      console.log(err.response.data.redirectUrl);
    },
  });
};

export default useLogin;

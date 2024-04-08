import { useMutation } from "@tanstack/react-query";
import axios from "axios";

interface User {
  email: string;
  password: string;
}

const useLogin = () => {
  return useMutation({
    mutationFn: (user: User) => {
      return axios.post<User>("https://digital-church.onrender.com/api/v1/users/login", user).then((res) => res.data);
    },
    onSuccess: () => {
      console.log("It works");
    },
    onError: (data) => {
      console.log(data.message);
    },
  });
};

export default useLogin;

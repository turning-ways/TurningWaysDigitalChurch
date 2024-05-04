import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface AuthResponse {
  data: {
    user: {
      first_name: string;
      last_name: string;
      churchId: {
        _id: string;
        name: string;
      };
    };
  };
}

const useAuth = () => {
  return useQuery<AuthResponse>({
    queryKey: ["auth"],
    queryFn: () =>
      axios
        .get("https://digital-church.onrender.com/authorize", {
          withCredentials: true,
        })
        .then((res) => res.data)
        .catch((err) => console.log(err)),
  });
};

export default useAuth;

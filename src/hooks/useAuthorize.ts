import { QueryClient, useQuery } from "@tanstack/react-query";
import axios from "axios";

interface AuthResponse {
  data: {
    user: {
      first_name: string;
      last_name: string;
      _id:string;
      churchId: {
        _id: string;
        name: string;
      };
      photo:string;
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

export const refetchAuth = (queryClient: QueryClient) => {
  queryClient.invalidateQueries({queryKey: ["auth"]})
}

export default useAuth;

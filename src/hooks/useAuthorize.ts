import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useAuth = () => {
  return useQuery({
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

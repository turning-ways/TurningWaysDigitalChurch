import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useLogout = () => {
  return useQuery({
    queryKey: ["loggedOut"],
    queryFn: () =>
      axios
        .get("https://digital-church.onrender.com/api/v1/users/logout", {
          withCredentials: true,
        })
        .then((res) => res.data)
        .catch((err) => console.log(err)),
  });
};

export default useLogout;

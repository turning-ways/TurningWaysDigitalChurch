import { useQuery } from "@tanstack/react-query";
import { useChurchIdStore } from "../../stores/churchId";
import axios from "axios";

const useGetAllMembers = () => {
  const { churchId } = useChurchIdStore();

  return useQuery<[]>({
    queryKey: ["churches", churchId, "members"],
    queryFn: () =>
      axios
        .get(
          `https://digital-church.onrender.com/api/v1/churches/${churchId}/members`,
          {
            withCredentials: true,
          }
        )
        .then((res) => res.data)
        .then((data) => data.data.members)
        .catch((err) => console.log(err)),
  });
};

export default useGetAllMembers;

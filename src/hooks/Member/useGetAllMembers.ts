import { useQuery } from "@tanstack/react-query";
import { useChurchIdStore } from "../../stores/churchId";
import axios from "axios";
import { useUserAuth } from "../../stores/user";

// interface MembersQuery {
//   page: number;
//   pageSize: number;
// }

const useGetAllMembers = () => {
  const { churchId } = useChurchIdStore();
  const {user } = useUserAuth();

  return useQuery<[]>({
    queryKey: ["churches", churchId, "members"],
    queryFn: () =>
      axios
        .get(
          `https://digital-church.onrender.com/api/v1/churches/${user?.churchId?._id}/members`,
          {
            withCredentials: true,
            // params: {
            //   page: (query.page - 1) * query.pageSize,
            //   limit: query.pageSize,
            // },
          }
        )
        .then((res) => res.data)
        .then((data) => data.data.members)
        .catch((err) => console.log(err)),
     
  });
};

export default useGetAllMembers;

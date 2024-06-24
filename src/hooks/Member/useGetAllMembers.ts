import { useQuery } from "@tanstack/react-query";
import { useChurchIdStore } from "../../stores/churchId";
import axios from "axios";
import { useUserAuth } from "../../stores/user";

interface MembersQuery {
  page: number;
  pageSize: number;
}

interface Member {
  ServiceUnit: string;
  WorkerStatus: string;
  accessPermission: string;
  age: number;
  anniversary: string;
  dateJoined: string;
  dateOfBirth: string;
  email: string;
  first_name: string;
  fullname: string;
  gender: string;
  id: string;
  last_name: string;
  memberStatus: string;
  middle_name: string;
  notes: [];
  phone: { MainPhone: string };
  photo: string;
  role: string;
  suffix: string;
  title: string;
  workType: string;
  _id: string;
  // prefix:string;
}

const useGetAllMembers = (query: MembersQuery) => {
  const { churchId } = useChurchIdStore();
  const { user } = useUserAuth();

  return useQuery<Member[]>({
    queryKey: ["churches", churchId, "members", query],
    queryFn: () =>
      axios
        .get(
          `https://turningways.onrender.com/api/v1/churches/${user?.churchId?._id}/members`,
          {
            withCredentials: true,
            params: {
              page: (query.page - 1) * query.pageSize,
              limit: query.pageSize,
            },
          }
        )
        .then((res) => res.data)
        .then((res) => res.data)
        .then((res) => res.members)
        .catch((err) => console.log(err)),
  });
};

export default useGetAllMembers;

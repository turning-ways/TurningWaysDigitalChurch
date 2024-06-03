import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useUserAuth } from "../../stores/user";

interface Member {
  member: {
    accessPermission: string;
    memberStatus: string;
    workType: string;
    ServiceUnit: string;
    first_name: string;
    last_name: string;
    middle_name: string;
    prefix: string;
    suffix: string;
    gender: string;
    dateOfBirth: string;
    email: string;
    address: {
      HomeAddress: string;
    };
    phone: {
      MainPhone: string;
    };
    // dateJoined, createdBy and updated at
    dateJoined: string;
    createdBy: string;
    updatedAt: string;
    photo: string;
    role: string;
    workerType: string;
  };
}

const useGetMemberDetails = () => {
  // const { churchId } = useChurchIdStore();
  const { user } = useUserAuth();

  const queryParams = new URLSearchParams(location.search);

  const memberId = queryParams.get("id");
  return useQuery<Member>({
    queryKey: ["church", user?.churchId?._id, "member", memberId],
    queryFn: () =>
      axios
        .get(
          `https://digital-church.onrender.com/api/v1/members/${memberId}`,
          {
            withCredentials: true,
          }
        )
        .then((res) => res.data)
        .catch(() => console.log("there was an error fetching")),
  });
};

export default useGetMemberDetails;

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useChurchIdStore } from "../../stores/churchId";

const useGetMemberDetails = () => {
  const { churchId } = useChurchIdStore();
  const queryParams = new URLSearchParams(location.search);

  const memberId = queryParams.get("id");
  return useQuery({
    queryKey: ["church", churchId, "member", memberId],
    queryFn: () =>
      axios
        .get(`https://digital-church.onrender.com/api/v1/members/${memberId}`, {
          withCredentials: true,
        })
        .then((res) => res.data),
  });
};

export default useGetMemberDetails;

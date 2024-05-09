import { useQuery } from "@tanstack/react-query";
import axios from "axios";
// import { useChurchIdStore } from "../../stores/churchId";
import { useEffect } from "react";
import { useUserAuth } from "../../stores/user";

const useGetMemberDetails = () => {
  // const { churchId } = useChurchIdStore();
  const {user} = useUserAuth();
  
  const queryParams = new URLSearchParams(location.search);

  useEffect(() => {
  }, [])

  const memberId = queryParams.get("id");
  return useQuery({
    queryKey: ["church", user?.churchId?._id, "member", memberId],
    queryFn: () =>
      axios
        .get(`https://digital-church.onrender.com/api/v1/members/${memberId}`, {
          withCredentials: true,
        })
        .then((res) => res.data),
  });
};

export default useGetMemberDetails;

import { useQuery } from "@tanstack/react-query";
import { useUserAuth } from "../../../stores/user";
import memberService, { Member } from "../../../services/member-service";

const useGetMemberDetails = () => {
  // const { churchId } = useChurchIdStore();
  const churchId = useUserAuth((auth) => auth?.user?.churchId?._id);

  const queryParams = new URLSearchParams(location.search);

  const memberId = queryParams.get("id");
  return useQuery<Member>({
    queryKey: ["church", churchId, "member", memberId],
    queryFn: () => {
      return memberService(memberId, churchId).get();
    },
  });
};

export default useGetMemberDetails;

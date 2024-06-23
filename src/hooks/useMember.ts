import { useMutation, useQuery } from "@tanstack/react-query";
import { success, notify } from "./useAuthData";
import { useNavigate } from "react-router-dom";
import memberService, { Member } from "../services/member-service";
import { useUserAuth } from "../stores/user";

export const useDeleteMember = () => {
  const navigate = useNavigate();
  const churchId = useUserAuth((auth) => auth?.user?.churchId?._id);
  return useMutation({
    mutationFn: (memberId: string) =>
      memberService(memberId, churchId).delete(),
    onSuccess: () => {
      success("Member has been deleted successfully");
      navigate("/admin/directory");
    },
    onError: () => notify("Couldn't delete member"),
  });
};

export const useGetMemberDetails = () => {
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

export const useUpdateMember = (memberId: string) => {
    // const navigate = useNavigate();
    const churchId = useUserAuth((auth) => auth?.user?.churchId?._id);
    return useMutation({
      mutationFn: (memberDetails: Member) =>
        memberService(memberId, churchId).post(memberDetails),
      onSuccess: () => {
        success("Member has been updated successfully");
        // navigate("/admin/dashboard");
      },
      onError: () => notify("Couldn't update member"),
    });
  };
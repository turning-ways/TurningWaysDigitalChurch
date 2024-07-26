import { useQuery } from "@tanstack/react-query";
import memberService, { Member } from "../../../services/member-service";
import { useChurchIdStore } from "../../../stores/churchId";

// Define the type for the response data
interface MemberResponse {
	data: Member;
}

const useGetMemberDetails = () => {
	const { churchId } = useChurchIdStore();

	// Ensure that `location` is defined and accessible
	const queryParams = new URLSearchParams(window.location.search);

	const memberId = queryParams.get("id");

	return useQuery<Member>({
		queryKey: ["church", churchId, "member", memberId],
		queryFn: async () => {
			if (!memberId || !churchId) {
				throw new Error("Member ID or Church ID is missing");
			}
			const response = await memberService<MemberResponse>(memberId, churchId).get();
			return response.data;
		},
		enabled: !!memberId && !!churchId, // Only run the query if memberId and churchId are available
	});
};

export default useGetMemberDetails;

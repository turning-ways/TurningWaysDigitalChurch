import { useMutation } from "@tanstack/react-query";
import { success, notify } from "../../useAuthData";
import { useNavigate } from "react-router-dom";
import memberService from "../../../services/member-service";
import { useChurchIdStore } from "../../../stores/churchId";

const useDeleteMember = () => {
	const navigate = useNavigate();
	const { churchId } = useChurchIdStore();
	return useMutation({
		mutationFn: (memberId: string) => memberService(memberId, churchId).delete(),
		onSuccess: () => {
			success("Member has been deleted successfully");
			navigate("/admin/directory");
		},
		onError: () => notify("Couldn't delete member"),
	});
};

export default useDeleteMember;

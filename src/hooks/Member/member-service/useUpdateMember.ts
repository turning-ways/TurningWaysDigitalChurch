import { useMutation } from "@tanstack/react-query";
import memberService from "../../../services/member-service";
import { success, notify } from "../../useAuthData";
// import { useUserAuth } from "../../../stores/user";
import { useChurchIdStore } from "../../../stores/churchId";
import { useNavigate } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

interface Member {
	firstName: string;
	middleName?: string;
	lastName: string;
	prefix?: string;
	suffix?: string;
	email: string;
	gender: string;
	maritalStatus: string;
	mainPhone: string;
	mobilePhone?: string;
	homeAddress: string;
	workAddress?: string;
	dateOfBirth?: string;
	worker: string;
	workerStatus: boolean;
	serviceUnit: string; // TODO: To be added in the Backend
	educationalLevel?: string;
	employmentStatus?: string;
	healthStatus?: string;
	healthConditionRemarks?: string;
}

const useUpdateMember = (memberId: string) => {
	const navigate = useNavigate();
	const { churchId } = useChurchIdStore();
	return useMutation({
		mutationFn: (memberDetails: Member) => memberService(memberId, churchId).patch(memberDetails),
		onSuccess: () => {
			success("Member has been updated successfully");
			navigate(`/admin/directory/member/personal-information?id=${memberId}`);
			// navigate("/admin/dashboard");
		},
		onError: () => notify("Couldn't update member"),
	});
};

export default useUpdateMember;

import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { success, notify } from "../useAuthData";
import { useChurchIdStore } from "../../stores/churchId";

interface Member {
	message: string;
	members: string[];
}

const useSendSms = () => {
	const { churchId } = useChurchIdStore();
	return useMutation({
		mutationFn: (memberDetails: Member) =>
			axios
				.post<Member>(
					`https://turningways-api-3hcn.onrender.com/api/v1/churches/${churchId}/send-sms?dateparam=now&timeparam=now`,
					memberDetails,
					{
						withCredentials: true,
					}
				)
				.then((res) => res.data),
		onSuccess: () => {
			success("Sms has been been sent successfully");

			//   navigate("/admin/dashboard");
		},
		onError: () => notify("Couldn't send sms at this time"),
	});
};

export default useSendSms;

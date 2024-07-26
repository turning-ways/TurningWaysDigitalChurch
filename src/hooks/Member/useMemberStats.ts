import { useQuery } from "@tanstack/react-query";
import axios from "../../axios";
// import { useUserAuth } from "../../stores/user";
import { useChurchIdStore } from "../../stores/churchId";

interface DataType {
	data: {
		TotalMembers: number;
		MembersJoined: {
			length: number;
			genderCount: {
				male: number;
				female: number;
			};
			verifiedCount: number;
			unverifiedCount: number;
			activeMembers: number;
			noOfContacts: number;
			ageGroup: {
				"0-10": number;
				"11-20": number;
				"21-30": number;
				"31-40": number;
				"41-50": number;
				"51-60": number;
				"61-70": number;
			};
			members: Array<{
				id: string;
				firstName: string;
				lastName: string;
				gender: string;
				email: string;
				phone: string;
				dateOfBirth: string;
				maritalStatus: string;
				anniversaries: Array<{
					name: string;
					date: string;
				}>;
				age: number;
				dateJoined: string;
			}>;
		};
	};
}

const useMemberStats = (timeLine: string | undefined) => {
	// const { user } = useUserAuth();
	const { churchId } = useChurchIdStore();
	return useQuery({
		queryKey: ["data", churchId],
		queryFn: () =>
			axios
				.get<DataType>(
					`https://turningways-api-3hcn.onrender.com/api/v1/churches/${churchId}/stats?dateParam=${timeLine}`,
					{
						withCredentials: true,
					}
				)
				.then((res) => res.data)
				.then((res) => {
					return res.data;
				}),
	});
};

export default useMemberStats;

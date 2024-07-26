import { useQuery } from "@tanstack/react-query";
import { useChurchIdStore } from "../../stores/churchId";
import axios from "../../axios";
import { useMemo } from "react";

interface MembersQuery {
	page: number;
	pageSize: number;
}

// interface Member {
// 	ServiceUnit: string;
// 	WorkerStatus: string;
// 	accessPermission: string;
// 	age: number;
// 	anniversary: string;
// 	dateJoined: string;
// 	dateOfBirth: string;
// 	email: string;
// 	first_name: string;
// 	fullname: string;
// 	gender: string;
// 	id: string;
// 	last_name: string;
// 	memberStatus: string;
// 	middle_name: string;
// 	notes: any[];
// 	phone: { MainPhone: string };
// 	photo: string;
// 	role: string;
// 	suffix: string;
// 	title: string;
// 	workType: string;
// 	_id: string;
// }

const useGetAllMembers = (query: MembersQuery) => {
	const { churchId } = useChurchIdStore();
	const queryKey = useMemo(() => ["churches", churchId, "members", query], [churchId, query]);

	const fetchMembers = async () => {
		try {
			const { data } = await axios.get(`/api/v1/churches/${churchId}/members`, {
				withCredentials: true,
				params: {
					page: (query.page - 1) * query.pageSize,
					limit: query.pageSize,
				},
			});

			// Assuming the response structure is consistent and members are in `data.members`
			const members = data?.data?.members ?? [];
			return members;
		} catch (error) {
			console.error("Error fetching members:", error);
			throw error;
		}
	};

	return useQuery({
		queryKey,
		queryFn: fetchMembers,
		// keepPreviousData: true, // Keeps previous data while fetching new data
		retry: false, // Disable retry to handle errors manually
	});
};

export default useGetAllMembers;

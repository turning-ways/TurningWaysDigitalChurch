import ApiClient from "./api-client";

export interface Member {
	member: {
		_id: string;
		churchId: string;
		userId: string;
		orgRole: {
			_id: string;
			name: string;
		};
		age: string;
		profile: {
			firstName: string;
			lastName: string;
			photo: string;
			email: string;
			phone: {
				mainPhone: string;
				otherPhone: Array<string>;
			};
			address: {
				homeAddress: string;
				workAddress: string;
			};
			dateOfBirth: string;
			gender: string;
			maritalStatus: string;
			suffix: string;
			prefix: string;
			active: boolean;
			anniversary: Array<{
				name: string;
				date: string;
				_id: string;
			}>;
			worker: string; // TODO: To be Removed
			workerStatus: boolean; // TODO: To be
			healthStatus: string;
			employmentStatus: string;
			educationalLevel: string;
		};
		notes: Array<{
			comment: string;
			date: string;
			member: string;
			type: string;
		}>;
		createdBy: {
			profile: {
				firstName: string;
				lastName: string;
			};
		};
		createdAt: string;
		verification: string;
		updatedAt: string;
	};
}

const apiClient = <T>(memberId: string | null, churchId: string | undefined, endpoint?: string) => {
	return new ApiClient<T>(
		`/api/v1/members/${churchId}/member/${memberId}` + `${endpoint ? endpoint : ""}`
	);
};

export default apiClient;

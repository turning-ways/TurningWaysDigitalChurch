/* eslint-disable no-mixed-spaces-and-tabs */
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import { formatDateTime } from "./PersonalInformation";

const MembershipHistory = () => {
	// dateJoined, createdBy and updated at
	const member = useSelector((state: RootState) => state.members.member);
	const navigate = useNavigate();

	const queryParams = new URLSearchParams(location.search);

	const memberId = queryParams.get("id");

	return (
		<div className="">
			{member && (
				<div>
					<div className="px-5 pt-6 pb-2 border-b space-y-2">
						<p className="text-[#727272]">Date Joined</p>
						<p className="outline-none text-[#434343] text-lg w-full">
							{formatDateTime(member?.createdAt)}
						</p>
					</div>
					<div className="px-5 pt-6 pb-2 border-b space-y-2">
						<p className="text-[#727272]">Created By</p>
						<p className="outline-none text-[#434343] text-lg w-full">
							{member?.createdBy
								? member?.createdBy.profile.firstName + " " + member?.createdBy.profile.lastName
								: "None"}
						</p>
					</div>
					<div className="px-5 pt-6 pb-2 border-b space-y-2">
						<p className="text-[#727272]">Updated At</p>
						<p className="outline-none text-[#434343] text-lg w-full">
							{formatDateTime(member?.updatedAt)}
						</p>
					</div>
					<button
						className=" flex mt-4 bg-[#17275B] text-white px-4 py-2  rounded-lg gap-2 justify-center "
						onClick={() => navigate(`/admin/directory/member/church-information?id=${memberId}`)}>
						<p className="text-lg">Previous</p>
					</button>
				</div>
			)}
		</div>
	);
};

export default MembershipHistory;

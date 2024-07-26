import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";

const ContactInformation = () => {
	const queryParams = new URLSearchParams(location.search);
	const { member } = useSelector((state: RootState) => state.members);

	const memberId = queryParams.get("id");

	const navigate = useNavigate();

	return (
		<div className="">
			{member && (
				<div>
					<div className="px-5 pt-6 pb-2 border-b md:space-y-2">
						<p className="text-[#727272]">Email</p>
						<p className="outline-none text-[#434343] text-lg w-full">
							{member?.profile?.email ? member?.profile?.email : "None"}
						</p>
					</div>
					<div className="px-5 pt-6 pb-2 border-b md:space-y-2">
						<p className="text-[#727272]">Address</p>
						<p className="outline-none text-[#434343] text-lg w-full">
							{member?.profile?.address?.homeAddress
								? member?.profile?.address?.homeAddress
								: "None"}
						</p>
					</div>
					<div className="px-5 pt-6 pb-2 border-b md:space-y-2">
						<p className="text-[#727272]">Phone Number</p>
						<p className="outline-none text-[#434343] text-lg w-full">
							{member?.profile?.phone?.mainPhone}
						</p>
					</div>
					<div className="flex justify-between">
						<button
							className=" flex mt-4 bg-[#17275B] text-white px-4 py-2  rounded-lg gap-2 justify-center "
							onClick={() =>
								navigate(`/admin/directory/member/personal-information?id=${memberId}`)
							}>
							<p className="text-lg ">Previous</p>
						</button>
						<button
							className=" flex mt-4 bg-[#17275B] text-white px-4 py-2  rounded-lg gap-2 justify-center "
							onClick={() => navigate(`/admin/directory/member/church-information?id=${memberId}`)}>
							<p className="text-lg ">Next</p>
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default ContactInformation;

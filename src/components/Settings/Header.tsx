import { AiOutlineMessage } from "react-icons/ai";
import { FaRegEnvelope } from "react-icons/fa6";
// import { IoIosArrowBack } from "react-icons/io";
import { IoCallOutline } from "react-icons/io5";
import { MdVerified } from "react-icons/md";
import { SlNote } from "react-icons/sl";
import { useNavigate } from "react-router-dom";
// import { RiDeleteBin4Line } from "react-icons/ri";
// import useDeleteMember from "../../hooks/Member/member-service/useDeleteMember";
import { useState } from "react";
import Modal from "../../ui/Modal/Modal";
import { useSmsRecepientStore } from "../../stores/smsRecepient";
import ChurchProfileEdit from "./ChurchProfileEdit";
import useGetMemberDetails from "../../hooks/Member/member-service/useGetMemberDetails";

// interface SubHeaderProps {
//   onNoteClick: () => void;
// }

const Header = () => {
	const navigate = useNavigate();
	// const queryParams = new URLSearchParams(location.search);

	// const memberId = queryParams.get("id");
	const { data } = useGetMemberDetails();

	// const { mutate } = useDeleteMember();

	// const handleDeleteMember = () => {
	//   mutate(memberId ? memberId : "");
	// };

	const [open, setOpen] = useState<boolean>(false);

	//   const [openNote, setOpenNote] = useState<boolean>(false);

	const { addRecepients } = useSmsRecepientStore();

	// function capitalizeFirstLetter(str: string) {
	//   return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
	// }

	return (
		<div className="flex justify-between md:items-center relative flex-col md:flex-row">
			{/* <div
        className="bg-[#F1F0F3] rounded-lg p-2 w-fit cursor-pointer h-fit md:absolute md:top-1/3 md:left-0"
        onClick={() => navigate("/admin/directory")}
      >
        <IoIosArrowBack className=" text-2xl w-auto text-[#6C6C6D]" />
      </div> */}
			<div className="flex md:space-x-5 items-center flex-col md:flex-row w-full space-y-5 md:space-y-0">
				<div className="h-40 w-40 md:h-24 relative md:w-28">
					{data?.member?.profile.photo ? (
						<img
							src={data?.member?.profile.photo ?? ""}
							className="w-full md:w-full h-full rounded-full"
							alt="profile picture"
						/>
					) : (
						<div className="bg-red-100 md:w-24 w-40 h-full rounded-full " />
					)}
					<MdVerified className="absolute bottom-4 left-[130px] md:bottom-1 md:left-[70px] text-4xl md:text-2xl text-[#61BD74]" />
				</div>
				<div className="md:flex space-y-4 md:justify-between md:w-full">
					<div className="flex flex-col space-y-3">
						<div className="flex space-x-3 items-center justify-between">
							<p className="font-azoSemiBold text-[24px] sm:text-[32px] text-[#5B5A5A] ">
								{/* {data &&
                  capitalizeFirstLetter(data.member.first_name) +
                    " " +
                    capitalizeFirstLetter(data.member.last_name)} */}
								Winner's Chapel
							</p>
							<div className="bg-[#E7E6E6] p-2 rounded-[8px] text-[14px] text-[#505050]">
								{/* {data?.member?.role} */}
								Member
							</div>
						</div>
						<ul className="flex justify-between text-[#727171] gap-x-4">
							<li className="flex items-center space-x-1 cursor-pointer">
								<IoCallOutline className="text-xl" />
								<p>Call</p>
							</li>
							<li
								className="flex items-center space-x-1 cursor-pointer"
								onClick={() => {
									navigate("/admin/directory/sms");
									addRecepients(data?.member ? [data?.member] : []);
								}}>
								<AiOutlineMessage className="text-xl" />
								<p>Text</p>
							</li>
							<li className="flex items-center space-x-1 cursor-pointer">
								<FaRegEnvelope className="text-xl" />
								<p>Email</p>
							</li>
							<li
								className="flex items-center space-x-1 cursor-pointer"
								// onClick={() => {
								//   setOpenNote(!openNote);
								//   onNoteClick();
								// }}
							>
								<SlNote className="text-xl" />
								<p>Note</p>
							</li>
						</ul>
					</div>
					<div className="flex items-center space-x-2 justify-center md:justify-normal ">
						<button
							className="bg-white text-[#898888] border border-[#BFBFBF] px-3 lg:px-6 py-3 rounded-[8px] font-medium h-fit whitespace-nowrap flex-1 md:flex-none"
							onClick={() => {
								setOpen(true);
							}}>
							Edit Profile
						</button>
						{/* <RiDeleteBin4Line
              className="text-[#F24E1E] text-xl cursor-pointer"
              onClick={() => setOpen(true)}
            /> */}
					</div>
				</div>
			</div>
			{open && (
				<Modal onClose={() => setOpen(false)} className="">
					<ChurchProfileEdit />
				</Modal>
			)}
		</div>
	);
};

export default Header;

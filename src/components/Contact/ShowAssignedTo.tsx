import Modal from "../../ui/Modal/Modal";
// import { useAssignMember } from "../../hooks/useContact";
import { capitalizeFirstLetters } from "../../constants/constants";
import { useParams } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import { selectMembers } from "../../slices/memberSlice";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { useChurchIdStore } from "../../stores/churchId";
import {
	assignMemberToContact,
	selectAssignedLoading,
	removeMemberFromContact,
} from "../../slices/contactSlice";
import { getAllMembers } from "../../slices/memberSlice";
import { useEffect } from "react";
import { BiX } from "react-icons/bi";
import { AssignedTo } from "../../types/contact";

const ShowAssignedTo = ({
	onClose,
	assignedTo,
}: {
	onClose: () => void;
	assignedTo: AssignedTo[];
}) => {
	const dispatch = useDispatch<AppDispatch>();
	const members = useSelector(selectMembers);
	const isPending = useSelector(selectAssignedLoading);
	const churchId = useChurchIdStore((state) => state.churchId);

	const { contact_id } = useParams();
	const safeContactId = contact_id ?? "";
	const handleAssignMember = (memberId: string) => {
		dispatch(
			assignMemberToContact({ churchId: churchId, contactId: safeContactId, memberId: memberId })
		);
		onClose();
	};
	const handleUnassignMember = (memberId: string) => {
		dispatch(
			removeMemberFromContact({ churchId: churchId, contactId: safeContactId, memberId: memberId })
		);
		onClose();
	};

	useEffect(() => {
		dispatch(getAllMembers({ churchId: churchId }));
	}, [dispatch]);

	return (
		<Modal onClose={onClose} className="">
			<div className={`w-[250px] bg-white px-3 py-4 border rounded-xl flex flex-col space-y-4`}>
				<p className="text-[#555555] font-bold">Assign To</p>
				{members.length > 0 ? (
					members.map((member, i) => (
						<ul className="text-[#555555] hover:text-[#A0D7AC]">
							<li
								key={i}
								className="cursor-pointer flex gap-4 items-center"
								onClick={() => handleAssignMember(member._id)}>
								{member?.photo ? (
									<img src={member?.photo} className="size-8 object-cover rounded-full" />
								) : (
									<div className="size-8 bg-[#F3F3F3] rounded-full">
										<p className="text-[#7A7A7A] text-center mt-1">{`${member?.firstName[0]}${member?.lastName[0]}`}</p>
									</div>
								)}
								<div className="flex flex-col">
									<p className="font-bold">
										{capitalizeFirstLetters(member.firstName) +
											" " +
											capitalizeFirstLetters(member.lastName)}
									</p>
								</div>
							</li>
						</ul>
					))
				) : (
					<p className="text-center">No members</p>
				)}
				<div className="flex justify-start flex-col  gap-2">
					<p>Assigned To</p>
					<ul className="text-[#555555] flex flex-col w-full gap-1.5">
						{assignedTo.map((member, i) => (
							<li
								key={i}
								className="cursor-pointer flex items-center justify-between w-full hover:bg-gray-100 rounded-md p-1">
								<span className="flex gap-4 items-center hover:text-[#A0D7AC]">
									{member?.profile?.photo ? (
										<img
											src={member?.profile?.photo}
											className="size-8 object-cover rounded-full"
										/>
									) : (
										<div className="size-8 bg-[#F3F3F3] rounded-full">
											<p className="text-[#7A7A7A] text-center mt-1">{`${member?.profile?.firstName[0]}${member?.profile?.lastName[0]}`}</p>
										</div>
									)}
									<div className="flex justify-between items-center">
										<p className="font-bold">
											{capitalizeFirstLetters(member?.profile?.firstName) +
												" " +
												capitalizeFirstLetters(member?.profile?.lastName)}
										</p>
									</div>
								</span>
								<button className="flex" onClick={() => handleUnassignMember(member._id)}>
									{!isPending ? (
										<BiX className="text-2xl font-light" />
									) : (
										<ThreeDots width={24} height={24} color="black" />
									)}
								</button>
							</li>
						))}
					</ul>
				</div>
				<button
					className="px-10 w-fit bg-[#F3F3F3] text-[#7A7A7A] self-center rounded-[14px] py-2 flex justify-center"
					onClick={onClose}>
					{!isPending ? <p>Cancel</p> : <ThreeDots width={24} height={24} color="black" />}
				</button>
			</div>
		</Modal>
	);
};

export default ShowAssignedTo;

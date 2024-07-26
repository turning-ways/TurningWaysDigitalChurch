/* eslint-disable @typescript-eslint/no-explicit-any */
import Modal from "../../../ui/Modal/Modal";
import { IoFilter } from "react-icons/io5";
import useGetAllMembers from "../../../hooks/Member/useGetAllMembers";
import { useEffect, useState } from "react";
import { useSmsRecepientStore } from "../../../stores/smsRecepient";

interface AddRecipientsModalProps {
	onClose: () => void;
}

const AddRecipientsModal: React.FC<AddRecipientsModalProps> = ({ onClose }) => {
	const { data: members } = useGetAllMembers({ page: 1, pageSize: 10000 });
	const { addRecepients, recepients } = useSmsRecepientStore();

	const [selectAll, setSelectAll] = useState(false);
	const [memberCheckboxes, setMemberCheckboxes] = useState(Array(members?.length).fill(false));

	const [selectedMembers, setSelectedMembers] = useState<any[]>([]);

	const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
		const isChecked = event.target.checked;
		setSelectAll(isChecked);
		setMemberCheckboxes(memberCheckboxes.map(() => isChecked));
		if (isChecked) {
			// If select all is checked, add all members to selectedMembers
			setSelectedMembers(members ? [...members] : []);
		} else {
			// If select all is unchecked, remove all members from selectedMembers
			setSelectedMembers([]);
		}
	};

	const handleMemberCheckboxChange = (index: number) => {
		const updatedCheckboxes = [...memberCheckboxes];
		updatedCheckboxes[index] = !updatedCheckboxes[index];
		setMemberCheckboxes(updatedCheckboxes);
		setSelectAll(updatedCheckboxes.every((checkbox) => checkbox === true));
		const selectedMember = members && members[index];
		if (updatedCheckboxes[index]) {
			setSelectedMembers((prevMembers) => [...prevMembers, selectedMember]);
		} else if (updatedCheckboxes[index] === false) {
			setSelectedMembers((prevState) =>
				selectedMember
					? prevState.filter((member: { id: string }) => member.id !== selectedMember.id)
					: []
			);
		}
	};

	const handleDisplayButtonClick = () => {
		// const selectedMembers = members?.filter(
		//   (_: any, index: number) => memberCheckboxes[index]
		// );
		// setDisplayedMembers(selectedMembers ? selectedMembers : []);
		console.log(selectedMembers);
		addRecepients(selectedMembers);
	};

	useEffect(() => {
		if (members) {
			setMemberCheckboxes(
				members.map((member: { id: any }) =>
					recepients.some((recipient) => recipient.id === member.id)
				)
			);
		}
	}, [members, recepients]);

	return (
		<Modal onClose={() => console.log("Do nothing")} className="">
			<div className="bg-white p-6 rounded-xl m-10 max-h-screen overflow-y-scroll">
				<div className="p-4 flex justify-between items-center">
					<div className="flex space-x-2 text-[#7F7F7F]">
						{/* <input type="checkbox" /> */}
						<p>{members?.length} Persons</p>
					</div>
					<div className="flex items-center space-x-2 cursor-pointer text-[#AAAAAA]">
						<p>
							<IoFilter />
						</p>
						<p>Filter</p>
					</div>
				</div>
				<div className="border rounded-xl">
					<div className="grid grid-cols-[100px,210px,280px,150px,150px,auto] gap-4 border-b p-4 ">
						<div className="flex space-x-1 items-center">
							<input type="checkbox" checked={selectAll} onChange={handleSelectAll} />
							<p>Profile</p>
						</div>
						<div className="">Name</div>
						<div className="">Email</div>
						<div className="">Phone Number</div>
						<div className="">Gender</div>
					</div>

					{members?.map((item: any, index: number) => (
						<div className="grid grid-cols-[100px,210px,280px,150px,150px,auto] gap-4 border-b p-4  ">
							<div className="flex space-x-3 items-center">
								<input
									type="checkbox"
									checked={memberCheckboxes[index]}
									onChange={() => handleMemberCheckboxChange(index)}
								/>
								{item.photo ? (
									<img src={item.photo} className="rounded-full w-10 h-10" />
								) : (
									<div className="bg-red-200 w-10 flex justify-center items-center">P</div>
								)}
							</div>
							<div className="flex items-center">{item.first_name + " " + item.last_name}</div>
							<div className="flex items-center">{item.email}</div>
							<div className="flex items-center">{item.phone.MainPhone}</div>
							<div className="flex items-center">{item.gender}</div>
						</div>
					))}
				</div>
				<div className="flex justify-center space-x-8 mt-6">
					<button
						className="text-[#4C4C4C] bg-[#F4F4F4] rounded-lg w-64 py-2 text-lg"
						onClick={() => {
							handleDisplayButtonClick();
							onClose();
						}}>
						Add Recipients
					</button>
					<button
						className="text-[#4E4E4E] bg-white rounded-lg w-64 py-2 text-lg border border-[#AAAAAA]"
						onClick={onClose}>
						Cancel
					</button>
				</div>
			</div>
		</Modal>
	);
};

export default AddRecipientsModal;

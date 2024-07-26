import { IoIosAddCircle } from "react-icons/io";
import Heading from "../../pages/Overview/Contacts/Heading";
import { useState } from "react";
import ShowAssignedTo from "./ShowAssignedTo";
import { useSelector } from "react-redux";
import {
	selectSelectedContact,
	// selectAssignedToLoading,
	// removeAssignedTo,
} from "../../slices/contactSlice";

const AssignedTo = () => {
	const [showMembers, setShowMembers] = useState(false);
	const contact = useSelector(selectSelectedContact);
	// const contactDetailsQuery = useGetContacts();

	return (
		<section>
			<Heading text="Assigned To" />
			<div className="flex space-x-3 items-center" onClick={() => setShowMembers(!showMembers)}>
				{contact?.assignedTo &&
					contact?.assignedTo.length > 0 &&
					contact?.assignedTo.map((member) =>
						member?.profile?.photo ? (
							<img src={member?.profile?.photo} className="size-8 object-cover rounded-full" />
						) : (
							<div className="size-8 bg-[#F3F3F3] rounded-full">
								<p className="text-[#7A7A7A] text-center mt-1">{`${member?.profile?.firstName[0]}${member?.profile?.lastName[0]}`}</p>
							</div>
						)
					)}
				<IoIosAddCircle
					className="text-2xl text-[#444343] cursor-pointer"
					onClick={() => setShowMembers(!showMembers)}
				/>
				{showMembers && (
					<ShowAssignedTo
						onClose={() => setShowMembers(!showMembers)}
						assignedTo={contact?.assignedTo || []}
					/>
				)}
			</div>
		</section>
	);
};

export default AssignedTo;

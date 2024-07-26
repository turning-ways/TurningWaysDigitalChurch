import { BiSolidDownArrow } from "react-icons/bi";
import Heading from "./Heading";
import { useEffect, useState } from "react";
import {
	selectContactsLoading,
	selectSelectedContact,
	updateContactStatus,
	selectStatusLoading,
} from "../../../slices/contactSlice";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "../../../store";
import UpdateContact from "./UpdateContact";
import { useParams } from "react-router-dom";
import { capitalize, formatContactsDate as formatDate } from "../../../utils/formatter";
import { useChurchIdStore } from "../../../stores/churchId";

const Information = () => {
	const [open, setOpen] = useState<boolean>(false);
	const [openStatus, setOpenStatus] = useState<boolean>(false);
	const contact = useSelector(selectSelectedContact);
	const [status, setStatus] = useState<string | null>(null);
	const isPending = useSelector(selectContactsLoading);
	const isStatusPending = useSelector(selectStatusLoading);
	const dispatch = useDispatch<AppDispatch>();
	const { contact_id } = useParams();
	const safeContactId = contact_id ?? "";
	const churchId = useChurchIdStore((state) => state.churchId);

	useEffect(() => {
		if (contact) {
			setStatus(contact.contactStatus);
		}
	}, [contact]);

	const handleStatusChange = (status: string) => {
		dispatch(updateContactStatus({ contactId: safeContactId, status, churchId }));
		setOpenStatus(false);
	};

	return (
		<div className="relative">
			<Heading text="Contact Information" />

			<h2 className="md:mt-4 text-xl font-medium">
				{!isPending ? (
					contact &&
					contact?.firstName &&
					capitalize(contact?.firstName) + " " + capitalize(contact?.lastName || "")
				) : (
					<span className="skeleton skeleton-text w-60"></span>
				)}
			</h2>
			<div className="md:flex justify-between items-center space-y-2 md:space-y-0 mb-8 md:mb-0">
				<p className="text-sm text-[#A1A0A0] mb-4 md:mb-0">
					{!isPending ? (
						contact &&
						contact.createdAt &&
						contact.updatedAt &&
						`Created: ${formatDate(contact?.createdAt)} | Last Modified: ${formatDate(
							contact?.updatedAt
						)}`
					) : (
						<span className="skeleton skeleton-text w-96"></span>
					)}
				</p>
				<div className="flex space-x-4 relative">
					<button
						className={` text-white flex items-center py-2 px-6 rounded-lg space-x-1 min-w-20 ${
							status === "contacted" && "bg-[#A561BD]"
						} ${status === "new" && "bg-primary"} ${status === "won" && "bg-[#61BD74]"} ${
							status === "lost" && "bg-[#BD6161]"
						}`}
						onClick={() => setOpenStatus(!openStatus)}>
						{!isStatusPending ? (
							<span className="flex gap-2 items-center">
								<span>{status}</span> <BiSolidDownArrow className="text-[10px]" />
							</span>
						) : (
							<span className="skeleton skeleton-text w-20"></span>
						)}
					</button>
					<button
						className="border border-[#17275B] text-[#17275B] px-4 py-2 rounded-lg"
						onClick={() => setOpen(!open)}>
						Edit Contact
					</button>
					{openStatus && (
						<div
							className={`modal bg-white rounded-2xl w-[280px] px-6 py-4 space-y-6 border -left-4 md:left-auto md:right-[136px] absolute top-12 z-50 `}>
							<ul className="  space-y-2">
								<li
									className="text-primary cursor-pointer"
									onClick={() => {
										setOpenStatus(false);
										setStatus("new");
										handleStatusChange("new");
									}}>
									new
								</li>
								<li
									className="text-[#B061BD] cursor-pointer"
									onClick={() => {
										setOpenStatus(false);
										setStatus("contacted");
										handleStatusChange("contacted");
									}}>
									contacted
								</li>
								<li
									className="text-[#61BD74] cursor-pointer"
									onClick={() => {
										setOpenStatus(false);
										setStatus("won");
										handleStatusChange("won");
									}}>
									won
								</li>
								<li
									className="text-[#BD6161] cursor-pointer"
									onClick={() => {
										setOpenStatus(false);
										setStatus("lost");
										handleStatusChange("lost");
									}}>
									lost
								</li>
							</ul>
							<button
								className="text-[#7A7A7A] bg-[#F3F3F3] px-6 py-2 w-full rounded-md hover:text-[#2A2A2A]"
								onClick={() => setOpenStatus(!openStatus)}>
								Cancel
							</button>
						</div>
					)}
				</div>
			</div>
			{open && <UpdateContact onClose={() => setOpen(!open)} />}
		</div>
	);
};

export default Information;

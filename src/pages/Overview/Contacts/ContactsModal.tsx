import React, { useRef, useState, MouseEvent } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../../../ui/Modal/Modal";
import { ThreeDots } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { useChurchIdStore } from "../../../stores/churchId";
import { AppDispatch } from "../../../store";
import { deleteContact, selectContactsLoading } from "../../../slices/contactSlice";
import { MouseEvent as ReactMouseEvent } from "react";

interface ContactsModalProps {
	show: string | null;
	id: string;
	onClose: (e: ReactMouseEvent) => void;
}

const ContactsModal: React.FC<ContactsModalProps> = ({ show, id, onClose }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();
	const loading = useSelector(selectContactsLoading);
	const churchId = useChurchIdStore((state) => state.churchId);

	const [openDelete, setOpenDelete] = useState(false);
	const modalRef = useRef<HTMLDivElement>(null);
	const deleteRef = useRef<HTMLDivElement>(null);

	// const handleClickOutside = useCallback(
	// 	(event: MouseEvent) => {
	// 		if (
	// 			modalRef.current &&
	// 			!modalRef.current.contains(event.target as Node) &&
	// 			!deleteRef.current?.contains(event.target as Node)
	// 		) {
	// 			onClose(event);
	// 		}
	// 	},
	// 	[onClose]
	// );

	// useEffect(() => {
	// 	document.addEventListener("mousedown", handleClickOutside);
	// 	return () => {
	// 		document.removeEventListener("mousedown", handleClickOutside);
	// 	};
	// }, [handleClickOutside]);

	const handleDeleteContact = (e: MouseEvent, contactId: string) => {
		e.stopPropagation();
		dispatch(deleteContact({ churchId, contactId }));
		setOpenDelete(false);
		onClose(e);
	};

	const handleCancelDelete = () => {
		setOpenDelete(false);
	};

	const handleViewMoreClick = (e: MouseEvent) => {
		e.stopPropagation();
		navigate(`/admin/contacts/${id}`);
	};

	const handleDeleteClick = (e: MouseEvent) => {
		e.stopPropagation();
		setOpenDelete(true);
	};

	return (
		<div ref={modalRef} className="self-end z-[10000] absolute top-12 -right-12">
			<div
				className={`modal bg-white rounded-2xl w-[200px] px-3 py-4 space-y-3 border z-50 ${
					show === id ? "block" : "hidden"
				}`}>
				<ul className="text-[#555555] space-y-2">
					<li className="hover:text-[#A0D7AC] cursor-pointer" onClick={handleViewMoreClick}>
						View More
					</li>
					<li className="hover:text-[#A0D7AC] cursor-pointer" onClick={handleDeleteClick}>
						Delete Contact
					</li>
				</ul>
				<button
					className="text-[#7A7A7A] bg-[#F3F3F3] px-6 py-2 w-full rounded-[14px] hover:text-[#2A2A2A]"
					onClick={(e) => onClose(e)}>
					Cancel
				</button>
			</div>

			{openDelete && (
				<Modal onClose={handleCancelDelete} className="">
					<div ref={deleteRef} className="bg-white flex flex-col space-y-3 p-4 rounded-[16px]">
						<h1 className="text-lg text-[#555555]">Delete Contact</h1>
						<p className="text-[#7F7F7F] text-lg">Are you sure you want to delete this contact?</p>
						<div className="space-x-4 flex">
							<button
								className="bg-[#F4F4F4] text-[#7B7B7B] rounded-[14px] w-full py-2 px-4 hover:bg-[#17275B] hover:text-white"
								onClick={handleCancelDelete}>
								No
							</button>
							<button
								className="bg-[#F4F4F4] text-[#7B7B7B] rounded-[14px] w-full py-2 px-4 hover:bg-[#17275B] hover:text-white flex justify-center"
								onClick={(e) => handleDeleteContact(e, id)}
								disabled={loading}>
								{!loading ? <p>Yes</p> : <ThreeDots width={34} height={24} color="white" />}
							</button>
						</div>
					</div>
				</Modal>
			)}
		</div>
	);
};

export default ContactsModal;

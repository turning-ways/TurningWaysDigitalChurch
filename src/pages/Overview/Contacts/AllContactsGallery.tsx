import { PiDotsThreeCircleLight } from "react-icons/pi";
import { useState, MouseEvent as ReactMouseEvent } from "react";
import ContactsModal from "./ContactsModal";
import { selectContacts } from "../../../slices/contactSlice";
import { useSelector } from "react-redux";
import { capitalize, formatContactsDate as formatDate } from "../../../utils/formatter";
import { getDarkerShade } from "../../../constants/constants";
import { useNavigate } from "react-router-dom";

const AllContactsGallery = () => {
	const navigate = useNavigate();
	const [show, setShow] = useState<string | null>(null);
	const contacts = useSelector(selectContacts);
	console.log(contacts);

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-6">
			{contacts ? (
				contacts.map((contact) => (
					<div
						key={contact.id}
						className="text-[#2A2A2A] border border-[#2A2A2A] w-full rounded-2xl p-4 relative flex flex-col hover:bg-gray-50"
						onClick={() => navigate("/admin/contacts/" + contact.id)}>
						<div className="flex items-center justify-between ">
							<p className="font-azoSemiBold text-xl">
								{contact?.lastName === null
									? capitalize(contact?.firstName)
									: `${capitalize(contact?.firstName)} ${capitalize(contact?.lastName)}`}
							</p>
							<PiDotsThreeCircleLight
								onClick={(e) => {
									e.stopPropagation();
									setShow(contact.id);
								}}
								className="cursor-pointer z-10"
								size={20}
							/>
						</div>
						<div className="flex items-center justify-between mt-2">
							<p>{contact?.phone}</p>
							<p
								className={`${contact?.contactStatus === "new" && "text-primary"} ${
									contact?.contactStatus === "contacted" && "text-[#B061BD]"
								} ${contact?.contactStatus === "won" && "text-[#61BD74]"} ${
									contact?.contactStatus === "lost" && "text-[#BD6161]"
								}`}>
								{contact?.contactStatus}
							</p>
						</div>
						<div className="flex mt-4 gap-2 w-full flex-wrap">
							{contact.labels && Array.isArray(contact.labels) && contact.labels.length > 0 ? (
								contact.labels.map((item: { label: string; color: string }) => (
									<div
										key={item.label}
										style={{
											backgroundColor: getDarkerShade(item.color, -0.7),
											borderColor: getDarkerShade(item.color, 0.3),
										}}
										className="rounded-lg px-2 py-1 text-xs border">
										{item.label}
									</div>
								))
							) : (
								<p className="text-[#c2c0c0] py-2">No labels have been added</p>
							)}
						</div>
						<hr className="my-4 " />
						<div className="flex justify-between items.center">
							<p>
								<span className="font-azoSemiBold">Last Modified:</span>{" "}
								{formatDate(contact.updatedAt)}
							</p>
							<div className="flex items-center gap-2">
								{contact?.assignedTo.length > 0 ? (
									contact.assignedTo.map((item) => {
										return (
											<div key={item.id} className="flex items-center gap-2">
												{item?.profile?.photo ? (
													<img
														src={item?.profile?.photo}
														alt="avatar"
														className="h-8 w-8 rounded-full object-cover"
													/>
												) : (
													<div className="h-8 w-8 rounded-full bg-gray-300 flex justify-center items-center font-medium">
														{item?.profile?.firstName?.charAt(0).toUpperCase()}
														{item?.profile?.lastName
															? item?.profile?.lastName?.charAt(0).toUpperCase()
															: ""}
													</div>
												)}
											</div>
										);
									})
								) : (
									<p className="text-[#c2c0c0] py-1">No assigned user</p>
								)}
							</div>
						</div>
						<ContactsModal
							show={show}
							id={contact.id}
							onClose={(e: ReactMouseEvent) => {
								e.stopPropagation();
								setShow(null);
							}}
						/>
					</div>
				))
			) : (
				<p>No Contacts have been added yet</p>
			)}
		</div>
	);
};

export default AllContactsGallery;

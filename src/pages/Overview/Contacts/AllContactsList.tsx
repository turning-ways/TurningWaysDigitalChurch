/* eslint-disable no-mixed-spaces-and-tabs */
import React from "react";
import { selectContacts, selectContactsLoading, deleteContact } from "../../../slices/contactSlice";
import { SlArrowRight } from "react-icons/sl";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "../../../store";
import { capitalize, formatContactsDate as formatDate } from "../../../utils/formatter";
import TableShimmerSkeleton from "../../../ui/shimmers/tableShimmers";
import { BiTrash } from "react-icons/bi";
import { useChurchIdStore } from "../../../stores/churchId";
import { ThreeDots } from "react-loader-spinner";

const AllContactsList = () => {
	const dispatch = useDispatch<AppDispatch>();
	const contacts = useSelector(selectContacts);
	const isPending = useSelector(selectContactsLoading);
	const churchId = useChurchIdStore((state) => state.churchId);
	const navigate = useNavigate();

	const handleDelete = (e: React.MouseEvent, contactId: string) => {
		e.stopPropagation();
		dispatch(
			deleteContact({
				churchId: churchId,
				contactId: contactId,
			})
		);
	};

	return (
		<>
			<div className="flex flex-col">
				{isPending && <TableShimmerSkeleton rowsNum={10} colsNum={6} />}
				{!isPending && contacts && Array.isArray(contacts) && (
					<>
						{contacts && Array.isArray(contacts) && (
							<div className="overflow-x-auto hidden lg:block  border !rounded-t-md border-gray-400">
								<table className="min-w-full bg-white table-auto">
									<thead className="rounded-t-md">
										<tr className="w-full bg-[#E8EDFF] text-left text-[#636363] rounded-t-md">
											<th className="py-2 px-3 rounded-tl-md">Name</th>
											<th className="py-2 px-3">Phone Number</th>
											<th className="py-2 px-3">Assigned To</th>
											<th className="py-2 px-3">Label</th>
											<th className="py-2 px-3">Status</th>
											<th className="py-2 px-3">Modified</th>
										</tr>
									</thead>
									<tbody>
										{contacts.map((contact) => (
											<tr
												key={contact.id}
												className="border-b text-[#636363] hover:bg-gray-100 transition duration-200 relative "
												onClick={() => navigate("/admin/contacts/" + contact.id)}>
												<td className="py-2 px-3 truncate cursor-pointer">
													{contact?.lastName === null
														? capitalize(contact?.firstName)
														: `${capitalize(contact?.firstName)} ${capitalize(contact?.lastName)}`}
												</td>
												<td className="py-2 px-3">{contact?.phone}</td>
												<td className="py-2 px-3 truncate">
													{contact?.assignedTo && contact.assignedTo.length > 0
														? `${contact?.assignedTo[0]?.profile?.firstName} ${
																contact?.assignedTo[0]?.profile?.lastName
														  } ${contact?.assignedTo.length > 1 ? ", ..." : ""}`
														: "No assigned member"}
												</td>
												<td className="py-2 px-3 truncate">
													{contact.labels && contact.labels.length > 0
														? `${contact.labels[0].label} ${contact.labels.length > 1 ? "..." : ""}`
														: "NIL"}
												</td>
												<td
													className={`py-2 px-3 ${
														contact?.contactStatus === "new" && "text-primary"
													} ${contact?.contactStatus === "contacted" && "text-[#B061BD]"} ${
														contact?.contactStatus === "won" && "text-[#61BD74]"
													} ${contact?.contactStatus === "lost" && "text-[#BD6161]"} `}>
													{contact?.contactStatus}
												</td>
												<td className="py-2 px-3 flex items-center justify-between">
													<p>{formatDate(contact?.updatedAt)}</p>
													<BiTrash
														className="text-red-400 cursor-pointer z-10"
														onClick={(e) => handleDelete(e, contact.id)}
													/>
												</td>
												{/* <ContactsModal show={show} id={contact.id} onClose={() => setShow(null)} /> */}
											</tr>
										))}
									</tbody>
								</table>
							</div>
						)}
						{contacts &&
							Array.isArray(contacts) &&
							!isPending &&
							contacts.map((contact) => (
								<div key={contact.id} className="lg:hidden">
									<div
										className="border-b border-[#BDBDBD] flex py-2 text-[#555454] px-3 justify-between items-center cursor-pointer hover:bg-[#F1F1F1] transition duration-200"
										onClick={() => navigate(`/admin/contacts/${contact.id}`)}>
										<div>
											<p className="text-xl font-medium">
												{contact?.lastName === null
													? capitalize(contact?.firstName)
													: `${capitalize(contact?.firstName)} ${capitalize(contact?.lastName)}`}
											</p>
											<p>{formatDate(contact?.updatedAt)}</p>
										</div>
										<SlArrowRight />
									</div>
								</div>
							))}
						{isPending && (
							<div className="flex justify-center items-center h-full">
								<ThreeDots color="black" width={24} height={24} />
							</div>
						)}
					</>
				)}
				{!contacts && !isPending && (
					<p className="text-sm text-[#D9D9D9]">No contacts have been added</p>
				)}
			</div>
		</>
	);
};

export default AllContactsList;

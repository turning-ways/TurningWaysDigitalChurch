/* eslint-disable no-mixed-spaces-and-tabs */
import { FaClockRotateLeft, FaCommentSms, FaRegCreditCard, FaRegEnvelope } from "react-icons/fa6";
import Modal from "../Modal/Modal";
import { useNavigate } from "react-router-dom";
import { CiExport, CiFilter, CiImport, CiMail } from "react-icons/ci";
import { useState } from "react";
import * as XLSX from "xlsx";
import { useSelector } from "react-redux";
import { selectContacts } from "../../slices/contactSlice";
// import { useGetAllContacts } from "../../hooks/useContact";

interface QuickActionsProps {
	display?: string;
}

const QuickActionsContact: React.FC<QuickActionsProps> = ({ display }) => {
	const items = [
		{ name: "Filter", icon: <CiFilter /> },
		{ name: "Send Bulk Message", icon: <CiMail /> },
		{ name: "Export Data", icon: <CiExport /> },
		{ name: "Import Data", icon: <CiImport /> },
	];

	const [open, setOpen] = useState<boolean>(false);
	const navigate = useNavigate();
	const contacts = useSelector(selectContacts);

	const handleOnExport = () => {
		const selectedContacts = contacts
			? contacts.map((contact) => ({
					firstName: contact?.firstName,
					lastName: contact?.lastName,
					phoneNumber: contact?.phone,
					maturity: contact?.maturityLevel,
			  }))
			: [{}];

		const wb = XLSX.utils.book_new(),
			ws = XLSX.utils.json_to_sheet(selectedContacts);
		XLSX.utils.book_append_sheet(wb, ws, "My Sheet !");
		XLSX.writeFile(wb, "MyExcel.xlsx");
	};
	return (
		<div
			className={`flex justify-between my-10 flex-col space-y-3 lg:flex-row lg:space-y-0 ${display}`}>
			<p className="lg:text-lg text-[#7F7E7E] text-base">
				{contacts ? contacts.length : 0} Persons
			</p>
			<ul className="flex space-x-6 text-[18px] text-[#8A8989] overflow-x-scroll scrollbar-hide">
				{items.map((item) => (
					<li
						key={item.name}
						className="flex items-center space-x-1 p-2 cursor-pointer hover:text-[#555555] whitespace-nowrap "
						onClick={() => {
							if (item.name === "Send Bulk Message") setOpen(!open);
							if (item.name === "Export Data") handleOnExport();
						}}>
						<div>{item.icon}</div>
						<p className="leading-3">{item.name}</p>
					</li>
				))}
			</ul>
			{open && (
				<Modal onClose={() => setOpen(false)} className="">
					<div className="bg-white px-[26px] py-[37px] rounded-2xl lg:text-lg flex flex-col gap-6">
						<ul className="text-[#7F7F7F] flex flex-col gap-6 w-[334px]">
							<li
								className="flex space-x-3 items-center cursor-pointer hover:text-[#555555]"
								onClick={() => navigate("/admin/directory/sms")}>
								<FaCommentSms className="text-2xl" />
								<p>Send Bulk SMS</p>
							</li>
							<li className="flex space-x-3 items-center cursor-pointer hover:text-[#555555]">
								<FaRegEnvelope />
								<p>Send Bulk Email</p>
							</li>
							<li className="flex space-x-3 items-center cursor-pointer hover:text-[#555555]">
								<FaClockRotateLeft />
								<p>View Bulk Message History</p>
							</li>
							<li className="flex space-x-3 items-center cursor-pointer hover:text-[#555555]">
								<FaRegCreditCard />
								<p>Buy SMS Credit</p>
							</li>
						</ul>
						<button
							className=" text-[#7B7B7B] bg-[#F4F4F4] w-[280px] py-2 rounded-[14px] self-center"
							onClick={() => setOpen(!open)}>
							Cancel
						</button>
					</div>
				</Modal>
			)}
		</div>
	);
};

export default QuickActionsContact;

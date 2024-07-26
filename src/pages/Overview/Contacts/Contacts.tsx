import { RxDashboard } from "react-icons/rx";
import Header from "../Header";
import OverviewContainer from "../OverviewContainer";
import { HiMiniPlusCircle } from "react-icons/hi2";
import { PiListDashesBold } from "react-icons/pi";
import AllContactsList from "./AllContactsList";
import AllContactsGallery from "./AllContactsGallery";
import { useEffect, useState } from "react";
import AddContact from "./AddContact";
import QuickActionsContact from "../../../ui/Actions/QuickActionsContact";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store";
import { useChurchIdStore } from "../../../stores/churchId";
import { fetchContacts } from "../../../slices/contactSlice";

const Contacts: React.FC = () => {
	const { churchId } = useChurchIdStore();
	const dispatch = useDispatch<AppDispatch>();

	const [activeView, setActiveView] = useState("list");
	const [openAddContact, setOpenAddContact] = useState(false);

	useEffect(() => {
		if (churchId) {
			dispatch(fetchContacts(churchId));
		}
	}, [churchId, dispatch]);

	const handleToggleView = (view: string) => {
		setActiveView(view);
	};

	const handleToggleAddContact = () => {
		setOpenAddContact(!openAddContact);
	};

	return (
		<>
			<OverviewContainer active="Contacts">
				<Header text="Contacts" />
				<QuickActionsContact display="hidden md:flex" />
				<div className="md:flex justify-between mb-10">
					<button
						className="rounded-[15px] border border-[#17275B] px-5 py-3 space-x-2 text-[#17275B] flex items-center my-10 md:my-0"
						onClick={handleToggleAddContact}>
						<HiMiniPlusCircle className="text-[21px]" />
						<p className="font-medium">Add Contact</p>
					</button>
					<div className="flex space-x-4 w-full md:w-fit">
						<button
							className={`flex space-x-2 items-center justify-center text-sm md:text-base  rounded-sm py-2 px-3 w-1/2 md:w-fit ${
								activeView === "list"
									? "text-white text-lg bg-[#041E71]"
									: "text-[#041E71] bg-white text-lg border border-[#041E71]"
							}`}
							onClick={() => handleToggleView("list")}>
							<PiListDashesBold className="text-xl" />
							<p>List View</p>
						</button>
						<button
							className={`flex space-x-2 items-center justify-center text-sm md:text-base rounded-sm py-2 px-3 w-1/2 md:w-fit ${
								activeView === "gallery"
									? "text-white text-lg bg-[#041E71]"
									: "text-[#041E71] bg-white text-lg border border-[#041E71]"
							}`}
							onClick={() => handleToggleView("gallery")}>
							<RxDashboard />
							<p>Gallery View</p>
						</button>
					</div>
				</div>

				{activeView === "list" ? <AllContactsList /> : <AllContactsGallery />}
				{openAddContact && <AddContact onClose={handleToggleAddContact} />}
			</OverviewContainer>
		</>
	);
};

export default Contacts;

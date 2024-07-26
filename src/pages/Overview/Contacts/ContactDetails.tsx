import { IoIosArrowBack } from "react-icons/io";
import Header from "../Header";
import OverviewContainer from "../OverviewContainer";
import Information from "./Information";
import { useNavigate, useParams } from "react-router-dom";
import Status from "../../../components/Contact/Status";
import Label from "../../../components/Contact/Label";
import ActionChecklist from "../../../components/Contact/ActionChecklist";
import AssignedTo from "../../../components/Contact/AssignedTo";
import TypeYourComment from "../../../components/Contact/TypeYourComment";
import Comments from "../../../components/Contact/Comments";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store";
import { fetchContact } from "../../../slices/contactSlice";
import { useEffect } from "react";
import { useChurchIdStore } from "../../../stores/churchId";

const ContactDetails = () => {
	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();
	const { contact_id } = useParams();
	const safeContactId = contact_id ?? "";
	const churchId = useChurchIdStore((state) => state.churchId);

	useEffect(() => {
		dispatch(
			fetchContact({
				contactId: safeContactId,
				churchId: churchId,
			})
		);
	}, [safeContactId, churchId, dispatch]);

	return (
		<OverviewContainer active="Contacts">
			<Header text="Contacts" />
			<button
				className="bg-[#F1F0F3] rounded-lg p-2 w-fit cursor-pointer h-fit my-6"
				onClick={() => navigate("/admin/contacts")}>
				<IoIosArrowBack className=" text-2xl w-auto text-[#6C6C6D]" />
			</button>
			<Information />
			<Status />
			<Label />
			<ActionChecklist />
			<AssignedTo />
			<TypeYourComment />
			<Comments />
		</OverviewContainer>
	);
};

export default ContactDetails;

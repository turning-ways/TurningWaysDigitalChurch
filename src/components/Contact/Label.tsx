import { IoIosAddCircle, IoIosClose } from "react-icons/io";
import Heading from "../../pages/Overview/Contacts/Heading";
import ShowLabels from "./ShowLabels";
import { useState } from "react";
import Color from "color";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import {
	selectSelectedContact,
	selectLabelLoading,
	removeLabelFromContact,
} from "../../slices/contactSlice";
import { useChurchIdStore } from "../../stores/churchId";

const Label = () => {
	const [showLabels, setShowLabels] = useState<boolean>(false);
	const contact = useSelector(selectSelectedContact);
	const labelLoading = useSelector(selectLabelLoading);
	const dispatch = useDispatch<AppDispatch>();
	const { contact_id } = useParams();
	const churchId = useChurchIdStore((state) => state.churchId);
	const safeContactId = contact_id ?? "";
	// const [id, setId] = useState("");

	const handleDeleteLabel = (id: string) => {
		dispatch(removeLabelFromContact({ churchId, contactId: safeContactId, labelId: id }));
	};

	return (
		<section className="-mt-4">
			<Heading text="Label" />
			<div className="flex space-x-3 items-center w-full">
				{!labelLoading ? (
					<>
						<div className="overflow-x-scroll flex gap-2 scrollbar-hide flex-wrap">
							{contact?.labels.map((item: { id: string; label: string; color: string }) => (
								<div
									style={{
										backgroundColor: getDarkerShade(item.color, -0.7),
										borderColor: getDarkerShade(item.color, 0.3),
									}}
									className={`border border-[${item.color}] rounded-md text-sm text-[#141414] flex items-center justify-center px-2 py-[1px] whitespace-nowrap`}>
									<p>{item.label}</p>
									<IoIosClose
										className="text-2xl cursor-pointer"
										onClick={() => {
											handleDeleteLabel(item.id);
										}}
									/>
								</div>
							))}
						</div>
						<IoIosAddCircle
							className="text-4xl lg:text-2xl text-[#444343] cursor-pointer"
							onClick={() => setShowLabels(!showLabels)}
						/>
					</>
				) : (
					<div className="skeleton w-48" />
				)}
			</div>
			{showLabels && <ShowLabels onClose={() => setShowLabels(!showLabels)} />}
		</section>
	);
};

export default Label;

const getDarkerShade = (color: string, amount: number = 0.2): string => {
	return Color(color).darken(amount).hex();
};

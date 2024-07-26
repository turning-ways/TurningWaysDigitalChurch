import { useState, useRef, useEffect } from "react";
import Modal from "../../ui/Modal/Modal";
import { useParams } from "react-router-dom";
import { BiPencil } from "react-icons/bi";
import { FaX } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { addLabelToContact } from "../../slices/contactSlice";
import { useChurchIdStore } from "../../stores/churchId";

export const labels = [
	{ id: 1, label: "Unattended", color: "grey" },
	{ id: 2, label: "Pending", color: "yellow" },
	{ id: 3, label: "Completed", color: "green" },
	{ id: 4, label: "Cancelled", color: "red" },
	{ id: 5, label: "In Progress", color: "blue" },
	{ id: 6, label: "Not Started", color: "orange" },
	{ id: 7, label: "On Hold", color: "purple" },
];

const ShowLabels = ({ onClose }: { onClose: () => void }) => {
	const dispatch = useDispatch<AppDispatch>();
	const { contact_id } = useParams();
	const { churchId } = useChurchIdStore();
	const [showEditLabel, setShowEditLabel] = useState<number | null>(null);
	const [labelsState, setLabelsState] = useState(labels);

	const colorVariants: { [key: string]: string } = {
		grey: "bg-gray-100 text-gray-500",
		yellow: "bg-yellow-100 text-yellow-500",
		green: "bg-green-100 text-green-500",
		red: "bg-red-100 text-red-500",
		blue: "bg-blue-100 text-blue-500",
		orange: "bg-orange-100 text-orange-500",
		purple: "bg-purple-100 text-purple-500",
	};

	const handleLabelChange = (id: number, newLabel: string) => {
		setLabelsState((prevState) =>
			prevState.map((item) => (item.id === id ? { ...item, label: newLabel } : item))
		);
	};

	const handleAddLabel = (id: number) => {
		const selectedLabel = labelsState.find((item) => item.id === id);
		if (selectedLabel) {
			dispatch(
				addLabelToContact({
					contactId: contact_id as string,
					churchId: churchId,
					label: selectedLabel.label,
					color: selectedLabel.color,
				})
			);
			onClose();
		}
	};

	return (
		<Modal onClose={onClose} className="">
			<div className="sm:w-[300px] bg-white px-4 py-4 border rounded-2xl flex flex-col space-y-4">
				<ul className="text-[#555555] space-y-2">
					{labelsState.map((item) => (
						<li key={item.id} className="cursor-pointer flex justify-between relative">
							<span
								className={`rounded px-2 py-0.5 cursor-pointer ${colorVariants[item.color]}`}
								onClick={() => handleAddLabel(item.id)}>
								{item.label}
							</span>
							<BiPencil
								onClick={(e) => {
									e.stopPropagation(); // Prevent triggering the parent onClick
									setShowEditLabel(item.id);
								}}
							/>
							{showEditLabel === item.id && (
								<EditLabelInput
									onClose={() => setShowEditLabel(null)}
									label={item.label}
									color={item.color}
									setLabel={(newLabel) => handleLabelChange(item.id, newLabel)}
								/>
							)}
						</li>
					))}
				</ul>
				<button
					className="bg-[#F3F3F3] w-32 text-[#7A7A7A] self-center flex justify-center rounded-[14px] py-2"
					onClick={onClose}
					disabled={false}>
					Save
				</button>
			</div>
		</Modal>
	);
};

export default ShowLabels;

const textColorVariants: { [key: string]: string } = {
	grey: "border-gray-500",
	yellow: "border-yellow-500",
	green: "border-green-500",
	red: " border-red-500",
	blue: "border-blue-500",
	orange: "border-orange-500",
	purple: "border-purple-500",
};

const EditLabelInput = ({
	onClose,
	label,
	color,
	setLabel,
}: {
	onClose: () => void;
	label: string;
	color: string;
	setLabel: (value: string) => void;
}) => {
	const ref = useRef<HTMLDivElement>(null);

	const handleClickOutside = (e: MouseEvent) => {
		if (ref.current && !ref.current.contains(e.target as Node)) {
			onClose();
		}
	};

	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	return (
		<div
			ref={ref}
			className="absolute -right-48 p-1 flex justify-start flex-col items-start bg-white border rounded-md shadow-lg">
			<h1 className="text-[#555555] text-sm mb-2 font-medium">Edit Label</h1>
			<input
				type="text"
				className={`border-b p-2 w-40 rounded-t-md ${textColorVariants[color]} focus:outline-none focus:border-b-2 transition-all duration-300 focus:bg-gray-100`}
				value={label}
				onChange={(e) => setLabel(e.target.value)}
			/>
			<button
				onClick={(e) => {
					e.stopPropagation();
					onClose();
				}}
				className="absolute top-0.5 right-0 p-1">
				<FaX />
			</button>
		</div>
	);
};

import { useState } from "react";
import Heading from "../../pages/Overview/Contacts/Heading";
import { BiSend } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store";
import { useChurchIdStore } from "../../stores/churchId";
import { addCommentToContact, selectNoteLoading } from "../../slices/contactSlice";
import { Puff } from "react-loader-spinner";
import { useParams } from "react-router-dom";

const TypeYourComment = () => {
	const [comment, setComment] = useState("");
	const { contact_id } = useParams();
	const safeContactId = contact_id ?? "";
	const churchId = useChurchIdStore((state) => state.churchId);
	const dispatch = useDispatch<AppDispatch>();
	const isPending = useSelector(selectNoteLoading);

	const addComment = (note: string) => {
		dispatch(addCommentToContact({ churchId: churchId, contactId: safeContactId, note: note }));
	};

	return (
		<section>
			<Heading text="Comments" />
			<div className="bg-white w-full flex mb-2 items-stretch">
				<input
					type="text"
					className="flex-grow text-black p-2 outline-none shadow-md"
					style={{ boxShadow: "0px 0px 4px 0px #00000040" }}
					value={comment}
					onChange={(e) => setComment(e.target.value)}
					placeholder="Type your comment here"
					onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
						if (e.key === "Enter") {
							addComment(comment);
							setComment("");
						}
					}}
				/>
				<button
					className=" bg-[#17275B] text-white px-3 flex items-center"
					onClick={(e) => {
						e.preventDefault();
						addComment(comment);
						setComment("");
					}}>
					{!isPending ? <BiSend /> : <Puff height="25" width="18" color="#ffffff" />}
				</button>
			</div>
		</section>
	);
};

export default TypeYourComment;

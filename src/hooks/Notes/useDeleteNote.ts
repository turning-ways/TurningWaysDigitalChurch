import { useMutation } from "@tanstack/react-query";
import axios from "../../axios";
import { notify, success } from "../useAuthData";
import useGetNote from "./useGetNote";
// import { useUserAuth } from "../../stores/user";
import { useChurchIdStore } from "../../stores/churchId";

interface Note {
	memberId: string;
	noteId: string;
}

const useDeleteNote = (memberId: string) => {
	const { refetch } = useGetNote(memberId);
	const { churchId } = useChurchIdStore();

	return useMutation({
		mutationFn: (note: Note) =>
			axios
				.delete<Note>(
					`https://turningways-api-3hcn.onrender.com/api/v1/members/${churchId}/member/${memberId}/note/${note.noteId}`,
					{
						withCredentials: true,
					}
				)
				.then((res) => res.data),
		onSuccess: () => {
			refetch();
			success("Deleted successfully");
		},
		onError: () => notify("Couldn't delete note at this time"),
	});
};

export default useDeleteNote;

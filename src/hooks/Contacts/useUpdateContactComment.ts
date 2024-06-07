import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { success } from "../useUpdatePassword";
import { notify } from "../useLogin";
import { useUserAuth } from "../../stores/user";
import useGetContacts from "./useGetContact";

interface Note {
  note: string;
  noteId: string;
  recordedBy: string;
}

const useUpdateContactComment = () => {
  const { user } = useUserAuth();

  const queryParams = new URLSearchParams(location.search);

  const contactId = queryParams.get("id");

  const { refetch } = useGetContacts();
  return useMutation({
    mutationFn: (note: Note) =>
      axios
        .patch<Note>(
          `https://digital-church.onrender.com/api/v1/churches/${user?.churchId._id}/contact/${contactId}/notes/${note.noteId}`,
          { note: note.note, recordedBy: note.recordedBy },
          {
            withCredentials: true,
          }
        )
        .then((res) => res.data),
    onSuccess: () => {
      success("Note has been updated successfully");
      refetch();
    },
    onError: () => notify("Couldn't update note at this time"),
  });
};
export default useUpdateContactComment;

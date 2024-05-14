import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { success } from "../useUpdatePassword";
import { notify } from "../useLogin";
import useGetNote from "./useGetNote";

interface Note {
  memberId: string;
  noteId: string;
}

const useDeleteNote = (memberId: string) => {
    const {refetch} = useGetNote(memberId);
  return useMutation({ 
    mutationFn: (note: Note) =>
      axios
        .delete<Note>(
          `https://digital-church.onrender.com/api/v1/members/${note.memberId}/notes/${note.noteId}`,
          {
            withCredentials: true,
          }
        )
        .then((res) => res.data),
    onSuccess: () => {
      success("Note has been deleted successfully");
      refetch();
    //   navigate("/admin/dashboard");
    },
    onError: () => notify("Couldn't delete note at this time"),
  });
};

export default useDeleteNote;

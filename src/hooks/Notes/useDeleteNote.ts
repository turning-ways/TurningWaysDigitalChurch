import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { notify, success } from "../useAuthData";
import useGetNote from "./useGetNote";
import { useUserAuth } from "../../stores/user";

interface Note {
  memberId: string;
  noteId: string;
}

const useDeleteNote = (memberId: string) => {
  const { refetch } = useGetNote(memberId);
  const churchId = useUserAuth((auth) => auth?.user?.churchId?._id);

  return useMutation({
    mutationFn: (note: Note) =>
      axios
        .delete<Note>(
          `https://turningways.onrender.com/api/v1/members/${churchId}/member/${note.memberId}/notes/${note.noteId}`,
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

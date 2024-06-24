import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { success, notify } from "../useAuthData";
import useGetNote from "./useGetNote";

interface Query {
  memberId: string;
}

interface Note {
  note: string;
  memberId: string;
  noteId: string;
}

const useUpdateNote = (noteQuery: Query) => {
  const { refetch } = useGetNote(noteQuery.memberId);
  return useMutation({
    mutationFn: (note: Note) =>
      axios
        .patch<Note>(
          `https://turningways.onrender.com/api/v1/members/${note.memberId}/notes/${note.noteId}`,
          { note: note.note },
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

export default useUpdateNote;

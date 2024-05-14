import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { success } from "../useUpdatePassword";
import { notify } from "../useLogin";
import useGetNote from "./useGetNote";

interface Query {
  memberId: string;
  noteId: string;
}

interface Note {
  note: string;
}

const useUpdateNote = (noteQuery: Query) => {
  const { refetch } = useGetNote(noteQuery.memberId);
  return useMutation({
    mutationFn: (note: Note) =>
      axios
        .patch<Note>(
          `https://digital-church.onrender.com/api/v1/members/${noteQuery.memberId}/notes/${noteQuery.noteId}`,
          note,
          {
            withCredentials: true,
          }
        )
        .then((res) => res.data),
    onSuccess: () => {
      success("Note has been added successfully");
      refetch();

      //   navigate("/admin/dashboard");
    },
    onError: () => notify("Couldn't add note at this time"),
  });
};

export default useUpdateNote;

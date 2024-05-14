import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { success } from "../useUpdatePassword";
import { notify } from "../useLogin";
import useGetNote from "./useGetNote";

interface Note {
  note: string;
}

const useAddNote = (memberId: string) => {
    const {refetch} = useGetNote(memberId);
  return useMutation({
    mutationFn: (note: Note) =>
      axios
        .post<Note>(
          `https://digital-church.onrender.com/api/v1/members/${memberId}/notes`,
          note,
          {
            withCredentials: true,
          }
        )
        .then((res) => res.data),
    onSuccess: () => {
      success("Note has been added successfully");
      refetch();

    },
    onError: () => notify("Couldn't add note at this time"),
  });
};

export default useAddNote;

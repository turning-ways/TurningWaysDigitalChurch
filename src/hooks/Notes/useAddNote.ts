import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import useGetNote from "./useGetNote";
import { notify, success } from "../useAuthData";

interface Note {
  note: string;
}

const useAddNote = (memberId: string) => {
  const { refetch } = useGetNote(memberId);
  return useMutation({
    mutationFn: (note: { note: string }) =>
      axios
        .post<Note>(
          `https://turningways.onrender.com/api/v1/members/${memberId}/notes`,
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

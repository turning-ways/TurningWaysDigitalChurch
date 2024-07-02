import { useMutation } from "@tanstack/react-query";
import useGetNote from "./useGetNote";
import { notify, success } from "../useAuthData";
import memberService  from "../../services/member-service";
import { useUserAuth } from "../../stores/user";

interface Note {
  note: string;
}

const useAddNote = (memberId: string, reset: () => void) => {
  const { refetch } = useGetNote(memberId);
  const churchId = useUserAuth((auth) => auth?.user?.churchId?._id);
  return useMutation({
    mutationFn: (note: { note: string }) => memberService<Note>(memberId, churchId, "/notes").post(note),
    onSuccess: () => {
      success("Note has been added successfully");
      refetch();
      reset();
    },
    onError: () => notify("Couldn't add note at this time"),
  });
};

export default useAddNote;

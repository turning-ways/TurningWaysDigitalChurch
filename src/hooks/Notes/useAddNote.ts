import { useMutation } from "@tanstack/react-query";
import useGetNote from "./useGetNote";
import { notify, success } from "../useAuthData";
import memberService from "../../services/member-service";
// import { useUserAuth } from "../../stores/user";
import { useChurchIdStore } from "../../stores/churchId";

interface Note {
  note: string;
  createdBy: string;
}

const useAddNote = (memberId: string, reset: () => void) => {
  const { refetch } = useGetNote(memberId);
  const { churchId } = useChurchIdStore();
  return useMutation({
    mutationFn: (note: { note: string; createdBy: string }) =>
      memberService<Note>(memberId, churchId, "/note").post(note),
    onSuccess: () => {
      success("Note has been added successfully");
      reset();
      refetch();
    },
    onError: () => notify("Couldn't add note at this time"),
  });
};

export default useAddNote;

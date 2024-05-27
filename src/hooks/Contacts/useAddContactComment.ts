import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { success } from "../useUpdatePassword";
import { notify } from "../useLogin";
import { useUserAuth } from "../../stores/user";
import useGetContacts from "./useGetContact";

interface Comment {
  note: string;
  recordedBy: string;
}

const useAddContactComment = () => {
  const {user} = useUserAuth();

  const queryParams = new URLSearchParams(location.search);

  const contactId = queryParams.get("id");

  const {refetch} = useGetContacts();

  return useMutation({
    mutationFn: (comment: Comment) =>
      axios
        .patch<Comment>(
          `https://digital-church.onrender.com/api/v1/churches/${user?.churchId._id}/contact/${contactId}/notes`,
          comment,
          {
            withCredentials: true,
          }
        )
        .then((res) => res.data),
    onSuccess: () => {
      success("Comment has been added successfully");
      refetch();
    },
    onError: () => notify("Couldn't add comment at this time"),
  });
};

export default useAddContactComment;

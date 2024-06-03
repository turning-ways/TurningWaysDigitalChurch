import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { notify } from "../useLogin";
import useGetContacts from "./useGetContact";

interface Comment {
  memberId: string;
  commentId: string;
  contactId: string;
  churchId: string;
}

const useDeleteContactComment = () => {
  const { refetch } = useGetContacts();
  return useMutation({
    mutationFn: (comment: Comment) =>
      axios
        .delete<Comment>(
          `https://digital-church.onrender.com/api/v1/churches/${comment.churchId}/contact/${comment.contactId}/notes/${comment.commentId}?mid=${comment.memberId}`,
          {
            withCredentials: true,
          }
        )
        .then((res) => res.data),
    onSuccess: () => {
      refetch();
      //   navigate("/admin/dashboard");
    },
    onError: () => notify("Couldn't delete note at this time"),
  });
};

export default useDeleteContactComment;

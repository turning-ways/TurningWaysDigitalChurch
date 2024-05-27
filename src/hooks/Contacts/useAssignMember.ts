import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { success } from "../useUpdatePassword";
import { notify } from "../useLogin";
import { useUserAuth } from "../../stores/user";
import useGetContacts from "./useGetContact";

const useAssignMember = () => {
  const {user} = useUserAuth();

  const queryParams = new URLSearchParams(location.search);

  const contactId = queryParams.get("id");

  const {refetch} = useGetContacts();

  return useMutation({
    mutationFn: (memberId: string) =>
      axios
        .patch<Comment>(
          `https://digital-church.onrender.com/api/v1/churches/${user?.churchId._id}/contact/${contactId}/assign?aid=${memberId}`,
          {},
          {
            withCredentials: true,
          }
        )
        .then((res) => res.data),
    onSuccess: () => {
      success("Member has been assigned successfully");
      refetch();
    },
    onError: () => notify("Member couldn't be assigned at this moment"),
  });
};

export default useAssignMember;

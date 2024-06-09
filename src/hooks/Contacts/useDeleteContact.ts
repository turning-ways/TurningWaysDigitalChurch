import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { success } from "../useUpdatePassword";
import { notify } from "../useLogin";
import { useUserAuth } from "../../stores/user";
import useGetContacts from "./useGetContact";

const useDeleteContact = () => {
  const { user } = useUserAuth();

  const {refetch} = useGetContacts();


  return useMutation({ 
    mutationFn: (contact_id: string) =>
      axios
        .delete(
          `https://digital-church.onrender.com/api/v1/churches/${user?.churchId._id}/contact/${contact_id}`,
          {
            withCredentials: true
          }
        )
        .then((res) => res.data),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onSuccess: () => {
      success("Contact has been deleted successfully");
      refetch();
    },
    onError: () => {
      notify("Couldn't delete contact at this moment");
    },
  });
};

export default useDeleteContact;

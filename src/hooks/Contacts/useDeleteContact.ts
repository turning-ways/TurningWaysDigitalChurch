import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { success } from "../useUpdatePassword";
import { notify } from "../useLogin";
import { useUserAuth } from "../../stores/user";
import useGetContacts from "./useGetContact";

const useDeleteContact = () => {
  const { user } = useUserAuth();

  const queryParams = new URLSearchParams(location.search);

  const contactId = queryParams.get("id");

  const {refetch} = useGetContacts();


  return useMutation({ 
    mutationFn: (label_name: string) =>
      axios
        .delete(
          `https://digital-church.onrender.com/api/v1/churches/${user?.churchId._id}/contact/${contactId}/label?label=${label_name}`,
          {
            withCredentials: true
          }
        )
        .then((res) => res.data),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onSuccess: () => {
      success("Label has been deleted successfully");
      refetch();
    },
    onError: () => {
      notify("Couldn't delete label at this moment");
    },
  });
};

export default useDeleteContact;

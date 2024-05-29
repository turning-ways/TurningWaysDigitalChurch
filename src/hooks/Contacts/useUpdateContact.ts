import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { success } from "../useUpdatePassword";
import { notify } from "../useLogin";
import { useUserAuth } from "../../stores/user";
import useGetContacts from "./useGetContact";

interface Contact {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  address?: string;
  maturity?: string;
  createdBy?: string;
  email?:string;
}

interface ContactProps {
  onClose?: () => void;
}

const useUpdateContact = ({onClose}: ContactProps) => {
  const { user } = useUserAuth();
  const queryParams = new URLSearchParams(location.search);

  const contactId = queryParams.get("id");

  const { refetch } = useGetContacts();

  return useMutation({
    mutationFn: (contact: Contact) =>
      axios
        .patch(
          `https://digital-church.onrender.com/api/v1/churches/${user?.churchId._id}/contact/${contactId}`,
          contact,
          {
            withCredentials: true,
          }
        )
        .then((res) => res.data),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onSuccess: () => {
      success("Contact has been updated successfully");
      refetch();
      onClose && onClose();
    },
    onError: () => {
      notify("Couldn't update contact at this moment");
    },
  });
};

export default useUpdateContact;

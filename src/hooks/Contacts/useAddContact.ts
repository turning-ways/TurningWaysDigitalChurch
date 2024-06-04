import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { success } from "../useUpdatePassword";
import { notify } from "../useLogin";
import { useUserAuth } from "../../stores/user";
import useGetAllContacts from "./useGetAllContacts";

interface Contact {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address?: string;
  maturity: string;
  createdBy: string;
  email?: string;
}

interface Error {
  response: {
    data: {
      stack: string;
    }
  }
}

interface ContactPros {
  onClose: () => void;
}

const useAddContact = ({ onClose }: ContactPros) => {
  const { user } = useUserAuth();
  const { refetch } = useGetAllContacts();

  return useMutation({
    mutationFn: (contact: Contact) =>
      axios
        .post(
          `https://digital-church.onrender.com/api/v1/churches/${user?.churchId._id}/contact`,
          contact,
          {
            withCredentials: true,
          }
        )
        .then((res) => res.data),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onSuccess: () => {
      success("Contact has been created successfully");
      refetch();
      onClose();
    },
    onError: (err: Error) => {
      if (err.response.data.stack.includes("duplicate")) {
        notify("Contact already exists");
      } else {
        notify("Fill in all compulsory fields");
        console.log(err)
      }
    },
  });
};

export default useAddContact;

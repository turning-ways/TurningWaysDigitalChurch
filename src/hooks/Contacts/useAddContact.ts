import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { success } from "../useUpdatePassword";
import { notify } from "../useLogin";
import { useUserAuth } from "../../stores/user";

interface Contact {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address: string;
  maturity: string;
  createdBy: string;
  email: string;
}

const useAddContact = () => {
  const { user } = useUserAuth();

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
    },
    onError: () => {
      notify("Couldn't create contact at this moment");
    },
  });
};

export default useAddContact;

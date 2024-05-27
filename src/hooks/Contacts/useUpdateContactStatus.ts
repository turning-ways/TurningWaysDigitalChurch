import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { success } from "../useUpdatePassword";
import { notify } from "../useLogin";
import { useUserAuth } from "../../stores/user";

interface Contact {
  status?: string;
  membershipStatus?: string;
  modifiedBy?: string;
}

const useUpdateContactStatus = () => {
  const { user } = useUserAuth();
  const queryParams = new URLSearchParams(location.search);

  const contactId = queryParams.get("id");

  return useMutation({
    mutationFn: (contact: Contact) =>
      axios
        .patch(
          `https://digital-church.onrender.com/api/v1/churches/${user?.churchId._id}/contact/${contactId}/status`,
          contact,
          {
            withCredentials: true,
          }
        )
        .then((res) => res.data),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onSuccess: () => {
      success("Contact has been updated successfully");
    },
    onError: () => {
      notify("Couldn't update contact at this moment");
    },
  });
};

export default useUpdateContactStatus;

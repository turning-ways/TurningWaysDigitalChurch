import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { success } from "../useUpdatePassword";
import { notify } from "../useLogin";
import { useUserAuth } from "../../stores/user";
import useGetContacts from "./useGetContact";

interface Action {
  action: string;
  checked: boolean;
}

const useAddActionItem = () => {
  const { user } = useUserAuth();
  const { refetch } = useGetContacts();

  const queryParams = new URLSearchParams(location.search);

  const contactId = queryParams.get("id");

  return useMutation({
    mutationFn: (contact: Action) =>
      axios
        .post(
          `https://digital-church.onrender.com/api/v1/churches/${user?.churchId._id}/contact/${contactId}/action`,
          contact,
          {
            withCredentials: true,
          }
        )
        .then((res) => res.data),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onSuccess: () => {
      success("Action has been added successfully");
      refetch();
    },
    onError: () => {
      notify("Couldn't add action at this moment");
    },
  });
};

export default useAddActionItem;

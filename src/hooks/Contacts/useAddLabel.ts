import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { success } from "../useUpdatePassword";
import { notify } from "../useLogin";
import { useUserAuth } from "../../stores/user";
import useGetContacts from "./useGetContact";

interface Label {
  label: string;
  labelType: string;
}

const useAddLabel = () => {
  const { user } = useUserAuth();

  const queryParams = new URLSearchParams(location.search);

  const contactId = queryParams.get("id");

  const { refetch } = useGetContacts();

  return useMutation({
    mutationFn: (labels: Label) =>
      axios
        .patch(
          `https://digital-church.onrender.com/api/v1/churches/${user?.churchId._id}/contact/${contactId}/label`,
          labels,
          {
            withCredentials: true,
          }
        )
        .then((res) => res.data),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onSuccess: () => {
      success("Label has been added successfully");
      refetch();
    },
    onError: () => {
      notify("Couldn't add label at this moment");
    },
  });
};

export default useAddLabel;

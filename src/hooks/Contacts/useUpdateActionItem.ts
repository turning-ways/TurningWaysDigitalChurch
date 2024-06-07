import { useMutation } from "@tanstack/react-query";
import axios from "axios";
// import { success } from "../useUpdatePassword";
// import { notify } from "../useLogin";
import { useUserAuth } from "../../stores/user";
// import useGetContacts from "./useGetContact";

interface Action {
    checked: boolean;
    _id: string;
}

const useUpdateActionItem = () => {
  const { user } = useUserAuth();

  const queryParams = new URLSearchParams(location.search);

  const contactId = queryParams.get("id");

//   const { refetch } = useGetContacts();
  return useMutation({
    mutationFn: (action: Action) =>
      axios
        .patch<Action>(
          `https://digital-church.onrender.com/api/v1/churches/${user?.churchId._id}/contact/${contactId}/action?action=${action._id}&checked=${action.checked}`,{},
          {
            withCredentials: true,
          }
        )
        .then((res) => res.data),
    // onSuccess: () => {
    //   success("Note has been updated successfully");
    //   refetch();
    // },
    // onError: () => notify("Couldn't update note at this time"),
  });
};
export default useUpdateActionItem;

import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { success } from "../useUpdatePassword";
import { notify } from "../useLogin";
import { useNavigate } from "react-router-dom";

const useDeleteMember = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (memberId: string) =>
      axios
        .delete(
          `https://digital-church.onrender.com/api/v1/members/${memberId}`,
          { withCredentials: true }
        )
        .then((res) => res.data),
    onSuccess: () => {
      success("Member has been deleted successfully");
      navigate("/admin/directory");
    },
    onError: () => notify("Couldn't delete member"),
  });
};

export default useDeleteMember;

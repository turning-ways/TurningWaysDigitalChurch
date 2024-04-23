import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { success } from "../useUpdatePassword";
import { notify } from "../useLogin";
import useAddMember from "../AddMember/useAddMember";
import { useMemberStore } from "../../stores/member";
import { useNavigate } from "react-router-dom";


interface Church {
  name: string;
  phone: string;

  postalCode: string;
  country: string;
  state: string;
  city: string;
  address: string;
}

const useAddChurch = () => {
  const { mutate } = useAddMember();
  const { role, howDidYouHear, phoneNumber } = useMemberStore();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (churchDetails: Church) =>
      axios
        .post<Church>(
          "https://digital-church.onrender.com/api/v1/churches/",
          churchDetails,
          {
            withCredentials: true,
          }
        )
        .then((res) => res.data),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onSuccess: (res: any) => {
      success("Church has been added successfully");

      console.log(res.data.church.id);

      mutate({
        role,
        howDidYouHear,
        phone: phoneNumber,
        churchId: res.data.church.id,
      });

      navigate('/')
    },
    onError: () => {
      notify("Couldn't add church");
     
    },
  });
};

export default useAddChurch;

import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { success } from "../useUpdatePassword";
import { notify } from "../useLogin";
import { useNavigate } from "react-router-dom";
import { usePersonalInformationStore } from "../../stores/Add Member/personalinformation";
import { useContactInformationStore } from "../../stores/Add Member/contactInformation";
import { useChurchInformationSore } from "../../stores/Add Member/churchInformation";

interface Member {
  first_name: string;
  middle_name: string;
  suffix: string;
  email: string;
  last_name: string;
  churchId: string;
  gender?: string;
  phone: {
    MainPhone: string;
    workPhone?: string;
    otherPhone?: string[];
  };
  address: {
    HomeAddress: string;
    workAddress?: string;
  };
  title?: string;
  dateOfBirth?: string;
  MarriageStatus?: string;
  anniversary?: string;
  memberStatus: string;
  workType: string;
  ServiceUnit: string;
}



const useAddRegularMember = () => {
  const {
    setFirstName,
    setLastName,
    setMiddleName,
    setSuffix,
    setGender,
    setPrefix,
    setDateOfBirth,
    setAnniversary,
  } = usePersonalInformationStore();
  const { setContactEmail } = useContactInformationStore();
  const { setContactAddress, setContactPhone } = useContactInformationStore();
  const {setAccessPermission, setMemberStatus, setServiceUnit, setWorkType} = useChurchInformationSore();
  const navigate = useNavigate();
  const resetForm = () => {
    setFirstName("");
    setLastName("");
    setMiddleName("");
    setSuffix("");
    setGender("");
    setPrefix("");
    setDateOfBirth("");
    setAnniversary("");
    setContactEmail("");
    setContactAddress("");
    setContactPhone("");
    setAccessPermission("");
    setMemberStatus("");
    setServiceUnit("");
    setWorkType("");
  };

  return useMutation({
    mutationFn: (memberDetails: Member) =>
      axios
        .post<Member>(
          "https://digital-church.onrender.com/api/v1/members/member",
          memberDetails,
          {
            withCredentials: true,
          }
        )
        .then((res) => res.data),
    onSuccess: () => {
      success("Member has been added successfully");
      navigate("/admin/dashboard");
      resetForm();
    },
    onError: () => notify("Couldn't add member"),
  });
};

export default useAddRegularMember;

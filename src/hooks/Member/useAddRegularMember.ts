import { useMutation } from "@tanstack/react-query";
import { success, notify } from "../useAuthData";
import { useNavigate } from "react-router-dom";
import { usePersonalInformationStore } from "../../stores/Add Member/personalinformation";
import { useContactInformationStore } from "../../stores/Add Member/contactInformation";
import { useChurchInformationSore } from "../../stores/Add Member/churchInformation";
import ApiClient from "../../services/api-client";
import { useUserAuth } from "../../stores/user";

interface Member {
  first_name: string;
  middle_name?: string;
  suffix?: string;
  email?: string;
  last_name: string;
  churchId: string;
  gender: string;
  phone: {
    MainPhone: string;
    workPhone?: string;
    otherPhone?: string[];
  };
  address?: {
    HomeAddress?: string;
    workAddress?: string;
  };
  title?: string;
  dateOfBirth: string;
  MarriageStatus?: string;
  anniversary?: string;
  memberStatus: string;
  workType: string;
  ServiceUnit: string;
  prefix?: string;
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
  const { setAccessPermission, setMemberStatus, setServiceUnit, setWorkType } =
    useChurchInformationSore();
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

  const churchId = useUserAuth((auth) => auth?.user?.churchId?._id);

  const apiClient = new ApiClient("/api/v1/members/" + churchId + "/add");

  return useMutation({
    mutationFn: (memberDetails: Member) => apiClient.post(memberDetails),
    onSuccess: () => {
      success("Member has been added successfully");
      navigate("/admin/directory");
      resetForm();
    },
    onError: () => notify("Couldn't add member"),
  });
};

export default useAddRegularMember;

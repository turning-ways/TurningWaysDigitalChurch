import { Outlet } from "react-router-dom";
import Header from "../../Header";
import OverviewContainer from "../../OverviewContainer";
import InformationHeader from "../InformationHeader";
import SubHeader from "./SubHeader";
import ProfileEditButton from "../../../../components/Button/ProfileEditButton";
import useAddRegularMember from "../../../../hooks/Member/useAddRegularMember";
import { usePersonalInformationStore } from "../../../../stores/Add Member/personalinformation";
import { useContactInformationStore } from "../../../../stores/Add Member/contactInformation";
import { useChurchInformationSore } from "../../../../stores/Add Member/churchInformation";
import { notify } from "../../../../hooks/useLogin";
import { useUserAuth } from "../../../../stores/user";

const ProfileEdit = () => {
  const routes = {
    personalInfo: "/admin/directory/add-member/personal-information",
    contactInfo: "/admin/directory/add-member/contact-information",
    churchInfo: "/admin/directory/add-member/church-information",
  };

  const { mutate } = useAddRegularMember();
  const {
    first_name,
    last_name,
    middle_name,
    suffix,
    gender,
    dateOfBirth,
    anniversary,
  } = usePersonalInformationStore();
  const { contact_email } = useContactInformationStore();
  const { contact_address, contact_phone } = useContactInformationStore();
  const {access_permission, member_status, service_unit, work_type} = useChurchInformationSore();

  const {user} = useUserAuth();
  const handleAddingMember = () => {
    if (
      first_name &&
      last_name &&
      middle_name &&
      contact_email &&
      contact_phone !== "" &&
      dateOfBirth !== ""
    ) {
      mutate({
        first_name,
        last_name,
        middle_name,
        email: contact_email,
        suffix,
        address: { HomeAddress: contact_address },
        phone: { MainPhone: contact_phone },
        churchId: user ? user?.churchId?._id : "",
        gender,
        dateOfBirth,
        anniversary,
        accessPermission: access_permission,
        memberStatus: member_status,
        ServiceUnit: service_unit,
        workType: work_type,
      });
    } else notify("Please fill in all required fields");
    console.log(first_name, last_name, middle_name, suffix, gender);
  };
  return (
    <OverviewContainer active="Directory">
      <Header text="Membership" />
      <SubHeader btnText="Add Profile" />
      <InformationHeader route={routes} />
      <Outlet />
      <ProfileEditButton text="SAVE" onPress={handleAddingMember}  />
    </OverviewContainer>
  );
};

export default ProfileEdit;

import Header from "../../Header";
import SubHeader from "./SubHeader";
import { Outlet } from "react-router-dom";
import OverviewContainer from "../../OverviewContainer";
import ProfileEditButton from "../../../../components/Button/ProfileEditButton";
import useUpdateMember from "../../../../hooks/Member/useUpdateMember";
import { useEditPersonalInformationStore } from "../../../../stores/Edit Member/personalinfo";
import { useEditContactInformationStore } from "../../../../stores/Edit Member/contactinfo";
import { useChurchIdStore } from "../../../../stores/churchId";
import AddUpdateInfoHeader from "../AddUpdateInfoHeader";

const UpdateProfile = () => {
  const queryParams = new URLSearchParams(location.search);

  const memberId = queryParams.get("id");

  const routes = {
    personalInfo: `/admin/directory/update-member/personal-information?id=${memberId}`,

    contactInfo: `/admin/directory/update-member/contact-information?id=${memberId}`,

    churchInfo: `/admin/directory/update-member/church-information?id=${memberId}`,
  };

  const { mutate } = useUpdateMember(memberId ? memberId : "");
  const { first_name, last_name, middle_name, suffix, gender } =
    useEditPersonalInformationStore();
  const { contact_address, contact_phone, contact_email } =
    useEditContactInformationStore();
  // const {access_permission, member_status, service_unit, work_type} = useChurchInformationSore();
  const { churchId } = useChurchIdStore();

  const handleAddingMember = () => {
    mutate({
      first_name,
      last_name,
      middle_name,
      email: contact_email,
      suffix,
      address: { HomeAddress: contact_address },
      phone: { MainPhone: contact_phone },
      churchId: churchId ? churchId : "",
      gender,
    });
    console.log(first_name, last_name, middle_name, suffix, gender);
  };

  return (
    <OverviewContainer active="Directory">
      <Header text="Directory Profile" />
      <SubHeader />
      <AddUpdateInfoHeader route={routes} />

      <Outlet />

      <ProfileEditButton text={"Update Profile"} onPress={handleAddingMember} />
    </OverviewContainer>
  );
};

export default UpdateProfile;

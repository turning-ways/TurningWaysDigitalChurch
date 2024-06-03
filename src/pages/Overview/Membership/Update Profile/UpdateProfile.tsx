import Header from "../../Header";
import SubHeader from "./SubHeader";
import { Outlet } from "react-router-dom";

// import ProfileEditButton from "../../../../components/Button/ProfileEditButton";

import AddUpdateInfoHeader from "../AddUpdateInfoHeader";
import { useEffect } from "react";
import { useEditPersonalInformationStore } from "../../../../stores/Edit Member/personalinfo";
import useGetMemberDetails from "../../../../hooks/Member/useGetMemberDetails";
import OverviewContainer from "../../OverviewContainer";
import { useEditContactInformationStore } from "../../../../stores/Edit Member/contactinfo";
import { useEditChurchInformationStore } from "../../../../stores/Edit Member/churchinfo";

const UpdateProfile = () => {
  const queryParams = new URLSearchParams(location.search);

  const { data } = useGetMemberDetails();

  const memberId = queryParams.get("id");
  const routes = {
    personalInfo: `/admin/directory/update-member/personal-information?id=${memberId}`,

    contactInfo: `/admin/directory/update-member/contact-information?id=${memberId}`,

    churchInfo: `/admin/directory/update-member/church-information?id=${memberId}`,
  };
  const {
    setPrefix,
    setFirstName,
    setMiddleName,
    setLastName,
    setSuffix,
    setGender,
    setDateOfBirth,
  } = useEditPersonalInformationStore();
  const {
    setContactEmail,
    setContactAddress,
    setContactPhone,
  } = useEditContactInformationStore();
  const {
    setMemberStatus,
    setWorkType,
    setServiceUnit,
  } = useEditChurchInformationStore();
  useEffect(() => {
    setFirstName(data ? data?.member?.first_name : "");
    setMiddleName(data ? data?.member?.middle_name : "");
    setLastName(data ? data?.member?.last_name : "");
    setSuffix(data ? data?.member?.suffix : "");
    setPrefix(data ? data?.member?.prefix : "");
    setDateOfBirth(data ? data?.member?.dateOfBirth : "");
    setGender(data?.member?.gender ?? "");
    setContactEmail(data ? data?.member?.email : "");
    setContactAddress(data ? data?.member?.address?.HomeAddress : "");
    setContactPhone(data ? data?.member?.phone?.MainPhone : "");
    setMemberStatus(data ? data.member.memberStatus : "");
    setWorkType(data ? data.member.workerType : "");
    setServiceUnit(data ? data.member.ServiceUnit : "");
  }, []);
  return (
    <OverviewContainer active="Directory">
      <Header text="Update Profile" />
      <SubHeader />
      <AddUpdateInfoHeader route={routes} />

      <Outlet />

      {/* <ProfileEditButton text={"Update Profile"} onPress={handleAddingMember} /> */}
    </OverviewContainer>
  );
};

export default UpdateProfile;

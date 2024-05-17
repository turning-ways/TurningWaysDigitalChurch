import { Outlet } from "react-router-dom";
import Header from "../../Header";
import OverviewContainer from "../../OverviewContainer";
import SubHeader from "./SubHeader";
// import ProfileEditButton from "../../../../components/Button/ProfileEditButton";

import AddUpdateInfoHeader from "../AddUpdateInfoHeader";

const ProfileEdit = () => {
  const routes = {
    personalInfo: "/admin/directory/add-member/personal-information",
    contactInfo: "/admin/directory/add-member/contact-information",
    churchInfo: "/admin/directory/add-member/church-information",
  };

  return (
    <OverviewContainer active="Directory">
      <Header text="Add Profile" />
      <SubHeader />
      <AddUpdateInfoHeader route={routes} />
      <Outlet />
      {/* <ProfileEditButton text="Save" onPress={handleAddingMember} /> */}
    </OverviewContainer>
  );
};

export default ProfileEdit;

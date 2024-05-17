import Header from "../../Header";
import SubHeader from "./SubHeader";
import { Outlet } from "react-router-dom";
import OverviewContainer from "../../OverviewContainer";
// import ProfileEditButton from "../../../../components/Button/ProfileEditButton";

import AddUpdateInfoHeader from "../AddUpdateInfoHeader";

const UpdateProfile = () => {
  const queryParams = new URLSearchParams(location.search);

  const memberId = queryParams.get("id");
  const routes = {
    personalInfo: `/admin/directory/update-member/personal-information?id=${memberId}`,

    contactInfo: `/admin/directory/update-member/contact-information?id=${memberId}`,

    churchInfo: `/admin/directory/update-member/church-information?id=${memberId}`,
  };

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

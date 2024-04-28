import Header from "../../Header";
import SubHeader from "./SubHeader";
import { Outlet } from "react-router-dom";
import AddMember from "../../AddMemberBtn";
import InformationHeader from "../InformationHeader";
import OverviewContainer from "../../OverviewContainer";

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
      <Header text="MemberShip" />
      <SubHeader btnText="Update Profile" />
      <InformationHeader route={routes} />

      <Outlet />

      <AddMember />
    </OverviewContainer>
  );
};

export default UpdateProfile;

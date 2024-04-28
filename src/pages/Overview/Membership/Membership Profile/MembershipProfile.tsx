import Header from "../../Header";
import SubHeader from "../../SubHeader";
import { Outlet } from "react-router-dom";
import AddMember from "../../AddMemberBtn";
import InformationHeader from "../InformationHeader";
import OverviewContainer from "../../OverviewContainer";

const MembershipProfile = () => {
  const queryParams = new URLSearchParams(location.search);

  const memberId = queryParams.get("id");

  const routes = {
    personalInfo: `/admin/directory/member/personal-information?id=${memberId}`,

    contactInfo: `/admin/directory/member/contact-information?id=${memberId}`,

    churchInfo: `/admin/directory/member/church-information?id=${memberId}`,
  };

  return (
    <OverviewContainer active="Directory">
      <Header text="MemberShip" />
      <SubHeader />
      <InformationHeader route={routes} />

      <Outlet />

      <AddMember />
    </OverviewContainer>
  );
};

export default MembershipProfile;

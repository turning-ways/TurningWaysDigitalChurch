import Header from "../../Header";
import SubHeader from "../../SubHeader";
import { Outlet } from "react-router-dom";
import AddMember from "../../AddMemberBtn";
import InformationHeader from "../InformationHeader";
import OverviewContainer from "../../OverviewContainer";

const MembershipProfile = () => {
  const routes = {
    personalInfo: "/overview/membership/personal-information",

    contactInfo: "/overview/membership/contact-information",

    churchInfo: "/overview/membership/church-information",
  };

  return (
    <OverviewContainer active="Membership">
      <Header text="MemberShip" />
      <SubHeader />
      <InformationHeader route={routes} />

      <Outlet />

      <AddMember />
    </OverviewContainer>
  );
};

export default MembershipProfile;

import { Outlet } from "react-router-dom";
import Header from "../../Header";
import OverviewContainer from "../../OverviewContainer";
import InformationHeader from "../InformationHeader";
import SubHeader from "./SubHeader";

const ProfileEdit = () => {
  const routes = {
    personalInfo: "/overview/membership/profile-edit/personal-info",
    contactInfo: "/overview/membership/profile-edit/contact-info",
    churchInfo: "/overview/membership/profile-edit/church-info",
  };
  return (
    <OverviewContainer active="Membership">
      <Header text="Membership" />
      <SubHeader />
      <InformationHeader route={routes} />
      <Outlet />
    </OverviewContainer>
  );
};

export default ProfileEdit;

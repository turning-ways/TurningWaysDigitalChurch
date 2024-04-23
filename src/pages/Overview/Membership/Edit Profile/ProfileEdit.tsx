import { Outlet } from "react-router-dom";
import Header from "../../Header";
import OverviewContainer from "../../OverviewContainer";
import InformationHeader from "../InformationHeader";
import SubHeader from "./SubHeader";

const ProfileEdit = () => {
  const routes = {
    personalInfo: "/overview/membership/profile-edit/personal-information",
    contactInfo: "/overview/membership/profile-edit/contact-information",
    churchInfo: "/overview/membership/profile-edit/church-information",
  };
  return (
    <OverviewContainer active="Directory">
      <Header text="Membership" />
      <SubHeader btnText="Add Profile" />
      <InformationHeader route={routes} />
      <Outlet />
    </OverviewContainer>
  );
};

export default ProfileEdit;

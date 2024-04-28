import { Outlet } from "react-router-dom";
import Header from "../../Header";
import OverviewContainer from "../../OverviewContainer";
import InformationHeader from "../InformationHeader";
import SubHeader from "./SubHeader";

const ProfileEdit = () => {
  const routes = {
    personalInfo: "/admin/directory/add-member/personal-information",
    contactInfo: "/admin/directory/add-member/contact-information",
    churchInfo: "/admin/directory/add-member/church-information",
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

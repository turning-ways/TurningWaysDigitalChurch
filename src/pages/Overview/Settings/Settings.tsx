import { useLocation } from "react-router-dom";
import AccountSettings from "../../../components/Settings/AccountSettings";
import ChurchProfile from "../../../components/Settings/ChurchProfile";
// import ChurchProfileEdit from "../../../components/Settings/ChurchProfileEdit";
import OrganizationMember from "../../../components/Settings/OrganizationMember";
import RolesAndPermission from "../../../components/Settings/RolesAndPermission";
import SettingsBar from "../../../components/Settings/SettingsBar";
import Header from "../Header";
import OverviewContainer from "../OverviewContainer";

const Settings = () => {
  const location = useLocation();
  return (
    <OverviewContainer active="Settings">
      <Header text="Settings" />
      <SettingsBar />
      {location.pathname === "/admin/setting/account" && <AccountSettings />}
      {location.pathname === "/admin/setting/church-profile" && (
        <ChurchProfile />
      )}
      {location.pathname === "/admin/setting/organization-member" && (
        <OrganizationMember />
      )}
      {location.pathname === "/admin/setting/roles-and-permission" && (
        <RolesAndPermission />
      )}

      {/* <ChurchProfileEdit /> */}
    </OverviewContainer>
  );
};

export default Settings;

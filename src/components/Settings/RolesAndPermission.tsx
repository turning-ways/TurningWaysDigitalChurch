import AddProfile from "./AddProfile";
import FilterAndExportData from "./FilterAndExportData";
import MemberDetails from "./MemberDetails";

const RolesAndPermission = () => {
  return (
    <main>
      <FilterAndExportData />
      <AddProfile />
      <MemberDetails />
    </main>
  );
};

export default RolesAndPermission;

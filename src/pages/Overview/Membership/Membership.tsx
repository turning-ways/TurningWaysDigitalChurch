import Header from "../Header";
import OverviewContainer from "../OverviewContainer";
// import AllMembers from "./AllMembers";
import Members from "./AllMembers/allMembers";
// import QuickActions from "../../../ui/Actions/QuickActions";

const Membership = () => {
  return (
    <OverviewContainer active="Directory">
      <Header text="Directory" />
      {/* component */}
      {/* <QuickActions /> */}
      {/* componentClosed */}

      {/* <AllMembers /> */}
      <Members />
    </OverviewContainer>
  );
};

export default Membership;

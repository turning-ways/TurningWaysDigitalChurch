import Header from "../../Header";
import SubHeader from "../../SubHeader";
import { Outlet } from "react-router-dom";
import AddMember from "../../AddMemberBtn";
import InformationHeader from "../InformationHeader";
import OverviewContainer from "../../OverviewContainer";
import useGetMemberDetails from "../../../../hooks/Member/useGetMemberDetails";
import { ThreeDots } from "react-loader-spinner";
import { useState } from "react";
import Notes from "./Notes";

const MembershipProfile = () => {
  const queryParams = new URLSearchParams(location.search);

  const memberId = queryParams.get("id");

  const routes = {
    personalInfo: `/admin/directory/member/personal-information?id=${memberId}`,

    contactInfo: `/admin/directory/member/contact-information?id=${memberId}`,

    churchInfo: `/admin/directory/member/church-information?id=${memberId}`,

    membershipHistory: `/admin/directory/member/membership-history?id=${memberId}`,
  };

  const { isPending } = useGetMemberDetails();

  const [openNote, setOpenNote] = useState<boolean>(false);

  return (
    <OverviewContainer active="Directory">
      {!isPending ? (
        <>
          <Header text="Profile Information" />
          <SubHeader onNoteClick={() => setOpenNote(!openNote)} />
          <InformationHeader route={routes} />
          <Outlet />

          <AddMember />

          <Notes openNote={openNote} onClose={() => setOpenNote(false)} />
        </>
      ) : (
        <div>
          <ThreeDots height="25" width="50" color="#000" />
        </div>
      )}
    </OverviewContainer>
  );
};

export default MembershipProfile;

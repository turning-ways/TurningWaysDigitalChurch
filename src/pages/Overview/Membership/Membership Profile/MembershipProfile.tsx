import Header from "../../Header";
import SubHeader from "../../SubHeader";
import { Outlet } from "react-router-dom";
// import AddMember from "../../AddMemberBtn";
import InformationHeader from "../InformationHeader";
import OverviewContainer from "../../OverviewContainer";
import useGetMemberDetails from "../../../../hooks/Member/useGetMemberDetails";
import { ThreeDots } from "react-loader-spinner";
import { useEffect, useRef, useState } from "react";
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

  const notesRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        notesRef.current &&
        !notesRef.current.contains(event.target as Node)
      ) {
        // Click occurred outside the Notes component
        // Close the Notes component
        setOpenNote(false);
        console.log(!notesRef.current.contains(event.target as Node));
      }
    };

    // Attach the event listener when the component mounts
    document.addEventListener("mousedown", handleClickOutside);

    // Detach the event listener when the component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []); // Empty dependency array ensures this effect runs only once when the component mounts

  return (
    <OverviewContainer active="Directory">
      {!isPending ? (
        <>
          <Header text="Profile" />
          <SubHeader onNoteClick={() => setOpenNote(true)} />
          <InformationHeader route={routes} />
          <Outlet />

          {/* <AddMember /> */}
          <div ref={notesRef}>
            <Notes openNote={openNote} onClose={() => setOpenNote(false)} />
          </div>
          {/* <Notes openNote={openNote} onClose={() => setOpenNote(false)} /> */}
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

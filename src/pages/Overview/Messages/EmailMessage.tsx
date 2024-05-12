/* eslint-disable @typescript-eslint/no-explicit-any */
import { IoIosArrowBack } from "react-icons/io";
import Header from "../Header";
import OverviewContainer from "../OverviewContainer";
import { useState } from "react";
import Subject from "./Subject";
// import Body from "./Body";
import AddRecipientsModal from "./AddRecipientsModal";
import Recipients from "./Recipients";

const EmailMessage = () => {
  const [open, setOpen] = useState(false);
  return (
    <OverviewContainer active="Directory">
      <div className="space-y-5">
        <Header text="Bulk Email Messages" />
        <div className="bg-[#F1F0F3] rounded-lg p-2 w-fit cursor-pointer h-fit">
          <IoIosArrowBack className=" text-2xl w-auto text-[#6C6C6D]" />
        </div>
        <div className="px-16 text-[#555454] space-y-6">
          <Subject title="Subject" placeholder="Winners Chapel Magodo" />
          {/* <Body title="Body Message" placeholder="Enter messsage here" /> */}
          <Recipients onOpen={() => setOpen(!open)}  />
        </div>
      </div>
      {open && <AddRecipientsModal onClose={() => setOpen(!open)} />}
    </OverviewContainer>
  );
};

export default EmailMessage;

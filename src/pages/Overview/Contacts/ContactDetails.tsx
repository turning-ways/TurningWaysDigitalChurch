import { IoIosArrowBack } from "react-icons/io";
import Header from "../Header";
import OverviewContainer from "../OverviewContainer";
import Information from "./Information";
import { useNavigate } from "react-router-dom";
import Status from "../../../components/Contact/Status";
import Label from "../../../components/Contact/Label";
import ActionChecklist from "../../../components/Contact/ActionChecklist";
import AssignedTo from "../../../components/Contact/AssignedTo";
import TypeYourComment from "../../../components/Contact/TypeYourComment";
import Comments from "../../../components/Contact/Comments";

const ContactDetails = () => {
  const navigate = useNavigate();
  return (
    <OverviewContainer active="Contacts">
      <Header text="Contacts" />
      <button
        className="bg-[#F1F0F3] rounded-lg p-2 w-fit cursor-pointer h-fit my-6"
        onClick={() => navigate("/admin/contacts")}
      >
        <IoIosArrowBack className=" text-2xl w-auto text-[#6C6C6D]" />
      </button>
      <Information />
      <Status />
      <Label />
      <ActionChecklist />
      <AssignedTo />
      <TypeYourComment />
      <Comments />
      {/* <div className="flex justify-end">
        <FaArrowUp className="text-2xl cursor-pointer" />
      </div> */}

      {/* {(pendingLabel ||
        pendingAssign ||
        pendingAction ||
        pendingStatusUpdate ||
        pendingContactUpdate ||
        pendingUpdate ||
        pendingDeletion) && (
        <Modal onClose={() => console.log("restricted")}>
          <ThreeDots color="black" />
        </Modal>
      )} */}
    </OverviewContainer>
  );
};

export default ContactDetails;

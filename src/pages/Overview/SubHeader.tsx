import { AiOutlineMessage } from "react-icons/ai";
import { FaRegEnvelope } from "react-icons/fa6";
import { IoIosArrowBack } from "react-icons/io";
import { MdVerified } from "react-icons/md";
import { SlNote } from "react-icons/sl";
import { useNavigate } from "react-router-dom";
import { RiDeleteBin4Line } from "react-icons/ri";
import useDeleteMember from "../../hooks/Member/member-service/useDeleteMember";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useState } from "react";
import Modal from "../../ui/Modal/Modal";
import { useSmsRecepientStore } from "../../stores/smsRecepient";
import CallDropdown from "./Membership/CallDropdown";
import { NameFormatter, ProfileNameFormatter } from "@/utils/name_formatter";

interface SubHeaderProps {
  onNoteClick: () => void;
}

const SubHeader: React.FC<SubHeaderProps> = ({ onNoteClick }) => {
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const { member } = useSelector((state: RootState) => state.members);

  const memberId = queryParams.get("id");

  const { mutate } = useDeleteMember();

  const handleDeleteMember = () => {
    mutate(memberId ? memberId : "");
  };

  const [open, setOpen] = useState<boolean>(false);

  const [openNote, setOpenNote] = useState<boolean>(false);

  const { addRecepients } = useSmsRecepientStore();

  return (
    <div className="flex justify-between mt-10 md:items-center relative flex-col md:flex-row">
      <div
        className="bg-[#F1F0F3] rounded-lg p-2 w-fit cursor-pointer h-fit md:absolute md:top-1/3 md:left-0"
        onClick={() => navigate("/admin/directory")}>
        <IoIosArrowBack className=" text-2xl w-auto text-[#6C6C6D]" />
      </div>
      <div className="flex md:space-x-5 items-center md:ml-20 flex-col md:flex-row w-full space-y-5 md:space-y-0">
        <div className="h-40 w-40 md:h-24 relative md:w-28">
          {member?.profile?.photo ? (
            <img
              src={member.profile.photo}
              className="w-full md:w-full h-full rounded-full object-cover"
              alt="profile picture"
            />
          ) : (
            <div className="bg-red-100 lg:w-24 h-full rounded-full justify-center flex items-center">
              <p className="text-[#F24E1E] text-4xl font-azoBold text-center pt-4">
                {ProfileNameFormatter(
                  member?.profile?.firstName,
                  member?.profile?.lastName
                )}
              </p>
            </div>
          )}
          {member?.verification === "verified" && (
            <MdVerified className="absolute bottom-4 left-[130px] md:bottom-1 md:left-[70px] text-4xl md:text-2xl text-[#61BD74]" />
          )}
          {member?.verification === "incomplete" && (
            <MdVerified className="absolute bottom-4 left-[130px] md:bottom-1 md:left-[70px] text-4xl md:text-2xl text-[#446DE3]" />
          )}
        </div>
        <div className="md:flex space-y-4 md:justify-between md:w-full">
          <div className="flex flex-col space-y-3">
            <div className="flex space-x-3 items-center justify-between">
              <p className="font-azoSemiBold text-[24px] sm:text-[32px] text-[#5B5A5A] ">
                {member?.profile &&
                  NameFormatter(
                    member.profile.firstName,
                    member.profile.lastName
                  )}
              </p>
              <div className="bg-[#E7E6E6] p-2 rounded-[8px] text-[12px] md:text-base text-[#505050]">
                {member?.orgRole?.name}
              </div>
            </div>
            <ul className="flex justify-between text-[#727171] gap-x-4">
              <CallDropdown />
              <li
                className="flex items-center space-x-1 cursor-pointer"
                onClick={() => {
                  navigate("/admin/directory/sms");
                  addRecepients(member ? [member] : []);
                }}>
                <AiOutlineMessage className="text-xl" />
                <p>Text</p>
              </li>
              <li className="flex items-center space-x-1 cursor-pointer">
                <FaRegEnvelope className="text-xl" />
                <p>Email</p>
              </li>
              <li
                className="flex items-center space-x-1 cursor-pointer"
                onClick={() => {
                  setOpenNote(!openNote);
                  onNoteClick();
                }}>
                <SlNote className="text-xl" />
                <p>Note</p>
              </li>
            </ul>
          </div>
          <div className="flex items-center space-x-2 justify-center md:justify-normal ">
            <button
              className="bg-white text-[#898888] border border-[#BFBFBF] px-3 lg:px-6 py-3 rounded-[8px] font-medium h-fit whitespace-nowrap flex-1 md:flex-none"
              onClick={() =>
                navigate(
                  `/admin/directory/update-member/personal-information?id=${memberId}`
                )
              }>
              Edit Profile
            </button>
            <RiDeleteBin4Line
              className="text-[#F24E1E] text-xl cursor-pointer"
              onClick={() => setOpen(true)}
            />
          </div>
        </div>
      </div>
      {open && (
        <Modal onClose={() => setOpen(false)} className="">
          <div className="bg-white p-5 max-w-64 rounded-lg space-y-6">
            <p className="text-center">
              Are you sure you'd like to delete this profile?
            </p>
            <div className="flex justify-between space-x-4">
              <button
                className="text-[#4C4C4C] bg-[#F4F4F4] w-1/2 rounded-lg py-2 px-2"
                onClick={() => setOpen(false)}>
                Cancel
              </button>
              <button
                className="text-[#4C4C4C] bg-[#F4F4F4] w-1/2 rounded-lg py-2 px-2"
                onClick={() => handleDeleteMember()}>
                Delete
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default SubHeader;

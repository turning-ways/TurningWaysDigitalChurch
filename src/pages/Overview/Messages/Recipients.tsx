import { useState } from "react";
import { FiPlusCircle } from "react-icons/fi";
import { HiQuestionMarkCircle } from "react-icons/hi2";
import { RiDeleteBin4Line } from "react-icons/ri";
import Modal from "../../../components/Modal/Modal";
import useGetAllMembers from "../../../hooks/Member/useGetAllMembers";
import { FaLeftLong, FaRightLong } from "react-icons/fa6";
interface RecipientsProp {
  onOpen: () => void;
}

const Recipients: React.FC<RecipientsProp> = ({ onOpen }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [selectedMembers, setSelectedMembers] = useState<boolean>(false);
  const { data: members } = useGetAllMembers();
  return (
    <div>
      <div className="flex justify-between items-center bg-[#EDEDFF] py-3 px-2">
        <p>Recipients</p>
        <div className="flex items-center space-x-2">
          <FiPlusCircle
            className="text-2xl text-[#7F7F7F] cursor-pointer"
            onClick={onOpen}
          />
          <HiQuestionMarkCircle className="text-[28px] text-[#7F7F7F] cursor-pointer" />
        </div>
      </div>

      {!selectedMembers ? (
        <button
          className="w-full py-3 px-2 border border-[#AAA9A9] text-[#555454] rounded-lg  my-5"
          onClick={() => setOpen(true)}
        >
          Quick Actions
        </button>
      ) : (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        <div>
          <div className="border">
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {members.map((item: any, index: number) => (
              <div
                className={`flex justify-between items-center py-3 px-2 ${
                  index !== members.length - 1 ? "border-b" : ""
                }`}
              >
                <div className="flex items-center space-x-2">
                  <input type="checkbox" />
                  <p>{item.first_name}</p>
                </div>
                <div className="flex items-center space-x-6">
                  <p>{item.phone.MainPhone}</p>
                  <RiDeleteBin4Line className="text-[#F24E1E] text-xl cursor-pointer" />
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center space-x-5 mt-6 font-azeret">
            <FaLeftLong />
            <p>Previous</p>
            <p>1</p>
            <p>2</p>
            <p>3</p>
            <p>...</p>
            <p>100</p>
            <p>Next</p>
            <FaRightLong />
            <div className="h-5 w-1 bg-[#AAAAAA] " />
            <p>Go to Page</p>
            <div className="w-5 h-5 border rounded-[4px] border-[#555555]" />
          </div>
        </div>
      )}

      <div className="mt-10">
        <p>
          Send SMS at <span className="text-secondary">*</span>
        </p>
        <div className="flex space-x-8">
          <div className="flex space-x-2">
            <input type="checkbox" />
            <p>Immediately</p>
          </div>
          <div className="flex space-x-2">
            <input type="checkbox" />
            <p>Later</p>
          </div>
        </div>
      </div>

      {open && (
        <Modal>
          <div className="bg-white px-[26px] py-[37px] rounded-2xl text-lg flex flex-col gap-6">
            <ul className="text-[#7F7F7F] flex flex-col gap-6 w-[334px]">
              <li className="flex space-x-3 items-center cursor-pointer text-[#555555]">
                <p>Send Bulk SMS To</p>
              </li>
              <li
                className="flex space-x-3 items-center cursor-pointer "
                onClick={() => {
                  setSelectedMembers(!selectedMembers);
                  setOpen(!open);
                }}
              >
                <p>All Church Members</p>
              </li>
              <li
                className="flex space-x-3 items-center cursor-pointer "
                onClick={() => {
                  setOpen(false);
                  onOpen();
                }}
              >
                <p>Filter Membership Profiles</p>
              </li>
            </ul>
            <button
              className=" text-[#7B7B7B] bg-[#F4F4F4] w-[280px] py-2 rounded-[14px] self-center"
              onClick={() => setOpen(!open)}
            >
              Cancel
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Recipients;

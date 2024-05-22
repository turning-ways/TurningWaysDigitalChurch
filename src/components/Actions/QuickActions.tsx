import {
  FaClockRotateLeft,
  FaCommentSms,
  FaRegCreditCard,
  FaRegEnvelope,
} from "react-icons/fa6";
import Modal from "../Modal/Modal";
import { useNavigate } from "react-router-dom";
import useGetAllMembers from "../../hooks/Member/useGetAllMembers";
import { CiExport, CiFilter, CiImport, CiMail } from "react-icons/ci";
import { useState } from "react";

const QuickActions = () => {
  const items = [
    { name: "Filter", icon: <CiFilter /> },
    { name: "Send Bulk Message", icon: <CiMail /> },
    { name: "Export Data", icon: <CiExport /> },
    { name: "Import Data", icon: <CiImport /> },
  ];

  const [open, setOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const { data: members } = useGetAllMembers({ page: 1, pageSize: 10000000 });
  return (
    <div className="flex justify-between my-10">
      <p className="text-xl">{members ? members.length : "..."} Persons</p>
      <ul className="flex space-x-6 text-[18px] text-[#8A8989] ">
        {items.map((item) => (
          <li
            className="flex items-center space-x-1 p-2 cursor-pointer hover:text-[#555555]"
            onClick={() => {
              if (item.name === "Send Bulk Message") setOpen(!open);
            }}
          >
            <div>{item.icon}</div>
            <p className="leading-3">{item.name}</p>
          </li>
        ))}
      </ul>
      {open && (
        <Modal>
          <div className="bg-white px-[26px] py-[37px] rounded-2xl text-lg flex flex-col gap-6">
            <ul className="text-[#7F7F7F] flex flex-col gap-6 w-[334px]">
              <li
                className="flex space-x-3 items-center cursor-pointer hover:text-[#555555]"
                onClick={() => navigate("/admin/directory/sms")}
              >
                <FaCommentSms className="text-2xl" />
                <p>Send Bulk SMS</p>
              </li>
              <li className="flex space-x-3 items-center cursor-pointer hover:text-[#555555]">
                <FaRegEnvelope />
                <p>Send Bulk Email</p>
              </li>
              <li className="flex space-x-3 items-center cursor-pointer hover:text-[#555555]">
                <FaClockRotateLeft />
                <p>View Bulk Message History</p>
              </li>
              <li className="flex space-x-3 items-center cursor-pointer hover:text-[#555555]">
                <FaRegCreditCard />
                <p>Buy SMS Credit</p>
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

export default QuickActions;

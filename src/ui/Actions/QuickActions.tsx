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
import * as XLSX from "xlsx";

interface QuickActionsProps {
  display?: string;
}

const QuickActions: React.FC<QuickActionsProps> = ({ display }) => {
  const items = [
    { name: "Filter", icon: <CiFilter /> },
    { name: "Send Bulk Message", icon: <CiMail /> },
    { name: "Export Data", icon: <CiExport /> },
    { name: "Import Data", icon: <CiImport /> },
  ];

  const [open, setOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const { data: members } = useGetAllMembers({ page: 1, pageSize: 10000000 });

  const handleOnExport = () => {
    const selectedMembers = members
      ? members.map((member) => ({
          ServiceUnit: member.ServiceUnit,
          WorkerStatus: member.WorkerStatus,
          accessPermission: member.accessPermission,
          age: member.age,
          anniversary: member.anniversary,
          dateJoined: member.dateJoined,
          dateOfBirth: member.dateOfBirth,
          email: member.email,
          first_name: member.first_name,
          fullname: member.fullname,
          gender: member.gender,
        }))
      : [{}];

    const wb = XLSX.utils.book_new(),
      ws = XLSX.utils.json_to_sheet(selectedMembers);
    XLSX.utils.book_append_sheet(wb, ws, "My Sheet !");
    XLSX.writeFile(wb, "MyExcel.xlsx");
  };
  return (
    <>
      <div
        className={`flex justify-between my-6 lg:my-10 flex-col space-y-1 lg:flex-row lg:space-y-0 ${display}`}
      >
        <p className="lg:text-lg text-[#7F7E7E] text-base">
          {members ? members.length : "0"} Persons
        </p>
        <ul className="flex md:space-x-6 text-[18px] text-[#8A8989] overflow-x-scroll scrollbar-hide">
          {items.map((item, index) => (
            <li
              className={`flex items-center space-x-1 ${
                index === 0 ? "py-2 pr-2 " : "p-2"
              } text-sm md:text-base cursor-pointer hover:text-[#555555] whitespace-nowrap `}
              onClick={() => {
                if (item.name === "Send Bulk Message") setOpen(!open);
                if (item.name === "Export Data") handleOnExport();
              }}
              key={index}
            >
              <div>{item.icon}</div>
              <p className="leading-3">{item.name}</p>
            </li>
          ))}
        </ul>
      </div>
      {open && (
        <Modal onClose={() => setOpen(false)}>
          <div className="bg-white px-5 sm:px-[26px] py-[37px] rounded-2xl lg:text-lg flex flex-col gap-6 w-[300px] sm:w-[334px]">
            <ul className="text-[#7F7F7F] flex flex-col gap-6 w-full">
              <li
                className="flex space-x-3 items-center cursor-pointer hover:text-[#555555] "
                onClick={() => navigate("/admin/directory/sms")}
              >
                <FaCommentSms className="sm:text-2xl" />
                <p>Send Bulk SMS</p>
              </li>
              <li className="flex space-x-3 items-center cursor-pointer hover:text-[#555555]">
                <FaRegEnvelope className="sm:text-2xl" />
                <p>Send Bulk Email</p>
              </li>
              <li className="flex space-x-3 items-center cursor-pointer hover:text-[#555555]">
                <FaClockRotateLeft className="sm:text-2xl" />
                <p>View Bulk Message History</p>
              </li>
              <li className="flex space-x-3 items-center cursor-pointer hover:text-[#555555]">
                <FaRegCreditCard className="sm:text-2xl" />
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
    </>
  );
};

export default QuickActions;

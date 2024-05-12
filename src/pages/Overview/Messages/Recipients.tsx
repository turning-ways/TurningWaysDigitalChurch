/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { FiPlusCircle } from "react-icons/fi";
import { HiQuestionMarkCircle } from "react-icons/hi2";
import { RiDeleteBin4Line } from "react-icons/ri";
import Modal from "../../../components/Modal/Modal";
import useGetAllMembers from "../../../hooks/Member/useGetAllMembers";
// import { FaLeftLong, FaRightLong } from "react-icons/fa6";
import useSendSms from "../../../hooks/Member/useSendSms";
import Subject from "./Subject";
import Body from "./Body";
import { useSmsRecepientStore } from "../../../stores/smsRecepient";

interface RecipientsProp {
  onOpen: () => void;
}

// interface Member {
//   ServiceUnit: string;
//   WorkerStatus: string;
//   accessPermission: string;
//   age: number;
//   anniversary: string;
//   dateJoined: string;
//   dateOfBirth: string;
//   email: string;
//   first_name: string;
//   fullname: string;
//   gender: string;
//   id: string;
//   last_name: string;
//   memberStatus: string;
//   middle_name: string;
//   notes: [];
//   phone: { MainPhone: string };
//   photo: string;
//   role: string;
//   suffix: string;
//   title: string;
//   workType: string;
//   _id: string;
// }

const Recipients: React.FC<RecipientsProp> = ({ onOpen }) => {
  const [open, setOpen] = useState<boolean>(false);
  const { data: members } = useGetAllMembers({ page: 1, pageSize: 10000 });
  const { mutate } = useSendSms();
  const [message, setMessage] = useState<string>("");
  const {recepients, removeAllRecepients, removeRecepientById, addRecepients} =useSmsRecepientStore();
  useEffect(() => removeAllRecepients(),[removeAllRecepients])
  return (
    <>
      <Subject title="Sender's ID" placeholder="Winners Chapel Magodo" />
      <Body
        title="Text Message"
        placeholder="Enter text messsage here"
        onMessageChange={(value: string) => {
          setMessage(value);
        }}
      />
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

        {recepients.length === 0 && (
          <button
            className="w-full py-3 px-2 border border-[#AAA9A9] text-[#555454] rounded-lg  my-5"
            onClick={() => setOpen(true)}
          >
            Quick Actions
          </button>
        )}
       
            {/* <div className="flex items-center justify-center space-x-5 mt-6 font-azeret">
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
            </div> */}


        {recepients.length !== 0 && (
          <div>
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {recepients &&
              recepients.map((item: any, index: number) => (
                <div
                  className={`flex justify-between items-center py-3 px-2 ${
                    index !== recepients.length - 1 ? "border-b" : ""
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <p>{item.first_name}</p>
                  </div>
                  <div className="flex items-center space-x-6">
                    <p>{item.phone.MainPhone}</p>
                    <RiDeleteBin4Line className="text-[#F24E1E] text-xl cursor-pointer" onClick={() => removeRecepientById(item.id)} />
                  </div>
                </div>
              ))}
          </div>
        )}

        {/* <div className="mt-10">
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
        </div> */}

        <button
          className="mt-10 bg-[#446DE3] text-white w-full p-4 rounded-[8px]"
          onClick={() => {
            mutate({
              message,
              members:
                recepients &&
                recepients.map((member) => member.id),
            });
          }}
        >
          Send SMS
        </button>

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
                    setOpen(!open);
                    members && addRecepients(members);
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
    </>
  );
};

export default Recipients;

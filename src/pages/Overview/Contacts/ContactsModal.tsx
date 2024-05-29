import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../../../components/Modal/Modal";
import useUpdateContactStatus from "../../../hooks/Contacts/useUpdateContactStatus";

interface ContactsModalProps {
  show: string | null;
  id: string;
  onClose: () => void;
}

const ContactsModal: React.FC<ContactsModalProps> = ({ show, id, onClose }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const { mutate: update } = useUpdateContactStatus(id);
  return (
    <>
      <div
        className={`modal bg-white rounded-2xl w-[280px] px-6 py-4 space-y-6 border self-end absolute top-12 z-50 ${
          show === id ? "block" : "hidden"
        }`}
      >
        <ul className="text-[#555555]  space-y-2">
          <li
            className="hover:text-[#A0D7AC] cursor-pointer"
            onClick={() => navigate(`/admin/contacts/detail?id=${id}`)}
          >
            View More
          </li>
          <li className="hover:text-[#A0D7AC] cursor-pointer">
            Update Contact
          </li>
          <li
            className="hover:text-[#A0D7AC] cursor-pointer"
            onClick={() => setOpen(!open)}
          >
            Delete Contact
          </li>
          <li
            className="hover:text-[#A0D7AC] cursor-pointer"
            onClick={() => setOpenConfirm(!openConfirm)}
          >
            Confirm Member
          </li>
        </ul>
        <button
          className="text-[#7A7A7A] bg-[#F3F3F3] px-6 py-2 w-full rounded-[14px] hover:text-[#2A2A2A]"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
      {open && (
        <Modal>
          <div className="bg-white flex flex-col space-y-3 p-4 rounded-[16px]">
            <h1 className="text-lg text-[#555555]">Delete Contact</h1>
            <p className="text-[#7F7F7F] text-lg">
              Are you sure you want to delete this contact
            </p>
            <div className="space-x-4 flex ">
              <button
                className="bg-[#F4F4F4] text-[#7B7B7B] rounded-[14px] w-full py-2 px-4 hover:bg-[#17275B] hover:text-white"
                onClick={(e) => {
                  e.preventDefault();
                  setOpen(!open);
                }}
              >
                No
              </button>
              <button className="bg-[#F4F4F4] text-[#7B7B7B] rounded-[14px] w-full py-2 px-4 hover:bg-[#17275B] hover:text-white">
                Yes
              </button>
            </div>
          </div>
        </Modal>
      )}
      {openConfirm && (
        <Modal>
          <div className="bg-white flex flex-col space-y-3 p-4 rounded-[16px]">
            <h1 className="text-lg text-[#555555]">Confirm Member</h1>
            <p className="text-[#7F7F7F] text-lg">
              Are you sure you want to confirm this member
            </p>
            <div className="space-x-4 flex ">
              <button
                className="bg-[#F4F4F4] text-[#7B7B7B] rounded-[14px] w-full py-2 px-4 hover:bg-[#17275B] hover:text-white"
                onClick={(e) => {
                  e.preventDefault();
                  setOpenConfirm(!openConfirm);
                }}
              >
                No
              </button>
              <button
                className="bg-[#F4F4F4] text-[#7B7B7B] rounded-[14px] w-full py-2 px-4 hover:bg-[#17275B] hover:text-white"
                onClick={() => {
                  update({ membershipStatus: "confirmed" });
                  setTimeout(() => {
                    setOpenConfirm(!openConfirm);
                  }, 500);
                }}
              >
                Yes
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default ContactsModal;

import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../../../ui/Modal/Modal";
import {
  useUpdateContactStatus,
  useDeleteContact,
} from "../../../hooks/useContact";
import { ThreeDots } from "react-loader-spinner";
// import UpdateContact from "./UpdateContact";

interface ContactsModalProps {
  show: string | null;
  id: string;
  onClose: () => void;
}

const ContactsModal: React.FC<ContactsModalProps> = ({ show, id, onClose }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  // const [openUpdate, setOpenUpdate] = useState(false);
  const { mutate: update, isPending } = useUpdateContactStatus({
    id,
    onClose: () => setOpenConfirm(!openConfirm),
  });
  const { mutate: deleteContact, isPending: deleteC } = useDeleteContact(() => {
    setOpen(false);
    onClose();
  });

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Function to handle clicks outside the dropdown
  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      onClose();
    }
  };

  // Effect to set up event listener when component mounts
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up event listener when component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div ref={dropdownRef} className="self-end absolute top-12">
      <div
        className={`modal bg-white rounded-2xl w-[280px] px-6 py-4 space-y-6 border  z-50 ${
          show === id ? "block" : "hidden"
        }`}
        // ref={modalRef}
      >
        <ul className="text-[#555555]  space-y-2">
          <li
            className="hover:text-[#A0D7AC] cursor-pointer"
            onClick={() => navigate(`/admin/contacts/${id}`)}
          >
            View More
          </li>
          {/* <li
            className="hover:text-[#A0D7AC] cursor-pointer"
            onClick={() => setOpenUpdate(!openUpdate)}
          >
            Update Contact
          </li> */}
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
        <Modal onClose={() => setOpen(false)}>
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
              <button
                className="bg-[#F4F4F4] text-[#7B7B7B] rounded-[14px] w-full py-2 px-4 hover:bg-[#17275B] hover:text-white flex justify-center"
                onClick={() => deleteContact(id)}
              >
                {!deleteC ? (
                  <p>Yes</p>
                ) : (
                  <ThreeDots width={34} height={24} color="white" />
                )}
              </button>
            </div>
          </div>
        </Modal>
      )}
      {openConfirm && (
        <Modal onClose={() => setOpenConfirm(false)}>
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
                className="bg-[#F4F4F4] flex justify-center text-[#7B7B7B] rounded-[14px] w-full py-2 px-4 hover:bg-[#17275B] hover:text-white "
                onClick={() => {
                  update({ membershipStatus: "confirmed" });
                }}
              >
                {!isPending ? (
                  <p>Yes</p>
                ) : (
                  <ThreeDots width={34} height={24} color="white" />
                )}
              </button>
            </div>
          </div>
        </Modal>
      )}
      {/* {openUpdate && (
        <UpdateContact onClose={() => setOpenUpdate(!openUpdate)} id={id} />
      )} */}
    </div>
  );
};

export default ContactsModal;

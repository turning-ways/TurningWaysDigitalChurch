interface ContactsModalProps {
  show: number | null;
  id: number;
  onClose: () => void;
}

const ContactsModal: React.FC<ContactsModalProps> = ({ show, id, onClose }) => {
  return (
    <div
      className={`modal bg-white rounded-2xl w-[280px] px-6 py-4 space-y-6 border self-end absolute top-12 z-50 ${
        show === id ? "block" : "hidden"
      }`}
    >
      <ul className="text-[#555555]  space-y-2">
        <li className="hover:text-[#A0D7AC] cursor-pointer">View More</li>
        <li className="hover:text-[#A0D7AC] cursor-pointer">Update Contact</li>
        <li className="hover:text-[#A0D7AC] cursor-pointer">Delete Contact</li>
        <li className="hover:text-[#A0D7AC] cursor-pointer">Confirm Member</li>
      </ul>
      <button
        className="text-[#7A7A7A] bg-[#F3F3F3] px-6 py-2 w-full rounded-[14px] hover:text-[#2A2A2A]"
        onClick={onClose}
      >
        Cancel
      </button>
    </div>
  );
};

export default ContactsModal;

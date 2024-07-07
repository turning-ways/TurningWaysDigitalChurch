import { FiPhone } from "react-icons/fi";

interface PhoneButtonProps {
  onClick: () => void;
}

const PhoneButton: React.FC<PhoneButtonProps> = ({ onClick }) => {
  return (
    <button
      className="border border-[#CBD5E0] rounded-lg py-3 px-6 flex justify-center lg:justify-normal space-x-2 cursor-not-allowed lg:space-x-3 items-center w-full mt-5"
      onClick={onClick}
      disabled
    >
      <FiPhone className="text-xl lg:text-[28px]" />
      <p className=" lg:text-center lg:w-full text-[#67728A] text-sm lg:text-base font-medium">
        Continue with phone
      </p>
    </button>
  );
};

export default PhoneButton;

import { FiPhone } from "react-icons/fi";

interface PhoneButtonProps{
  onClick: () => void
}

const PhoneButton: React.FC<PhoneButtonProps> = ({onClick}) => {
  return (
    <div
      className="border border-[#CBD5E0] rounded-[20px] py-3 px-6 flex space-x-3 items-center w-full lg:max-w-[550px] cursor-pointer mt-5"
      onClick={onClick}
    >
      <FiPhone style={{ fontSize: "28px" }} />
      <p className="text-center w-full text-[#67728A] text-lg font-medium">
        Continue with phone
      </p>
    </div>
  );
};

export default PhoneButton;

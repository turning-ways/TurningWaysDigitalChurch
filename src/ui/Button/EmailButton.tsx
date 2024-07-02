import { FaRegEnvelope } from "react-icons/fa6";

interface EmailButtonProps {
  onClick: () => void;
}

const EmailButton: React.FC<EmailButtonProps> = ({ onClick }) => {
  return (
    <div
    className="border border-[#CBD5E0] rounded-lg py-3 px-6 flex justify-center lg:justify-normal space-x-2 lg:space-x-3 items-center w-full  cursor-pointer mt-5"
      onClick={onClick}
    >
      <FaRegEnvelope className="text-xl lg:text-[28px]" />
      <p className=" lg:text-center lg:w-full text-[#67728A] text-sm lg:text-base font-medium">
        Continue with phone
      </p>
    </div>
  );
};

export default EmailButton;

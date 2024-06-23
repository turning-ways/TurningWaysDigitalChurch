import { FaRegEnvelope } from "react-icons/fa6";

interface EmailButtonProps {
  onClick: () => void;
}

const EmailButton: React.FC<EmailButtonProps> = ({onClick}) => {
  return (
    <div
      className="border border-[#CBD5E0] rounded-[20px] py-3 px-6 flex space-x-3 items-center w-full lg:max-w-[550px] cursor-pointer mt-5"
      onClick={onClick}
    >
      <FaRegEnvelope style={{ fontSize: "28px" }} />
      <p className="text-center w-full text-[#67728A] text-lg font-medium">
        Continue with email
      </p>
    </div>
  );
};

export default EmailButton;

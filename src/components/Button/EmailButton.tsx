import { FaRegEnvelope } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const EmailButton = () => {
  const navigate = useNavigate();
  return (
    <div
      className="border border-[#CBD5E0] rounded-[20px] py-3 flex justify-center space-x-3 items-center w-full lg:max-w-[550px] cursor-pointer mt-5"
      onClick={() => navigate("/")}
    >
      <FaRegEnvelope style={{ fontSize: "20px" }} />
      <p className=" text-center text-[#67728A] text-sm lg:text-xl font-medium">
        Continue with email
      </p>
    </div>
  );
};

export default EmailButton;

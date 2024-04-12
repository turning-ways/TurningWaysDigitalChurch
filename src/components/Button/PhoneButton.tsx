import { FiPhone } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const PhoneButton = () => {
  const navigate = useNavigate();
  return (
    <div
      className="border border-[#CBD5E0] rounded-[10px] py-3 flex justify-center space-x-3 items-center w-full lg:max-w-[550px] cursor-pointer mt-5"
      onClick={() => navigate("/login-with-number")}
    >
      <FiPhone style={{ fontSize: "20px" }} />
      <p className=" text-center text-[#67728A] text-sm lg:text-xl font-medium">
        Continue with phone
      </p>
    </div>
  );
};

export default PhoneButton;

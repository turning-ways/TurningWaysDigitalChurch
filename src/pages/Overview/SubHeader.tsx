import { AiOutlineMessage } from "react-icons/ai";
import { FaRegEnvelope } from "react-icons/fa6";
import { IoIosArrowBack } from "react-icons/io";
import { IoCallOutline } from "react-icons/io5";
import { MdVerified } from "react-icons/md";
import { SlNote } from "react-icons/sl";
import { useNavigate } from "react-router-dom";

const SubHeader = () => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between mt-10 items-center relative">
      <div className="bg-[#F1F0F3] rounded-lg p-2 w-fit cursor-pointer h-fit absolute top-1/3 left-0">
        <IoIosArrowBack
          className=" text-2xl w-auto text-[#6C6C6D]"
          onClick={() => navigate("/members")}
        />
      </div>
      <div className="flex space-x-5 items-center ml-20">
        <div className="h-24 relative">
          <div className="bg-red-100 w-24 h-full rounded-full " />
          <MdVerified className="absolute bottom-1 left-[70px] text-2xl text-[#61BD74]" />
        </div>
        <div className="flex flex-col space-y-3">
          <div className="flex space-x-3 items-center">
            <p className="text-[32px] text-[#5B5A5A] ">Owoeye Temidire</p>
            <div className="bg-[#E7E6E6] p-2 rounded-[8px]">Member</div>
          </div>
          <ul className="flex justify-between text-[#727171]">
            <li className="flex items-center space-x-1 cursor-pointer">
              <IoCallOutline className="text-xl" />
              <p className="text-xl">Call</p>
            </li>
            <li className="flex items-center space-x-1 cursor-pointer">
              <AiOutlineMessage className="text-xl" />
              <p>Text</p>
            </li>
            <li className="flex items-center space-x-1 cursor-pointer">
              <FaRegEnvelope className="text-xl" />
              <p>Email</p>
            </li>
            <li className="flex items-center space-x-1 cursor-pointer">
              <SlNote className="text-xl" />
              <p>Note</p>
            </li>
          </ul>
        </div>
      </div>
      <button className="bg-white text-[#898888] border border-[#BFBFBF] px-6 py-3 rounded-[8px] font-medium h-fit">
        Edit Profile
      </button>
    </div>
  );
};

export default SubHeader;
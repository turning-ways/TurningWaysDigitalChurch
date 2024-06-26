import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const SubHeader = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center flex-col mt-10 items-center relative">
      <div
        className="bg-[#F1F0F3] rounded-lg p-2 w-fit cursor-pointer h-fit absolute top-0 left-0"
        onClick={() => navigate(`/admin/directory`)}
      >
        <IoIosArrowBack className=" text-2xl w-auto text-[#6C6C6D]" />
      </div>
      <div className="relative">
        <div className="border border-black w-32 h-32 rounded-full mb-5 flex justify-center items-start text-5xl pt-5">
          __
        </div>
        <input type="file" accept="image/*" className="hidden" />
      </div>
    </div>
  );
};

export default SubHeader;

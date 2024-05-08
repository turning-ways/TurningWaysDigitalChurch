import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../../../../stores/user";

interface SubHeaderProps {
  btnText: string;
}

const SubHeader: React.FC<SubHeaderProps> = ({ btnText }) => {
  const navigate = useNavigate();

  const { user } = useUserAuth();

  return (
    <div className="flex justify-center flex-col mt-10 items-center relative">
      <div
        className="bg-[#F1F0F3] rounded-lg p-2 w-fit cursor-pointer h-fit absolute top-0 left-0"
        onClick={() => navigate(`/admin/directory`)}
      >
        <IoIosArrowBack className=" text-2xl w-auto text-[#6C6C6D]" />
      </div>
      <div className="border border-black w-32 h-32 rounded-full mb-5 flex justify-center items-center text-5xl">
        {user
          ? user?.first_name.charAt(0).toUpperCase() +
            user?.last_name.charAt(0).toUpperCase()
          : "P"}
      </div>
      <div className="bg-[#17275B] text-[#ffffff] border border-[#BFBFBF] px-6 py-3 font-medium h-fit">
        {btnText}
      </div>
    </div>
  );
};

export default SubHeader;

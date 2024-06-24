import { HiMiniPlusCircle } from "react-icons/hi2";

const AddProfile = () => {
  return (
    <button className="rounded-[15px] border border-[#17275B] px-5 py-3 space-x-2 text-[#17275B] flex items-center my-10">
      <HiMiniPlusCircle className="text-[21px]" />
      <p className="font-medium">Add Profile</p>
    </button>
  );
};

export default AddProfile;

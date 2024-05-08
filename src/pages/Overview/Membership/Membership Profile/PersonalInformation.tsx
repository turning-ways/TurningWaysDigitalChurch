import { IoIosArrowForward } from "react-icons/io";
import useGetMemberDetails from "../../../../hooks/Member/useGetMemberDetails";

const PersonalInformation = () => {



  const {data}= useGetMemberDetails();

  return (
    <div className="mt-10">
      {data && <div>
        <div className="flex p-5 bg-[#F3F1F1] justify-between items-center ">
          <p className="font-medium text-[#414040]">Household</p>
          <IoIosArrowForward className="text-[28px]" />
        </div>
        <div className="px-5 pt-6 pb-2 border-b space-y-2">
          <p className="text-[#727272]">First Name</p>
          <p className="outline-none text-[#434343] text-lg w-full">
            {data.member.first_name}
          </p>
        </div>
        <div className="px-5 pt-6 pb-2 border-b space-y-2">
          <p className="text-[#727272]">Last Name</p>
          <p className="outline-none text-[#434343] text-lg w-full">
            {data.member.last_name}
          </p>
        </div>
        <div className="px-5 pt-6 pb-2 border-b space-y-2">
          <p className="text-[#727272]">Middle Name</p>
          <p className="outline-none text-[#434343] text-lg w-full">
            {data.member.middle_name}
          </p>
        </div>
        <div className="px-5 pt-6 pb-2 border-b space-y-2">
          <p className="text-[#727272]">Prefix</p>
          <p className="outline-none text-[#434343] text-lg w-full">{}</p>
        </div>
        <div className="px-5 pt-6 pb-2 border-b space-y-2">
          <p className="text-[#727272]">Suffix</p>
          <p className="outline-none text-[#434343] text-lg w-full">{}</p>
        </div>
      </div>}
    </div>
  );
};

export default PersonalInformation;

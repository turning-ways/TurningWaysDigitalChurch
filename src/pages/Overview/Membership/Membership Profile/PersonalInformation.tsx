import { IoIosArrowForward } from "react-icons/io";
import useGetMemberDetails from "../../../../hooks/Member/useGetMemberDetails";

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  const formattedDate = new Intl.DateTimeFormat("en-GB", options).format(
    date
  );
  return formattedDate;
};
const PersonalInformation = () => {
  const { data } = useGetMemberDetails();


  return (
    <div className="mt-10">
      {data && (
        <div>
          <div className="flex p-5 bg-[#F3F1F1] justify-between items-center ">
            <p className="font-medium text-[#414040]">Household</p>
            <IoIosArrowForward className="text-[28px]" />
          </div>
          <div className="px-5 pt-6 pb-2 border-b space-y-2">
            <p className="text-[#727272]">First Name</p>
            <p className="outline-none text-[#434343] text-lg w-full">
              {data?.member?.first_name?.slice(0, 1).toUpperCase() +
                data?.member?.first_name?.slice(1)}
            </p>
          </div>
          <div className="px-5 pt-6 pb-2 border-b space-y-2">
            <p className="text-[#727272]">Last Name</p>
            <p className="outline-none text-[#434343] text-lg w-full">
              {data.member?.last_name?.slice(0, 1).toUpperCase() +
                data.member?.last_name?.slice(1)}
            </p>
          </div>
          <div className="px-5 pt-6 pb-2 border-b space-y-2">
            <p className="text-[#727272]">Middle Name</p>
            <p className="outline-none text-[#434343] text-lg w-full">
              {data?.member?.middle_name?.slice(0, 1).toUpperCase() +
                data?.member?.middle_name?.slice(1)}
            </p>
          </div>
          <div className="px-5 pt-6 pb-2 border-b space-y-2">
            <p className="text-[#727272]">Prefix</p>
            <p className="outline-none text-[#434343] text-lg w-full">
              {data.member.prefix ?
                data?.member?.prefix?.slice(0, 1).toUpperCase() +
                  data.member?.prefix?.slice(1) : ""}
            </p>
          </div>
          <div className="px-5 pt-6 pb-2 border-b space-y-2">
            <p className="text-[#727272]">Suffix</p>
            <p className="outline-none text-[#434343] text-lg w-full">{data.member.suffix ?
                data?.member?.suffix?.slice(0, 1).toUpperCase() +
                  data?.member?.suffix?.slice(1) : ""}</p>
          </div>
          <div className="px-5 pt-6 pb-2 border-b space-y-2">
            <p className="text-[#727272]">Gender</p>
            <p className="outline-none text-[#434343] text-lg w-full">
            {data?.member?.gender?.slice(0, 1).toUpperCase() +
                data?.member?.gender?.slice(1)}
            </p>
          </div>
          <div className="px-5 pt-6 pb-2 border-b space-y-2">
            <p className="text-[#727272]">Date of Birth</p>
            <p className="outline-none text-[#434343] text-lg w-full">
              {formatDate(data?.member?.dateOfBirth)}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PersonalInformation;

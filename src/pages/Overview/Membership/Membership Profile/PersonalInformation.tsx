// import { IoIosArrowForward } from "react-icons/io";
import useGetMemberDetails from "../../../../hooks/Member/member-service/useGetMemberDetails";
import { useNavigate } from "react-router-dom";

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  const formattedDate = new Intl.DateTimeFormat("en-GB", options).format(date);
  return formattedDate;
};
export const formatDateTime = (dateTimeString: string) => {
  const dateTime = new Date(dateTimeString);

  // Format options for date
  const dateFormatOptions: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  const formattedDate = new Intl.DateTimeFormat("en-GB", dateFormatOptions).format(dateTime);

  // Format options for time
  const timeFormatOptions: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "numeric",
    hour12: true, // Use 12-hour format (e.g., 9:40pm)
  };
  const formattedTime = new Intl.DateTimeFormat("en-US", timeFormatOptions).format(dateTime);

  // Combine date and time into desired format
  const formattedDateTime = `${formattedDate} ${formattedTime}`;

  return formattedDateTime;
};
const PersonalInformation = () => {
  const { data } = useGetMemberDetails();
  const queryParams = new URLSearchParams(location.search);

  const memberId = queryParams.get("id");

  const navigate = useNavigate();
  return (
    <div className="">
      {data && (
        <div className=" flex flex-col">
          {/* <div className="flex p-5 bg-[#F3F1F1] justify-between items-center ">
            <p className="font-medium text-[#414040]">Household</p>
            <IoIosArrowForward className="text-[28px]" />
          </div> */}
          <div className="px-5 pt-6 pb-2 border-b md:space-y-2">
            <p className="text-[#727272]">First Name</p>
            <p className="outline-none text-[#434343] text-lg w-full">
              {data?.member?.first_name?.slice(0, 1).toUpperCase() +
                data?.member?.first_name?.slice(1)}
            </p>
          </div>
          <div className="px-5 pt-6 pb-2 border-b md:space-y-2">
            <p className="text-[#727272]">Last Name</p>
            <p className="outline-none text-[#434343] text-lg w-full">
              {data.member?.last_name?.slice(0, 1).toUpperCase() +
                data.member?.last_name?.slice(1)}
            </p>
          </div>
          <div className="px-5 pt-6 pb-2 border-b md:space-y-2">
            <p className="text-[#727272]">Middle Name</p>
            <p className="outline-none text-[#434343] text-lg w-full">
              {data?.member?.middle_name
                ? data?.member?.middle_name?.slice(0, 1).toUpperCase() +
                  data?.member?.middle_name?.slice(1)
                : "None"}
            </p>
          </div>
          <div className="px-5 pt-6 pb-2 border-b md:space-y-2">
            <p className="text-[#727272]">Prefix</p>
            <p className="outline-none text-[#434343] text-lg w-full">
              {data.member.prefix
                ? data?.member?.prefix?.slice(0, 1).toUpperCase() +
                  data.member?.prefix?.slice(1)
                : "None"}
            </p>
          </div>
          <div className="px-5 pt-6 pb-2 border-b md:space-y-2">
            <p className="text-[#727272]">Suffix</p>
            <p className="outline-none text-[#434343] text-lg w-full">
              {data.member.suffix
                ? data?.member?.suffix?.slice(0, 1).toUpperCase() +
                  data?.member?.suffix?.slice(1)
                : "None"}
            </p>
          </div>
          <div className="px-5 pt-6 pb-2 border-b md:space-y-2">
            <p className="text-[#727272]">Gender</p>
            <p className="outline-none text-[#434343] text-lg w-full">
              {data?.member?.gender?.slice(0, 1).toUpperCase() +
                data?.member?.gender?.slice(1)}
            </p>
          </div>
          <div className="px-5 pt-6 pb-2 border-b md:space-y-2">
            <p className="text-[#727272]">Date of Birth</p>
            <p className="outline-none text-[#434343] text-lg w-full">
              {formatDate(data?.member?.dateOfBirth)}
            </p>
          </div>
          <div className="px-5 pt-6 pb-2 border-b md:space-y-2">
            <p className="text-[#727272]">Educational Level</p>
            <p className="outline-none text-[#434343] text-lg w-full">
              {data.member.educationalLevel
                ? data?.member?.educationalLevel?.slice(0, 1).toUpperCase() +
                  data?.member?.educationalLevel?.slice(1)
                : "Undefined"}
            </p>
          </div>
          <div className="px-5 pt-6 pb-2 border-b md:space-y-2">
            <p className="text-[#727272]">Employment Status</p>
            <p className="outline-none text-[#434343] text-lg w-full">
              {data.member.employmentStatus
                ? data?.member?.employmentStatus?.slice(0, 1).toUpperCase() +
                  data?.member?.employmentStatus?.slice(1)
                : "Undefined"}
            </p>
          </div>
          <div className="px-5 pt-6 pb-2 border-b md:space-y-2">
            <p className="text-[#727272]">Health Status</p>
            <p className="outline-none text-[#434343] text-lg w-full">
              {data.member.healthStatus
                ? data?.member?.healthStatus?.slice(0, 1).toUpperCase() +
                  data?.member?.healthStatus?.slice(1)
                : "Undefined"}
            </p>
          </div>
          <button
            className=" self-end mt-4 bg-[#17275B] text-white px-4
        
        py-2 rounded-lg gap-2 justify-center"
            onClick={() =>
              navigate(
                `/admin/directory/member/contact-information?id=${memberId}`
              )
            }
          >
            {/* <RiAddCircleFill className="text-2xl" /> */}
            <p className="text-lg ">Next</p>
          </button>
        </div>
      )}
    </div>
  );
};

export default PersonalInformation;

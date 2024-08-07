/* eslint-disable no-mixed-spaces-and-tabs */
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import { useEffect } from "react";

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

  const dateFormatOptions: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  const formattedDate = new Intl.DateTimeFormat(
    "en-GB",
    dateFormatOptions
  ).format(dateTime);

  const timeFormatOptions: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };
  const formattedTime = new Intl.DateTimeFormat(
    "en-US",
    timeFormatOptions
  ).format(dateTime);

  const formattedDateTime = `${formattedDate} ${formattedTime}`;

  return formattedDateTime;
};

const PersonalInformation = () => {
  const { member } = useSelector((state: RootState) => state.members);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const memberId = queryParams.get("id");

  // useEffect to make my page scroll to the top when the component mounts
  useEffect(() => {
    // scroll to the top of the screen when the component mounts
    window.scrollY = 0;
  }, []);
  const navigate = useNavigate();
  return (
    <div className="block">
      {member ? (
        <div className="flex flex-col">
          <div className="px-5 pt-6 pb-2 border-b md:space-y-2">
            <p className="text-[#727272]">First Name</p>
            <p className="outline-none text-[#434343] text-lg w-full">
              {member.profile?.firstName
                ? member?.profile?.firstName?.charAt(0).toUpperCase() +
                  member?.profile?.firstName?.slice(1)
                : "N/A"}
            </p>
          </div>
          <div className="px-5 pt-6 pb-2 border-b md:space-y-2">
            <p className="text-[#727272]">Middle Name</p>
            <p className="outline-none text-[#434343] text-lg w-full">
              {member.profile?.middleName
                ? member?.profile?.middleName?.charAt(0).toUpperCase() +
                  member?.profile?.middleName?.slice(1)
                : "N/A"}
            </p>
          </div>
          <div className="px-5 pt-6 pb-2 border-b md:space-y-2">
            <p className="text-[#727272]">Last Name</p>
            <p className="outline-none text-[#434343] text-lg w-full">
              {member.profile?.lastName
                ? member?.profile?.lastName?.charAt(0).toUpperCase() +
                  member?.profile?.lastName?.slice(1)
                : "N/A"}
            </p>
          </div>
          <div className="px-5 pt-6 pb-2 border-b md:space-y-2">
            <p className="text-[#727272]">Prefix</p>
            <p className="outline-none text-[#434343] text-lg w-full">
              {member.profile?.prefix
                ? member?.profile?.prefix?.charAt(0).toUpperCase() +
                  member?.profile?.prefix?.slice(1)
                : "None"}
            </p>
          </div>
          <div className="px-5 pt-6 pb-2 border-b md:space-y-2">
            <p className="text-[#727272]">Suffix</p>
            <p className="outline-none text-[#434343] text-lg w-full">
              {member?.profile?.suffix
                ? member?.profile?.suffix?.charAt(0).toUpperCase() +
                  member?.profile?.suffix?.slice(1)
                : "None"}
            </p>
          </div>
          <div className="px-5 pt-6 pb-2 border-b md:space-y-2">
            <p className="text-[#727272]">Gender</p>
            <p className="outline-none text-[#434343] text-lg w-full">
              {member.profile?.gender
                ? member?.profile?.gender?.charAt(0).toUpperCase() +
                  member?.profile?.gender?.slice(1)
                : "N/A"}
            </p>
          </div>
          <div className="px-5 pt-6 pb-2 border-b md:space-y-2">
            <p className="text-[#727272]">Date of Birth</p>
            <p className="outline-none text-[#434343] text-lg w-full">
              {member?.profile?.dateOfBirth
                ? formatDate(member.profile.dateOfBirth)
                : "N/A"}
            </p>
          </div>
          <div className="px-5 pt-6 pb-2 border-b md:space-y-2">
            <p className="text-[#727272]">Marital Status</p>
            <p className="outline-none text-[#434343] text-lg w-full">
              {member?.profile?.maritalStatus
                ? member?.profile?.maritalStatus
                : "N/A"}
            </p>
          </div>

          <div className="px-5 pt-6 pb-2 border-b md:space-y-2">
            <p className="text-[#727272]">Educational Level</p>
            <p className="outline-none text-[#434343] text-lg w-full">
              {member?.profile?.educationalLevel
                ? member?.profile?.educationalLevel?.charAt(0).toUpperCase() +
                  member?.profile?.educationalLevel?.slice(1)
                : "Undefined"}
            </p>
          </div>
          <div className="px-5 pt-6 pb-2 border-b md:space-y-2">
            <p className="text-[#727272]">Employment Status</p>
            <p className="outline-none text-[#434343] text-lg w-full">
              {member.profile?.employmentStatus
                ? member?.profile?.employmentStatus?.charAt(0).toUpperCase() +
                  member?.profile?.employmentStatus?.slice(1)
                : "Undefined"}
            </p>
          </div>
          <div className="px-5 pt-6 pb-2 border-b md:space-y-2">
            <p className="text-[#727272]">Health Status</p>
            <p className="outline-none text-[#434343] text-lg w-full">
              {member.profile?.healthStatus
                ? member?.profile?.healthStatus?.charAt(0).toUpperCase() +
                  member?.profile?.healthStatus?.slice(1)
                : "Undefined"}
            </p>
          </div>
          <button
            className="self-end mt-4 bg-[#17275B] text-white px-4 py-2 rounded-lg gap-2 justify-center"
            onClick={() =>
              navigate(
                `/admin/directory/member/contact-information?id=${memberId}`
              )
            }>
            <p className="text-lg">Next</p>
          </button>
        </div>
      ) : (
        // A Skeleton loader to show while the data is being fetched
        <div className="space-y-4 my-4">
          <div className="h-8 bg-gray-200 animate-pulse rounded-lg shimmer"></div>
          <div className="h-8 bg-gray-200 animate-pulse rounded-lg shimmer"></div>
          <div className="h-8 bg-gray-200 animate-pulse rounded-lg shimmer"></div>
          <div className="h-8 bg-gray-200 animate-pulse rounded-lg shimmer"></div>
          <div className="h-8 bg-gray-200 animate-pulse rounded-lg shimmer"></div>
          <div className="h-8 bg-gray-200 animate-pulse rounded-lg shimmer"></div>
          <div className="h-8 bg-gray-200 animate-pulse rounded-lg shimmer"></div>
          <div className="h-8 bg-gray-200 animate-pulse rounded-lg shimmer"></div>
          <div className="h-8 bg-gray-200 animate-pulse rounded-lg shimmer"></div>
          <div className="h-8 bg-gray-200 animate-pulse rounded-lg shimmer"></div>
        </div>
      )}
    </div>
  );
};

export default PersonalInformation;

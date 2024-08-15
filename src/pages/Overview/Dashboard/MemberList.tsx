/* eslint-disable @typescript-eslint/no-explicit-any */
import { NameFormatter } from "@/utils/name_formatter";
import { useState } from "react";
import MemberTable from "../../../ui/Table/DashboardTable";
// import { DataType } from "../../../hooks/Member/useMemberStats";

interface TimeLine {
  data: any;
  isLoading: boolean;
  isRefetching: boolean;
}

const MemberList: React.FC<TimeLine> = ({ data, isLoading, isRefetching }) => {
  const members = data?.MembersJoined.members;
  const items = [
    { name: "All" },
    { name: "First Timers" },
    { name: "Upcoming Birthday" },
  ];
  const [active, setActive] = useState<string>("All");
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;

  const isFirstTimer = (dateJoined: string) => {
    // get the date the member joined
    const date = new Date(dateJoined);
    // get the month the member joined
    const month = date.getMonth() + 1;
    // get the year the member joined
    const year = date.getFullYear();
    // get the current year
    const currentYear = currentDate.getFullYear();
    // check if the member joined in the past 2 months and the year is the current year
    if (
      currentYear === year &&
      month >= currentMonth - 2 &&
      month <= currentMonth
    )
      return true;
  };

  const isUpcomingBirthday = (birthday: string) => {
    const date = new Date(birthday);
    const birthdayMonth = date.getMonth() + 1;
    const birthdayDay = date.getDate();
    const currentDay = currentDate.getDate();
    const currentYear = date.getFullYear();
    // check if the birthday is in the current year and the month is the current month and the day is greater than the current day
    if (
      currentYear === date.getFullYear() &&
      birthdayMonth === currentMonth &&
      birthdayDay > currentDay
    )
      return true;
  };

  const firstTimers = members?.filter(
    (member: { dateJoined: string }) => isFirstTimer(member.dateJoined) === true
  );

  const birthdayCelebrants = members?.filter(
    (member: { dateOfBirth: string }) =>
      isUpcomingBirthday(member.dateOfBirth) === true
  );

  return (
    <>
      <div className="flex justify-between font-medium mt-10">
        <ul className="border flex border-[#CBCBCB] text-[#636363] rounded-[5px] sm:w-auto ">
          {items.map((item: { name: string }, index: number) => (
            <li
              className={`p-3 ${
                items.length - 1 !== index && "border-r"
              } cursor-pointer text-sm sm:text-base w-full sm:w-auto ${
                active === item.name && "bg-[#E3F2FE] text-[#268DE9]"
              }  ${
                (item.name === "Upcoming Birthday" ||
                  item.name === "First Timers") &&
                "whitespace-nowrap"
              }`}
              onClick={() => {
                setActive(item.name);
                console.log(firstTimers);
              }}>
              {item.name}
            </li>
          ))}
        </ul>
      </div>
      {/* component 5 closed */}
      <div>
        <div className="sm:grid grid-cols-9 gap-4 border mt-10 border-b-0 py-3 text-[#A3AED0] hidden pl-2">
          <div className="col-span-2">Name</div>
          <div className="col-span-1">Gender</div>
          <div className="col-span-2">Phone Number</div>
          <div className="col-span-3 xl:col-span-2">Email</div>
          <div className="col-span-1 hidden xl:block">DOB</div>
          <div className="col-span-1">Status</div>
          {/* Example data */}
        </div>
        <div className="border-t mt-4 border-[#BDBDBD] sm:hidden" />
        {isRefetching || isLoading ? (
          <div className="flex justify-center items-center flex-col h-60 mt-2">
            {/* An array of shimmer block */}
            {Array(5)
              .fill(0)
              .map((_, index) => (
                <div
                  key={index}
                  className="h-10 w-full bg-[#F0F0F0] rounded mb-2 shimmer"
                />
              ))}
          </div>
        ) : (
          <>
            {active === "All" &&
              members &&
              members?.map(
                (
                  member: {
                    id: string;
                    firstName: string;
                    lastName: string;
                    gender: string;
                    email: string;
                    phone: string;
                    dateOfBirth: string;
                    maritalStatus: string;
                    age: number;
                    dateJoined: string;
                  },
                  index: number
                ) => (
                  <MemberTable
                    length={members.length}
                    index={index}
                    first_name={NameFormatter(
                      member.firstName,
                      member.lastName
                    )}
                    dateOfBirth={member.dateOfBirth?.slice(0, 10)}
                    gender={member.gender}
                    email={member.email}
                    phone={member.phone}
                    maritalStatus={member.maritalStatus}
                    id={member.id}
                  />
                )
              )}
            {active === "First Timers" &&
              firstTimers &&
              firstTimers?.map((item: any, index: number) => (
                <MemberTable
                  length={firstTimers.length}
                  index={index}
                  first_name={NameFormatter(item.firstName, item.lastName)}
                  dateOfBirth={item.dateOfBirth?.slice(0, 10)}
                  gender={item.gender}
                  email={item.email}
                  phone={item.phone}
                  maritalStatus={item.maritalStatus}
                  id={item.id}
                />
              ))}
            {active === "First Timers" &&
              firstTimers &&
              firstTimers.length === 0 && (
                <p className="text-[#CACACA] mt-2">
                  No first timer's at the moment
                </p>
              )}
            {active === "Upcoming Birthday" &&
              birthdayCelebrants &&
              birthdayCelebrants?.map((item: any, index: number) => (
                <MemberTable
                  length={birthdayCelebrants.length}
                  index={index}
                  first_name={NameFormatter(item.firstName, item.lastName)}
                  dateOfBirth={item.dateOfBirth?.slice(0, 10)}
                  gender={item.gender}
                  email={item.email}
                  maritalStatus={item.maritalStatus}
                  phone={item.phone}
                  id={item.id}
                />
              ))}
            {active === "Upcoming Birthday" &&
              birthdayCelebrants &&
              birthdayCelebrants.length === 0 && (
                <p className="text-[#CACACA] mt-2">
                  No upcoming birthday's at the moment
                </p>
              )}
          </>
        )}
      </div>
    </>
  );
};

export default MemberList;

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import useGetAllMembers from "../../../hooks/Member/useGetAllMembers";
import * as XLSX from 'xlsx';

const MemberList = () => {
  const { data: members } = useGetAllMembers({page:1, pageSize: 100000});
  const items = [
    { name: "All" },
    { name: "First Timers" },
    { name: "Upcoming Anniversary" },
    { name: "Upcoming Birthday" },
  ];
  const [active, setActive] = useState<string>("All");
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;

  const isFirstTimer = (dateJoined: string) => {
    const date = new Date(dateJoined);
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const currentYear = date.getFullYear();

    if (year === currentYear) {
      if (month === currentMonth) return true;
    }

    return false;
  };

  const isBirthday = (birthday: string) => {
    const date = new Date(birthday);
    const birthdayMonth = date.getMonth() + 1;
    if (currentMonth === birthdayMonth) return true;
    return false;
  };

  const isAnniversary = (anniversary: string) => {
    const date = new Date(anniversary);
    const anniversaryMonth = date.getMonth() + 1;
    if (currentMonth === anniversaryMonth) return true;
    return false;
  };

  const firstTimers = members?.filter(
    (member: { dateJoined: string }) => isFirstTimer(member.dateJoined) === true
  );

  const birthdayCelebrants = members?.filter(
    (member: { dateOfBirth: string }) => isBirthday(member.dateOfBirth) === true
  );

  const upcomingAnniversary = members?.filter(
    (member: { anniversary: string }) =>
      isAnniversary(member.anniversary) === true
  );

  const handleOnExport = () => {
    const wb = XLSX.utils.book_new(),
      ws = XLSX.utils.json_to_sheet(members ? members : [{}]);
    XLSX.utils.book_append_sheet(wb, ws, "My Sheet !");
    XLSX.writeFile(wb, "MyExcel.xlsx");
  };

  return (
    <>
      <div className="flex justify-between font-medium mt-10">
        <ul className="border flex border-[#CBCBCB] text-[#636363] rounded-[5px]">
          {items.map((item: { name: string }, index: number) => (
            <li
              className={`p-3 ${
                items.length - 1 !== index && "border-r"
              } cursor-pointer ${
                active === item.name && "bg-[#E3F2FE] text-[#268DE9]"
              }`}
              onClick={() => {
                setActive(item.name);
                console.log(firstTimers);
              }}
            >
              {item.name}
            </li>
          ))}
        </ul>
        <button
          className="bg-[#758CD7] text-white  px-4 py-2 rounded-md"
          onClick={handleOnExport}
        >
          Export Data
        </button>
        {/* <CSVLink data={members ? members : []}>export data</CSVLink> */}
      </div>
      {/* component 5 closed */}
      <div>
        <div className="grid grid-cols-9 gap-4 border mt-10 border-b-0 py-3 text-[#A3AED0] pl-2">
          <div className="col-span-2">Name</div>
          <div className="col-span-1">Gender</div>
          <div className="col-span-2">Phone Number</div>
          <div className="col-span-2">Email</div>
          <div className="col-span-1">DOB</div>
          <div className="col-span-1">Marital Status</div>
          {/* Example data */}
        </div>
        {active === "All" &&
          members?.map(
            (
              item: {
                fullname: string;
                gender: string;
                phone: { MainPhone: string };
                email: string;
                dateOfBirth: string;
              },
              index: number
            ) => (
              <div
                className={`grid grid-cols-9 gap-4 border-r border-l border-t py-3 pl-2 ${
                  members.length - 1 === index && "border-b"
                }`}
              >
                <div className="col-span-2">{item.fullname}</div>
                <div className="col-span-1">{item.gender}</div>
                <div className="col-span-2">{item.phone.MainPhone}</div>
                <div className="col-span-2">{item.email}</div>
                <div className="col-span-1">
                  {item.dateOfBirth?.slice(0, 10)}
                </div>
                <div className="col-span-1">Single</div>
              </div>
            )
          )}
        {active === "First Timers" &&
          firstTimers?.map((first_timer: any, index: number) => (
            <div
              className={`grid grid-cols-8 gap-4 border-r border-l border-t py-3 pl-2 ${
                firstTimers.length - 1 === index && "border-b"
              }`}
            >
              <div className="col-span-2">{first_timer.fullname}</div>
              <div className="col-span-1">{first_timer.gender}</div>
              <div className="col-span-1">{}</div>
              <div className="col-span-2">{first_timer.email}</div>
              <div className="col-span-1">
                {first_timer.dateOfBirth?.slice(0, 10)}
              </div>
              <div className="col-span-1">Single</div>
            </div>
          ))}
        {active === "Upcoming Birthday" &&
          birthdayCelebrants?.map((celebrants: any, index: number) => (
            <div
              className={`grid grid-cols-8 gap-4 border-r border-l border-t py-3 pl-2 ${
                birthdayCelebrants.length - 1 === index && "border-b"
              }`}
            >
              <div className="col-span-2">{celebrants.fullname}</div>
              <div className="col-span-1">{celebrants.gender}</div>
              <div className="col-span-1">{celebrants.phone.MainPhone}</div>
              <div className="col-span-2">{celebrants.email}</div>
              <div className="col-span-1">
                {celebrants.dateOfBirth?.slice(0, 10)}
              </div>
              <div className="col-span-1">Single</div>
            </div>
          ))}
        {active === "Upcoming Anniversary" &&
          upcomingAnniversary?.map((celebrants: any, index: number) => (
            <div
              className={`grid grid-cols-8 gap-4 border-r border-l border-t py-3 pl-2 ${
                upcomingAnniversary.length - 1 === index && "border-b"
              }`}
            >
              <div className="col-span-2">{celebrants.fullname}</div>
              <div className="col-span-1">{celebrants.gender}</div>
              <div className="col-span-1">{celebrants.phone.MainPhone}</div>
              <div className="col-span-2">{celebrants.email}</div>
              <div className="col-span-1">
                {celebrants.dateOfBirth?.slice(0, 10)}
              </div>
              <div className="col-span-1">Single</div>
            </div>
          ))}
      </div>
    </>
  );
};

export default MemberList;

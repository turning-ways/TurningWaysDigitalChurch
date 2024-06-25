/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import useGetAllMembers from "../../../hooks/Member/useGetAllMembers";
// import * as XLSX from "xlsx";
import MemberTable from "../../../ui/Table/DashboardTable";

const MemberList = () => {
  const { data: members } = useGetAllMembers({ page: 1, pageSize: 100000 });
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

  // const handleOnExport = () => {
  //   const selectedMembers = members
  //     ? members.map((member) => ({
  //         ServiceUnit: member.ServiceUnit,
  //         WorkerStatus: member.WorkerStatus,
  //         accessPermission: member.accessPermission,
  //         age: member.age,
  //         anniversary: member.anniversary,
  //         dateJoined: member.dateJoined,
  //         dateOfBirth: member.dateOfBirth,
  //         email: member.email,
  //         first_name: member.first_name,
  //         fullname: member.fullname,
  //         gender: member.gender,
  //       }))
  //     : [{}];

  //   const wb = XLSX.utils.book_new(),
  //     ws = XLSX.utils.json_to_sheet(selectedMembers);
  //   XLSX.utils.book_append_sheet(wb, ws, "My Sheet !");
  //   XLSX.writeFile(wb, "MyExcel.xlsx");
  // };

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
              } ${item.name === "Upcoming Anniversary" && "hidden sm:block"} ${
                (item.name === "Upcoming Birthday" ||
                  item.name === "First Timers") &&
                "whitespace-nowrap"
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
        {/* <button
          className="bg-[#758CD7] text-white  px-4 py-2 rounded-md hidden md:block"
          onClick={handleOnExport}
        >
          Export Data
        </button> */}
        {/* <CSVLink data={members ? members : []}>export data</CSVLink> */}
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
        {active === "All" &&
          members &&
          members?.map(
            (
              item: {
                fullname: string;
                gender: string;
                phone: { MainPhone: string };
                email: string;
                first_name: string;
                dateOfBirth: string;
                _id: string;
              },
              index: number
            ) => (
              <MemberTable
                length={members.length}
                index={index}
                first_name={item.first_name}
                dateOfBirth={item.dateOfBirth?.slice(0, 10)}
                gender={item.gender}
                email={item.email}
                phone={item.phone.MainPhone}
                id={item._id}
              />
            )
          )}
        {active === "First Timers" &&
          firstTimers &&
          firstTimers?.map((item: any, index: number) => (
            <MemberTable
              length={firstTimers.length}
              index={index}
              first_name={item.first_name}
              dateOfBirth={item.dateOfBirth?.slice(0, 10)}
              gender={item.gender}
              email={item.email}
              phone={item.phone.MainPhone}
              id={item._id}
            />
          ))}
        {active === "Upcoming Birthday" &&
          birthdayCelebrants &&
          birthdayCelebrants?.map((item: any, index: number) => (
            <MemberTable
              length={birthdayCelebrants.length}
              index={index}
              first_name={item.first_name}
              dateOfBirth={item.dateOfBirth?.slice(0, 10)}
              gender={item.gender}
              email={item.email}
              phone={item.phone.MainPhone}
              id={item._id}
            />
          ))}
        {active === "Upcoming Anniversary" &&
          upcomingAnniversary &&
          upcomingAnniversary?.map((item: any, index: number) => (
            <MemberTable
              length={upcomingAnniversary.length}
              index={index}
              first_name={item.first_name}
              dateOfBirth={item.dateOfBirth?.slice(0, 10)}
              gender={item.gender}
              email={item.email}
              phone={item.phone.MainPhone}
              id={item._id}
            />
          ))}
      </div>
    </>
  );
};

export default MemberList;

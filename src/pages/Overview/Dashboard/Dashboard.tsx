/* eslint-disable @typescript-eslint/no-explicit-any */
import { MdCalendarToday } from "react-icons/md";
import { MdOutlineNextWeek } from "react-icons/md";
import { IoCalendarOutline } from "react-icons/io5";
import { TbCloudSearch } from "react-icons/tb";
import { LuCalendarDays } from "react-icons/lu";
import { IoFilter } from "react-icons/io5";
import Header from "../Header";
import OverviewContainer from "../OverviewContainer";
import MembershipDataBar from "./MembershipDataBar";
import useGetAllMembers from "../../../hooks/Member/useGetAllMembers";

const Dashboard = () => {
  const { data: members } = useGetAllMembers();
  return (
    <OverviewContainer active="Dashboard">
      <Header text="Dashboard" />

      {/* component 2 */}
      <ul className="mt-10 flex">
        <li className="px-6 border-b-4 border-b-[#446DE3] text-[#446DE3] flex items-center space-x-2 cursor-pointer">
          <MdCalendarToday />
          <p>Today</p>
        </li>
        <li className="px-6 border-b-4 flex items-center space-x-2 cursor-pointer">
          <MdOutlineNextWeek />
          <p>Next week</p>
        </li>
        <li className="px-6 border-b-4 flex items-center space-x-2 cursor-pointer">
          <IoCalendarOutline />
          <p>Last Month</p>
        </li>
        <li className="px-6 border-b-4 flex items-center space-x-2 cursor-pointer">
          <TbCloudSearch />
          <p>Last Quarter</p>
        </li>
        <li className="px-6 border-b-4 flex items-center space-x-2 cursor-pointer">
          <LuCalendarDays />
          <p>YTD</p>
        </li>
        <li className="px-6 border-b-4 flex items-center space-x-2 cursor-pointer">
          <IoFilter />
          <p>Filter</p>
        </li>
      </ul>
      {/* component 2 closed */}
      {/* component 3 */}
      <div className="mt-10 flex space-x-14 h-28">
        <div className="flex rounded-[10px] w-48 overflow-hidden shadow-md">
          <div className="w-2 bg-red-100" />
          <div className=" py-3 px-3 flex flex-col items-center justify-center flex-grow space-y-1">
            <p>Total Membership</p>
            <p className="text-3xl">{members && members.length}</p>
          </div>
        </div>
        <div className="flex rounded-[10px] w-48 overflow-hidden shadow-md">
          <div className="w-2 bg-green-500" />
          <div className=" py-3 px-3 flex flex-col items-center justify-center flex-grow space-y-1">
            <p>Verified Members</p>
            <p className="text-3xl">108</p>
          </div>
        </div>
        <div className="flex rounded-[10px] w-48 overflow-hidden shadow-md">
          <div className="w-2 bg-blue-700" />
          <div className=" py-3 px-3 flex flex-col items-center justify-center flex-grow space-y-1">
            <p>Unverified Members</p>
            <p className="text-3xl">108</p>
          </div>
        </div>
        <div className="flex rounded-[10px] w-48 overflow-hidden shadow-md">
          <div className="w-2 bg-yellow-500" />
          <div className=" py-3 px-3 flex flex-col justify-center items-center flex-grow space-y-1">
            <p>Church Workers</p>
            <p className="text-3xl">108</p>
          </div>
        </div>
      </div>
      {/* component 3 closed */}
      {/* component 4 */}
      <div className="mt-10 border border-secondary w-fit px-4 pt-6 rounded-[20px]">
        <div className="h-52 mb-14">
          <p className="text-xl text-[#2B3674]">Membership data</p>
          <p className="text-[#BABEC6]">New members added</p>
          <MembershipDataBar />
        </div>
      </div>
      {/* component 4 closed */}
      {/* component 5 */}
      <div className="flex justify-between font-medium mt-10">
        <ul className="border flex border-[#CBCBCB] text-[#636363]">
          <li className="border-r p-2 ">All</li>
          <li className="border-r p-2">First Timers</li>
          <li className="border-r p-2">Upcoming Anniversary</li>
          <li className="border-r p-2">Upcoming Birthday</li>
        </ul>
        <button
          className="bg-[#758CD7] text-white  px-4 py-2 rounded-md"
          onClick={() => console.log(members)}
        >
          Export Data
        </button>
      </div>
      {/* component 5 closed */}
      <div>
        <div className="grid grid-cols-8 gap-4 border mt-10 border-b-0 py-3 text-[#A3AED0]">
          <div className="col-span-2">Name</div>
          <div className="col-span-1">Gender</div>
          <div className="col-span-1">Phone Number</div>
          <div className="col-span-2">Email</div>
          <div className="col-span-1">DOB</div>
          <div className="col-span-1">Marital Status</div>
          {/* Example data */}
        </div>
        {members &&
          members.map((item: any, index: number) => (
            <div
              className={`grid grid-cols-8 gap-4 border-r border-l border-t py-3 ${
                members.length - 1 === index && "border-b"
              }`}
            >
              <div className="col-span-2">{item.fullname}</div>
              <div className="col-span-1">{item.gender}</div>
              <div className="col-span-1">{item.phone.MainPhone}</div>
              <div className="col-span-2">{item.email}</div>
              <div className="col-span-1">31/01/2005</div>
              <div className="col-span-1">Single</div>
            </div>
          ))}
      </div>
    </OverviewContainer>
  );
};

export default Dashboard;

import Navbar from "../../components/Navbar/Navbar";
import { CiSearch } from "react-icons/ci";
import { IoIosAddCircleOutline } from "react-icons/io";
import { IoMdNotificationsOutline } from "react-icons/io";
import { MdCalendarToday } from "react-icons/md";
import { MdOutlineNextWeek } from "react-icons/md";
import { IoCalendarOutline } from "react-icons/io5";
import { TbCloudSearch } from "react-icons/tb";
import { LuCalendarDays } from "react-icons/lu";
import { IoFilter } from "react-icons/io5";

const Dashboard = () => {
  return (
    <div className="flex">
      <Navbar />
      {/* component */}
      <div className="p-10 flex-grow">
        <div className="space-y-5 font-azo">
          <h1 className="tracking-widest">Winner's Chapel</h1>
          <div className="flex justify-between items-center">
            <h2 className="font-azoBold text-[#0F1D48] text-3xl">Dashboard</h2>
            <div className="flex space-x-5 items-center">
              <div className="rounded-2xl bg-[#F2F0F0] flex py-2 px-3 gap-x-3 items-center h-fit w-[470px]">
                <CiSearch style={{ fontSize: "29px", color: "#6D6C6C" }} />
                <input
                  type="text"
                  placeholder="search "
                  className="bg-transparent outline-none placeholder-[#6D6C6C]"
                />
              </div>
              <IoIosAddCircleOutline style={{ fontSize: "45px" }} />
              <IoMdNotificationsOutline style={{ fontSize: "45px" }} />
              <div className="flex space-x-2 items-center">
                <div className="bg-black w-10 h-10 rounded-full " />
                <div>
                  <p>Administrator</p>
                  <p>Olamide</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* component closed */}

        {/* component 2 */}
        <ul className="mt-10 flex">
          <li className="px-6 border-b-4 border-b-[#446DE3] text-[#446DE3] flex items-center space-x-2">
            <MdCalendarToday />
            <p>Today</p>
          </li>
          <li className="px-6 border-b-4 flex items-center space-x-2">
            <MdOutlineNextWeek />
            <p>Next week</p>
          </li>
          <li className="px-6 border-b-4 flex items-center space-x-2">
            <IoCalendarOutline />
            <p>Last Month</p>
          </li>
          <li className="px-6 border-b-4 flex items-center space-x-2">
            <TbCloudSearch />
            <p>Last Quarter</p>
          </li>
          <li className="px-6 border-b-4 flex items-center space-x-2">
            <LuCalendarDays />
            <p>YTD</p>
          </li>
          <li className="px-6 border-b-4 flex items-center space-x-2">
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
              <p className="text-3xl">108</p>
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
        <div className="mt-10 border border-secondary w-fit p-3 rounded-[20px]">
          <div>
            <p className="text-xl text-[#2B3674]">Membership data</p>
            <p className="text-[#BABEC6]">New members added</p>
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
          <button className="bg-[#758CD7] text-white  px-4 py-2 rounded-md">
            Export Date
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
          <div className="grid grid-cols-8 gap-4 border py-3">
            <div className="col-span-2">Temidire Owoeye</div>
            <div className="col-span-1">Male</div>
            <div className="col-span-1">09073210998</div>
            <div className="col-span-2">temidireowoeye@gmail.com</div>
            <div className="col-span-1">31/01/2005</div>
            <div className="col-span-1">Single</div>
            {/* Example data */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

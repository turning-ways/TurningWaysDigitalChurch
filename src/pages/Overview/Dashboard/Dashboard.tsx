import { useEffect, Suspense, lazy, useState } from "react";
import { MdCalendarToday, MdOutlineNextWeek } from "react-icons/md";
import { IoCalendarOutline } from "react-icons/io5";
import { TbCloudSearch } from "react-icons/tb";
import Header from "../Header";
import OverviewContainer from "../OverviewContainer";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import useMemberStats from "../../../hooks/Member/useMemberStats";

// Lazy load components to improve initial load time
const MembershipDataBar = lazy(() => import("./BarChart/MembershipDataBar"));
const AgeDistrBar = lazy(() => import("./BarChart/AgeDistrBar"));
const PieChart = lazy(() => import("./PieChart/PieChart"));
const MemberList = lazy(() => import("./MemberList"));

const calculatePercentage = (num: number, total: number): number => {
  const percentage = (num / total) * 100;
  return parseFloat(percentage.toFixed(1)) === 0
    ? 0.1
    : parseFloat(percentage.toFixed(1));
};

const Dashboard = () => {
  const [isRefetching, setIsRefetching] = useState(false);

  const getData = [
    { icon: <MdCalendarToday />, title: "Till Date", id: "today" },
    { icon: <MdOutlineNextWeek />, title: "Last Week", id: "lastWeek" },
    { icon: <IoCalendarOutline />, title: "Last Month", id: "lastMonth" },
    { icon: <TbCloudSearch />, title: "Last Quarter", id: "lastQuarter" },
  ];

  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const { date } = params;
  const { data: memberStatsData, refetch, isLoading } = useMemberStats(date);

  useEffect(() => {
    const fetchData = async () => {
      setIsRefetching(true);
      await refetch();
      setIsRefetching(false);
    };

    fetchData();
  }, [date, refetch]);

  return (
    <OverviewContainer active="Dashboard">
      <Header text="Dashboard" />

      {/* Navigation Tabs */}
      <ul className="mt-10 flex">
        {getData.map((item, i) => (
          <li
            className={`md:px-4 w-full lg:w-fit border-b-4 text-sm md:text-md ${
              location.pathname === "/admin/dashboard/" + item.id
                ? "border-b-[#446DE3] text-[#446DE3]"
                : "border-b-[#B6B5B5] text-[#B6B5B5]"
            } items-center cursor-pointer ${
              item.id === "ytd" ? "hidden md:flex" : "flex"
            } ${item.id === "lastQuarter" ? "hidden sm:flex" : "flex"}`}
            key={i}
            onClick={() => navigate("/admin/dashboard/" + item.id)}>
            {item.icon}
            <p className="ml-2">{item.title}</p>
          </li>
        ))}
      </ul>

      {/* Statistics Cards */}
      <div className="mt-10 grid gap-6 text-[#999DA4] grid-cols-[150px,150px] min-[480px]:grid-cols-[130px,130px,130px] max-[600px]: sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 px-2 justify-center">
        {[
          {
            label: "Total Members",
            value: memberStatsData?.MembersJoined.length ?? 0,
            color: "#F2CCCC",
          },
          {
            label: "Verified",
            value: memberStatsData?.MembersJoined.verifiedCount ?? 0,
            color: "#CFF4CF",
          },
          {
            label: "Unverified",
            value: memberStatsData?.MembersJoined.unverifiedCount ?? 0,
            color: "#CCCCFF",
          },
          {
            label: "Active Members",
            value: memberStatsData?.MembersJoined.activeMembers ?? 0,
            color: "#F8F8CC",
          },
          {
            label: "Contacts",
            value: memberStatsData?.MembersJoined.noOfContacts ?? 0,
            color: "#E2CCE2",
          },
        ].map(({ label, value, color }, i) => (
          <div
            key={i}
            className="flex rounded-[10px] overflow-hidden custom-box-shadow">
            <div className={`w-2 bg-[${color}]`} />
            <div className="py-3 px-3 flex flex-col items-center justify-center flex-grow space-y-1">
              <p className="text-sm lg:text-base text-center">{label}</p>
              {isRefetching ? (
                <div className="w-20 h-8 rounded shimmer" />
              ) : (
                <p className="text-2xl lg:text-3xl text-[#0F123F]">{value}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Charts and Graphs */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-6 justify-items-center sm:justify-between">
        <div className="mt-10 border border-secondary w-full px-4 pt-6 rounded-[20px]">
          <div className="h-44 mb-20">
            <p className="text-xl text-[#2B3674]">Membership data</p>
            <p className="text-[#BABEC6] mb-4">Monthly trend</p>
            <Suspense fallback={<div>Loading...</div>}>
              <MembershipDataBar
                data={memberStatsData}
                isLoading={isLoading}
                isRefetching={isRefetching}
              />
            </Suspense>
          </div>
        </div>

        <div className="mt-10 border border-secondary w-full px-4 pt-6 rounded-[20px]">
          <div className="h-44 mb-20">
            <p className="text-xl text-[#2B3674] mb-10">Age Distribution</p>
            <Suspense fallback={<div>Loading...</div>}>
              <AgeDistrBar
                data={memberStatsData}
                isLoading={isLoading}
                isRefetching={isRefetching}
              />
            </Suspense>
          </div>
        </div>

        <div className="mt-10 w-full px-4 pt-6 rounded-[20px] bg-[#F6F8FA]">
          <div className="flex flex-col">
            <p className="text-xl text-[#2B3674] mb-3">Gender Distribution</p>
            <div className="w-[200px] self-center">
              <Suspense fallback={<div>Loading...</div>}>
                <PieChart sdata={memberStatsData} isRefetching={isRefetching} />
              </Suspense>
            </div>
            {isRefetching ? (
              <div className="flex justify-center mt-4 py-4">
                <div className="w-48 h-8 rounded shimmer" />
              </div>
            ) : (
              <div className="flex bg-white justify-center gap-x-3 py-2 my-3 rounded-[15px]">
                {["male", "female"].map((gender) => (
                  <div key={gender}>
                    <div className="flex gap-x-2">
                      <div
                        className={`w-2 h-2 bg-[${
                          gender === "male" ? "#758CD7" : "#A0D7AB"
                        }] rounded-full`}
                      />
                      <p className="text-[#A3AED0]">
                        {gender.charAt(0).toUpperCase() + gender.slice(1)}
                      </p>
                    </div>
                    <p className="text-right text-[#2B3674] text-[18px] font-azoBold">
                      {memberStatsData?.MembersJoined?.genderCount?.[
                        gender as keyof typeof memberStatsData.MembersJoined.genderCount
                      ] &&
                        calculatePercentage(
                          memberStatsData?.MembersJoined?.genderCount?.[
                            gender as keyof typeof memberStatsData.MembersJoined.genderCount
                          ] ?? 0,
                          memberStatsData?.MembersJoined.length ?? 0
                        ) + "%"}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Member List */}
      <Suspense fallback={<div>Loading...</div>}>
        <MemberList
          isLoading={isLoading}
          data={memberStatsData}
          isRefetching={isRefetching}
        />
      </Suspense>

      {/* Loading Spinner
      {(isLoading || isRefetching) && (
        <Modal onClose={() => console.log("restricted")} className="">
          <ThreeDots color="white" />
        </Modal>
      )} */}
    </OverviewContainer>
  );
};

export default Dashboard;

/* eslint-disable @typescript-eslint/no-explicit-any */
import { MdCalendarToday } from "react-icons/md";
import { MdOutlineNextWeek } from "react-icons/md";
import { IoCalendarOutline } from "react-icons/io5";
import { TbCloudSearch } from "react-icons/tb";
import Header from "../Header";
import OverviewContainer from "../OverviewContainer";
import MembershipDataBar from "./BarChart/MembershipDataBar";
import AgeDistrBar from "./BarChart/AgeDistrBar";
import { PieChart } from "./PieChart/PieChart";
import MemberList from "./MemberList";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import useMemberStats from "../../../hooks/Member/useMemberStats";
import { useEffect } from "react";
import Modal from "../../../ui/Modal/Modal";
import { ThreeDots } from "react-loader-spinner";

const calculatePercentage = (num: number, total: number): number => {
	const percentage = (num / total) * 100;
	return parseFloat(percentage.toFixed(1)) === 0 ? 0.1 : parseFloat(percentage.toFixed(1));
};

const Dashboard = () => {
	const getData = [
		{
			icon: <MdCalendarToday />,
			title: "Till Date",
			id: "today",
		},
		{
			icon: <MdOutlineNextWeek />,
			title: "Last Week",
			id: "lastWeek",
		},
		{
			icon: <IoCalendarOutline />,
			title: "Last Month",
			id: "lastMonth",
		},
		{
			icon: <TbCloudSearch />,
			title: "Last Quarter",
			id: "lastQuarter",
		},
		// {
		//   icon: <LuCalendarDays />,
		//   title: "YTD",
		//   id: "ytd",
		// },
	];

	const navigate = useNavigate();
	const location = useLocation();
	const params = useParams();
	const { date } = params;
	const memberStatsQuery = useMemberStats(date);
	console.log(memberStatsQuery, memberStatsQuery.data, "memberStatsQuery");

	useEffect(() => {
		// Call useMemberStats again with the updated date
		memberStatsQuery.refetch();
	}, [date, memberStatsQuery]);

	// const { data: memberCount } = useMemberStats(active);
	return (
		<OverviewContainer active="Dashboard">
			<Header text="Dashboard" />

			{/* component 2 */}
			<ul className="mt-10 flex">
				{getData.map((item, i) => (
					<li
						className={`md:px-4 w-full lg:w-fit border-b-4 text-sm md:text-md  ${
							location.pathname === "/admin/dashboard/" + item.id
								? "border-b-[#446DE3] text-[#446DE3]"
								: "border-b-[#B6B5B5] text-[#B6B5B5]"
						} items-center cursor-pointer ${item.id === "ytd" ? "hidden md:flex" : "flex "} ${
							item.id === "lastQuarter" ? "hidden sm:flex" : "flex "
						}`}
						key={i}
						onClick={() => {
							navigate("/admin/dashboard/" + item.id);
						}}>
						{item.icon}
						<p className="ml-2">{item.title}</p>
					</li>
				))}
			</ul>
			{/* component 2 closed */}
			{/* component 3 */}
			<div
				className="mt-10 grid gap-6 text-[#999DA4] 
  grid-cols-[150px,150px] min-[480px]:grid-cols-[130px,130px,130px] max-[600px]: sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 px-2 justify-center">
				<div className="flex rounded-[10px] overflow-hidden custom-box-shadow">
					<div className="w-2 bg-[#F2CCCC]" />
					<div className="py-3 px-3 flex flex-col items-center justify-center flex-grow space-y-1">
						<p className="text-sm lg:text-base text-center">Total Members</p>
						<p className="text-2xl lg:text-3xl text-[#0F123F]">
							{memberStatsQuery.data?.MembersJoined.length ?? 0}
						</p>
					</div>
				</div>
				<div className="flex rounded-[10px] overflow-hidden custom-box-shadow">
					<div className="w-2 bg-[#CFF4CF]" />
					<div className="py-3 px-3 flex flex-col items-center justify-center flex-grow space-y-1">
						<p className="text-sm lg:text-base text-center">Verified</p>
						<p className="text-2xl lg:text-3xl text-[#0F123F]">
							{memberStatsQuery.data?.MembersJoined.verifiedCount ?? 0}
						</p>
					</div>
				</div>
				<div className="flex rounded-[10px] overflow-hidden custom-box-shadow">
					<div className="w-2 bg-[#CCCCFF]" />
					<div className="py-3 px-3 flex flex-col items-center justify-center flex-grow space-y-1">
						<p className="text-sm lg:text-base text-center">Unverified</p>
						<p className="text-2xl lg:text-3xl text-[#0F123F]">
							{memberStatsQuery.data?.MembersJoined.unverifiedCount ?? 0}
						</p>
					</div>
				</div>
				<div className="flex rounded-[10px] overflow-hidden custom-box-shadow">
					<div className="w-2 bg-[#F8F8CC]" />
					<div className="py-3 px-3 flex flex-col justify-center items-center flex-grow space-y-1">
						<p className="text-sm lg:text-base text-center">Active Members</p>
						<p className="text-2xl lg:text-3xl text-[#0F123F]">
							{memberStatsQuery.data?.MembersJoined.activeMembers ?? 0}
						</p>
					</div>
				</div>
				<div className="flex rounded-[10px] overflow-hidden custom-box-shadow">
					<div className="w-2 bg-[#E2CCE2]" />
					<div className="py-3 px-3 flex flex-col justify-center items-center flex-grow space-y-1">
						<p className="text-sm lg:text-base text-center">Contacts</p>
						<p className="text-2xl lg:text-3xl text-[#0F123F]">
							{memberStatsQuery.data?.MembersJoined.noOfContacts ?? 0}
						</p>
					</div>
				</div>
			</div>
			{/* component 3 closed */}
			{/* component 4 */}
			<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-6 justify-items-center sm:justify-between">
				<div className="mt-10 border border-secondary w-full px-4 pt-6 rounded-[20px]">
					<div className="h-44 mb-20">
						<p className="text-xl text-[#2B3674]">Membership data</p>
						<p className="text-[#BABEC6] mb-4">Monthly trend</p>
						<MembershipDataBar timeLine={date ?? ""} />
					</div>
				</div>
				{/* {members?.length !== 1 &&
          memberStatsQuery.data?.["members-count"] !== 0 && ( */}
				<div className="mt-10 border border-secondary w-full px-4 pt-6 rounded-[20px]">
					<div className="h-44 mb-20">
						<p className="text-xl text-[#2B3674] mb-10">Age Distribution</p>
						<AgeDistrBar timeLine={date ?? ""} />
					</div>
				</div>
				{/* )} */}
				{/* {members?.length !== 1 &&
          memberStatsQuery.data?.["members-count"] !== 0 && ( */}
				<div className="mt-10 w-full px-4  pt-6 rounded-[20px] bg-[#F6F8FA]">
					<div className=" flex flex-col">
						<p className="text-xl text-[#2B3674] mb-3">Gender Distribution</p>
						<div className="w-[200px] self-center">
							<PieChart timeLine={date ?? ""} />
						</div>
						<div className="flex bg-white justify-center gap-x-3 py-2 my-3 rounded-[15px]">
							<div>
								<div className="flex gap-x-2">
									<div className="w-2 h-2 bg-[#758CD7] rounded-full" />
									<p className="text-[#A3AED0]">Male</p>
								</div>
								<p className="text-right text-[#2B3674] text-[18px] font-azoBold">
									{(memberStatsQuery?.data?.MembersJoined.genderCount?.["male"] &&
										calculatePercentage(
											memberStatsQuery?.data?.MembersJoined.genderCount?.["male"],
											memberStatsQuery?.data?.MembersJoined.length
										)) + "%"}
								</p>
							</div>
							<div>
								<div className="flex gap-x-2">
									<div className="w-2 h-2 bg-[#A0D7AB] rounded-full" />
									<p className="text-[#A3AED0]">Female</p>
								</div>
								<p className="text-right text-[#2B3674] text-[18px] font-azoBold">
									{(memberStatsQuery?.data?.MembersJoined.genderCount?.["female"] &&
										calculatePercentage(
											memberStatsQuery?.data?.MembersJoined.genderCount?.["female"],
											memberStatsQuery?.data?.MembersJoined.length
										)) + "%"}
								</p>
							</div>
						</div>
					</div>
				</div>
				{/* )} */}
			</div>
			{/* component 4 closed */}
			{/* component 5 */}
			<MemberList timeLine={date ?? ""} />
			{memberStatsQuery.isLoading && (
				<Modal onClose={() => console.log("restricted")} className="">
					<ThreeDots color="blue" />
				</Modal>
			)}
		</OverviewContainer>
	);
};

export default Dashboard;

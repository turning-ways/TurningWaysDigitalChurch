/* eslint-disable @typescript-eslint/no-explicit-any */
import { Bar } from "react-chartjs-2";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";
import React, { useEffect, useState } from "react";
import useMemberStats from "../../../../hooks/Member/useMemberStats";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function getGradient(chart: any) {
	const {
		ctx,
		chartArea: { top, bottom },
	} = chart;
	const gradientSegment = ctx.createLinearGradient(0, top, 0, bottom);
	gradientSegment.addColorStop(0.5, "#3B63E1");
	gradientSegment.addColorStop(1, "#5CA86C");
	return gradientSegment;
}

interface TimeLine {
	timeLine: string;
}

const MembershipDataBar: React.FC<TimeLine> = ({ timeLine }) => {
	const { data, refetch, isLoading } = useMemberStats(timeLine);
	const [loading, setLoading] = useState(true);
	const [previousTimeLine, setPreviousTimeLine] = useState<string | null>(null);

	const getMonth = (date: string) => {
		const dateJoined = new Date(date);
		const monthJoined: number = dateJoined.getMonth() + 1;
		return monthJoined;
	};

	const getMembersJoinedInMonth = (month: number) => {
		const filteredMembers = data?.MembersJoined.members?.filter((member: any) => {
			return getMonth(member.dateJoined) === month;
		});
		return filteredMembers?.length;
	};

	useEffect(() => {
		if (timeLine !== previousTimeLine) {
			setLoading(true);
			refetch().then(() => {
				setLoading(false);
				setPreviousTimeLine(timeLine);
			});
		}
	}, [timeLine, previousTimeLine, refetch]);

	if (loading || isLoading) {
		return (
			<div className="w-full h-full rounded-md bg-gray-200 relative overflow-hidden">
				<div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-[shimmer_1.5s_infinite]"></div>
			</div>
		);
	}

	return (
		<Bar
			options={{
				scales: {
					y: { border: { dash: [4, 4] } },
					x: { grid: { display: false } },
				},
				plugins: {
					legend: {
						display: false,
					},
				},
				maintainAspectRatio: false,
			}}
			data={{
				labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
				datasets: [
					{
						data: [
							getMembersJoinedInMonth(1),
							getMembersJoinedInMonth(2),
							getMembersJoinedInMonth(3),
							getMembersJoinedInMonth(4),
							getMembersJoinedInMonth(5),
							getMembersJoinedInMonth(6),
							getMembersJoinedInMonth(7),
						],
						backgroundColor: (context: any) => {
							const chart = context.chart;
							const { chartArea } = chart;
							if (!chartArea) return null;
							return getGradient(chart);
						},
						borderWidth: 1,
						borderRadius: 100,
						barThickness: 18,
						borderSkipped: false,
					},
				],
			}}
		/>
	);
};

export default MembershipDataBar;

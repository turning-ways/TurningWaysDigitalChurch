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
import useMemberStats from "../../../../hooks/Member/useMemberStats";
import { useEffect, useState } from "react";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface BarProps {
	timeLine: string;
}

const AgeDistrBar: React.FC<BarProps> = ({ timeLine }) => {
	const { data, refetch, isLoading } = useMemberStats(timeLine);
	const [loading, setLoading] = useState(true);
	const [previousTimeLine, setPreviousTimeLine] = useState<string | null>(null);

	const filteredKeys =
		data && data.MembersJoined.ageGroup
			? Object.keys(data.MembersJoined.ageGroup).filter(
					(key) => key !== "71-80" && key !== "81-90" && key !== "91-100"
					// eslint-disable-next-line no-mixed-spaces-and-tabs
			  )
			: [];

	const values = filteredKeys?.map(
		(key) => data?.MembersJoined.ageGroup[key as keyof typeof data.MembersJoined.ageGroup]
	);

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
					y: { border: { dash: [4, 4] }, display: false },
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
				labels: ["0-10", "11-20", "21-30", "30-40", "41-50", "51-60", "61-70"],
				datasets: [
					{
						label: "",
						data: values,
						backgroundColor: "#5CA86C",
						borderWidth: 1,
						borderRadius: 100,
						barThickness: 16,
					},
				],
			}}
		/>
	);
};

export default AgeDistrBar;

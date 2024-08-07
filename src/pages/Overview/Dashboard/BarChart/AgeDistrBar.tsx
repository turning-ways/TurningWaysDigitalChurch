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
// import useMemberStats from "../../../../hooks/Member/useMemberStats";
// import { useEffect, useState } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface BarProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  refetch?: () => void;
  isLoading: boolean;
  isRefetching: boolean;
}

const AgeDistrBar: React.FC<BarProps> = ({ data, isLoading, isRefetching }) => {
  const filteredKeys =
    data && data.MembersJoined.ageGroup
      ? Object.keys(data.MembersJoined.ageGroup).filter(
          (key) => key !== "71-80" && key !== "81-90" && key !== "91-100"
          // eslint-disable-next-line no-mixed-spaces-and-tabs
        )
      : [];

  const values = filteredKeys?.map(
    (key) =>
      data?.MembersJoined.ageGroup[
        key as keyof typeof data.MembersJoined.ageGroup
      ]
  );

  if (isLoading || isRefetching) {
    return (
      <div className="w-full h-full rounded-md bg-gray-200 relative overflow-hidden">
        <div className="absolute inset-0 shimmer"></div>
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
            label: "Members",
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

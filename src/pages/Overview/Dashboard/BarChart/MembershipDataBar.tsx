import React from "react";
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface TimeLine {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  refetch?: () => void;
  isLoading: boolean;
  isRefetching: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getGradient = (chart: any) => {
  const {
    ctx,
    chartArea: { top, bottom },
  } = chart;
  const gradient = ctx.createLinearGradient(0, top, 0, bottom);
  gradient.addColorStop(0.5, "#3B63E1");
  gradient.addColorStop(1, "#5CA86C");
  return gradient;
};

const MembershipDataBar: React.FC<TimeLine> = ({
  data,
  isLoading,
  isRefetching,
}) => {
  const getMonth = (date: string) => new Date(date).getMonth() + 1;

  const getMembersJoinedInMonth = (month: number) => {
    return (
      data?.MembersJoined.members?.filter(
        (member: { dateJoined: string }) =>
          getMonth(member.dateJoined) === month
      ).length || 0
    );
  };

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
          y: {
            border: {
              display: true,
            },
          },
          x: {
            grid: {
              display: false,
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
        },
        maintainAspectRatio: false,
      }}
      data={{
        labels: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        datasets: [
          {
            label: "Members Joined",
            data: [
              getMembersJoinedInMonth(1),
              getMembersJoinedInMonth(2),
              getMembersJoinedInMonth(3),
              getMembersJoinedInMonth(4),
              getMembersJoinedInMonth(5),
              getMembersJoinedInMonth(6),
              getMembersJoinedInMonth(7),
            ],
            backgroundColor: (context) => {
              const chart = context.chart;
              return chart.chartArea ? getGradient(chart) : null;
            },
            borderWidth: 1,
            borderRadius: 10,
            barThickness: 15,
            borderSkipped: false,
          },
        ],
      }}
    />
  );
};

export default MembershipDataBar;

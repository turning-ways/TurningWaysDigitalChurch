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
import useGetAllMembers from "../../../../hooks/Member/useGetAllMembers";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

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

const MembershipDataBar = () => {
  const { data: members } = useGetAllMembers({page:1, pageSize:1000000});
  const getMonth = (date: string) => {
    const dateJoined = new Date(date);
    const monthJoined: number = dateJoined.getMonth() + 1;
    return monthJoined;
  };
  const getMembersJoinedInMonth = (month: number) => {
    const filteredMembers = members?.filter(
      (member: { dateJoined: string }) => getMonth(member.dateJoined) === month
    );
    return filteredMembers?.length;
  };
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
        // layout: { padding: { bottom: 0 } },
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
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            backgroundColor: (context: any) => {
              const chart = context.chart;
              const { chartArea } = chart;
              if (!chartArea) return null;
              // if (context.dataIndex === 0) {
              return getGradient(chart);
              // } else {
              //   return "#000000";
              // }
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

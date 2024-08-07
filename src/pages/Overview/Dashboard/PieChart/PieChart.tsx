import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, Tooltip, Legend, ArcElement } from "chart.js";
// import useMemberStats from "../../../../hooks/Member/useMemberStats";

ChartJS.register(Tooltip, Legend, ArcElement);

interface PieProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  sdata: any;
  isRefetching?: boolean;
}

const PieChart: React.FC<PieProps> = ({ sdata, isRefetching }) => {
  // Default to empty object if sdata or MembersJoined is undefined
  const data = sdata?.MembersJoined;
  const noOfFemale = data?.genderCount?.female || 0;
  const noOfMale = data?.genderCount?.male || 0;
  const totalMembers = data?.length || 1; // Avoid division by zero

  const getGenderPercentage = (gender: "male" | "female") => {
    const count = gender === "male" ? noOfMale : noOfFemale;
    return (count / totalMembers) * 100;
  };

  const chartData = {
    labels: ["Male", "Female"],
    datasets: [
      {
        label: "Percent",
        data: [getGenderPercentage("male"), getGenderPercentage("female")],
        backgroundColor: ["#758CD7", "#A0D7AB"],
        borderWidth: 1,
        hoverOffset: 4,
      },
    ],
  };

  const chartOptions = {
    plugins: {
      legend: {
        display: false,
      },
    },
    maintainAspectRatio: false,
    responsive: true,
  };

  if (isRefetching) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <div className="shimmer h-48 w-48 rounded-full"></div>
      </div>
    );
  } else {
    return <Pie data={chartData} options={chartOptions} />;
  }
};

export default PieChart;

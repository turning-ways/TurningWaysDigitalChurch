import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, Tooltip, Legend, ArcElement } from "chart.js";
import useMemberStats from "../../../../hooks/Member/useMemberStats";

ChartJS.register(Tooltip, Legend, ArcElement);

interface PieProps {
  timeLine: string;
}

export const PieChart: React.FC<PieProps> = ({timeLine}) => {
  const { data } = useMemberStats(timeLine);
  const noOfFemale = data?.["female-members-count"];
  const noOfMale = data?.["male-members-count"];
  const totalMembers = data?.["members-count"];
  const getGenderPercentage = (gender: string) => {
    if (gender === "male") {
      return (noOfMale && totalMembers ? noOfMale/totalMembers : 0) * 100;
    }
    if (gender === "female") {
      return (noOfFemale && totalMembers ? noOfFemale/totalMembers : 0 ) * 100;
    }
  };
  return (
    <Pie
      options={{
        plugins: {
          legend: {
            display: false,
          },
        },

        // layout: { padding: { bottom: 0 } },
        maintainAspectRatio: false,
        // Allow chart to have a custom height
        responsive: true, // Ensure chart responds to container size changes
      }}
      data={{
        labels: ["Male", "Female"],
        datasets: [
          {
            label: "Gender",
            data: [getGenderPercentage("male"), getGenderPercentage("female")],
            backgroundColor: ["#758CD7", "#A0D7AB"],
            borderWidth: 1,
            hoverOffset: 4,
          },
        ],
      }}
    />
  );
};

import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, Tooltip, Legend, ArcElement } from "chart.js";
import useGetAllMembers from "../../../../hooks/Member/useGetAllMembers";

ChartJS.register(Tooltip, Legend, ArcElement);

export const PieChart = () => {
  const { data: members } = useGetAllMembers();
  const noOfMembers = members?.length;
  const getGenderPercentage = (gender: string) => {
    const selectedGender = members?.filter(
      (member: { gender: string }) => member.gender === gender
    );
    const noOfSelectedGender = selectedGender?.length;
    const selectedGenderPercentage =
      noOfSelectedGender &&
      noOfMembers &&
      (noOfSelectedGender / noOfMembers) * 100;
    return selectedGenderPercentage;
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

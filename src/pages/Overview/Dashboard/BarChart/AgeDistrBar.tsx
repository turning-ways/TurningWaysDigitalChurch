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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface BarProps {
  timeLine: string;
}

const AgeDistrBar: React.FC<BarProps> = ({ timeLine }) => {
  const { data } = useMemberStats(timeLine);
  const filteredKeys =
    data && data.ageRanges
      ? Object.keys(data.ageRanges).filter(
          (key) => key !== "71-80" && key !== "81-90" && key !== "91-100"
        )
      : [];

  const values = filteredKeys?.map((key) => data?.ageRanges[key as keyof typeof data.ageRanges]);

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
            //   borderColor: "#5CA86C",
            borderWidth: 1,
            borderRadius: 100,
            barThickness: 16,
            // borderSkipped: false,
          },
        ],
      }}
    />
  );
};

export default AgeDistrBar;

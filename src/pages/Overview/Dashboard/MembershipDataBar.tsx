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
import { memberData } from "./Data/memberData";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const MembershipDataBar = () => {

  return (
    <Bar
      options={{
        scales: {
          y: { border: { dash: [4, 4] } },
          x: { grid: { display: false } },
        },
        layout: {padding: {bottom: 0}}
      }}
      data={memberData}
    />
  );
};

export default MembershipDataBar;

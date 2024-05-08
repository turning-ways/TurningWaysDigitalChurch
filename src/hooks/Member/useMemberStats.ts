import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useChurchIdStore } from "../../stores/churchId";

interface DataType {
  data: {
    ageRanges: {
        "0-10": number,
        "11-20": number,
        "21-30": number,
        "31-40": number,
        "41-50": number,
        "51-60": number,
        "61-70": number,
        "71-80": number,
        "81-90": number,
        "91-100": number,
    },
    "members-count": number,
    "male-members-count": number,
    "female-members-count": number
}
}

const useMemberStats = (timeLine: string) => {
  const { churchId } = useChurchIdStore();
  return useQuery({
    queryKey: ["data", churchId],
    queryFn: () =>
      axios
        .get<DataType>(
          `https://digital-church.onrender.com/api/v1/churches/${churchId}/member-stats?dataparam=${timeLine}`,
          {
            withCredentials: true,
          }
        )
        .then((res) => res.data)
        .then((res) => res.data),
    
  });
};

export default useMemberStats;

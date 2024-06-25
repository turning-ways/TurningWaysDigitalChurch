import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useUserAuth } from "../../stores/user";

interface DataType {
  data: {
    ageRanges: {
      "0-10": number;
      "11-20": number;
      "21-30": number;
      "31-40": number;
      "41-50": number;
      "51-60": number;
      "61-70": number;
      "71-80": number;
      "81-90": number;
      "91-100": number;
    };
    "members-count": number;
    "male-members-count": number;
    "female-members-count": number;
  };
}

const useMemberStats = (timeLine: string | undefined) => {
  const { user } = useUserAuth();
  return useQuery({
    queryKey: ["data", user?.churchId?._id],
    queryFn: () =>
      axios
        .get<DataType>(
          `https://turningways.onrender.com/api/v1/churches/${user?.churchId?._id}/member-stats?dateparam=${timeLine}`,
          {
            withCredentials: true,
          }
        )
        .then((res) => res.data)
        .then((res) => res.data),
  });
};

export default useMemberStats;

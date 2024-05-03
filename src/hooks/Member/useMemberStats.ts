import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useChurchIdStore } from "../../stores/churchId";

const useMemberStats = () => {
  const { churchId } = useChurchIdStore();
  return useQuery({
    queryKey: ["data", churchId],
    queryFn: () =>
      axios
        .get(
          `https://digital-church.onrender.com/api/v1/churches/${churchId}/member-stats`,
          {
            withCredentials: true,
          }
        )
        .then((res) => res.data).then(res => res.data),
  });
};

export default useMemberStats;

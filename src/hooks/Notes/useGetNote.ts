import { useQuery } from "@tanstack/react-query";
import axios from "../../axios";
// import { useUserAuth } from "../../stores/user";
import { useChurchIdStore } from "../../stores/churchId";

interface NoteProps {
  comment: string;
  date: string;
  id: string;
  isEdited: boolean;
  createdBy?: {
    id: string;
    name: string;
    role: string;
  };
}

const useGetNote = (memberId: string) => {
  const { churchId } = useChurchIdStore();

  return useQuery<NoteProps[]>({
    queryKey: ["church", churchId, "member", memberId, "notes"],
    queryFn: () =>
      axios
        .get(
          `https://turningways-api-3hcn.onrender.com/api/v1/members/${churchId}/member/${memberId}/note`,
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          return res.data;
        })
        .then((res) => {
          return res.data.notes;
        }),
  });
};

export default useGetNote;

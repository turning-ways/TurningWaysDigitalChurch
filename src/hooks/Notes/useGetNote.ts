import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useUserAuth } from "../../stores/user";

interface NoteProps {
    comment: string;
    date: string;
    id:string;
}

const useGetNote = (memberId:string) => {
  const {user} = useUserAuth();

  return useQuery<NoteProps[]>({
    queryKey: ["church", user?.churchId?._id, "member", memberId, "notes"],
    queryFn: () =>
      axios
        .get(`https://digital-church.onrender.com/api/v1/members/${memberId}/notes`, {
          withCredentials: true,
        })
        .then((res) => res.data).then(res => res.data).then(res => res.notes),
  });
};

export default useGetNote;

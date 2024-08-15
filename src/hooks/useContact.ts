import { useQuery } from "@tanstack/react-query";
import { fetchContacts } from "@/api/contact.api";
import { useChurchIdStore } from "@/stores/churchId";

export const useFetchContacts = () => {
  const { churchId } = useChurchIdStore();
  return useQuery({
    queryKey: ["contacts", churchId],
    queryFn: () => fetchContacts(churchId),
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};

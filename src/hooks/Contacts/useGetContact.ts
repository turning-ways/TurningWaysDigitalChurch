import { useQuery } from "@tanstack/react-query";
import { useChurchIdStore } from "../../stores/churchId";
import axios from "axios";
import { useUserAuth } from "../../stores/user";

interface Contact {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address: number;
  maturity: string;
  createdBy: string;
  createdAt: string;
  ModifiedDate:string;
  status:string;
  _id:string;
  assignedTo: [];
  labels: []
}

const useGetContacts = () => {
  const { churchId } = useChurchIdStore();
  const { user } = useUserAuth();
  const queryParams = new URLSearchParams(location.search);

  const contactId = queryParams.get("id");

  return useQuery<Contact>({
    queryKey: ["churches", churchId, "contacts"],
    queryFn: () =>
      axios
        .get(
          `https://digital-church.onrender.com/api/v1/churches/${user?.churchId._id}/contact/${contactId}`,
          {
            withCredentials: true,
          }
        )
        .then((res) => res.data)
        .then((res) => res.data)
        .then((res) => res.contact)
        .catch((err) => console.log(err)),
  });
};

export default useGetContacts;
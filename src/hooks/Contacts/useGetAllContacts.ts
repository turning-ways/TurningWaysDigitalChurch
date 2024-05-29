import { useQuery } from "@tanstack/react-query";
import { useChurchIdStore } from "../../stores/churchId";
import axios from "axios";
import { useUserAuth } from "../../stores/user";

interface AssignedTo {
  first_name: string;
  last_name:string;
}

interface Label {
  label: string;
  label_type: string;
}

interface Contacts {
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
  assignedTo: AssignedTo[];
  labels: Label[];
}

const useGetAllContacts = () => {
  const { churchId } = useChurchIdStore();
  const { user } = useUserAuth();

  return useQuery<Contacts[]>({
    queryKey: ["churches", churchId, "contacts"],
    queryFn: () =>
      axios
        .get(
          `https://digital-church.onrender.com/api/v1/churches/${user?.churchId._id}/contact/`,
          {
            withCredentials: true,
          }
        )
        .then((res) => res.data)
        .then((res) => res.data)
        .then((res) => res.contacts)
        .catch((err) => console.log(err)),
  });
};

export default useGetAllContacts;

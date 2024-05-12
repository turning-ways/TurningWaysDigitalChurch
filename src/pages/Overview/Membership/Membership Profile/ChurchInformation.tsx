import { useQuery } from "@tanstack/react-query";
import { useChurchIdStore } from "../../../../stores/churchId";
import InformationInput from "./InformationField";
import axios from "axios";

const ChurchInformation = () => {
  const queryParams = new URLSearchParams(location.search);

  const memberId = queryParams.get("id");

  const { churchId } = useChurchIdStore();

  const { data } = useQuery<{
    member: {
      accessPermission: string;
      memberStatus: string;
      workType: string;
      ServiceUnit: string;
    };
  }>({
    queryKey: ["church", churchId, "member", memberId],
    queryFn: () =>
      axios
        .get(`https://digital-church.onrender.com/api/v1/members/${memberId}`, {
          withCredentials: true,
        })
        .then((res) => res.data),
  });

  const information = [
    {
      name: "Access Permission",
      value:
        data &&
        data?.member?.accessPermission?.slice(0, 1).toUpperCase() +
          data?.member?.accessPermission?.slice(1),
    },
    {
      name: "Member Status",
      value:
        data &&
        data?.member?.memberStatus?.slice(0, 1).toUpperCase() +
          data?.member?.memberStatus?.slice(1),
    },
    {
      name: "Work Type",
      value:
        data &&
        data?.member?.workType?.slice(0, 1).toUpperCase() +
          data?.member?.workType?.slice(1),
    },
    {
      name: "Service Unit or Department",
      value:
        data &&
        data?.member?.ServiceUnit?.slice(0, 1).toUpperCase() +
          data?.member?.ServiceUnit?.slice(1),
    },
  ];
  return (
    <div className="mt-5">
      {information.map((item) => (
        <InformationInput text={item.name} subText={item.value} />
      ))}
    </div>
  );
};

export default ChurchInformation;

import { useQuery } from "@tanstack/react-query";
import { useChurchIdStore } from "../../../../stores/churchId";
import InformationInput from "./InformationField";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ChurchInformation = () => {
  const queryParams = new URLSearchParams(location.search);

  const memberId = queryParams.get("id");

  const { churchId } = useChurchIdStore();

  const { data } = useQuery<{
    member: {
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

  const navigate = useNavigate();
  return (
    <div className="mt-5">
      {information.map((item) => (
        <InformationInput text={item.name} subText={item.value} />
      ))}
      <div className="flex justify-between">
        <button
          className=" flex mt-4 bg-[#17275B] text-white px-4 py-2  rounded-lg gap-2 justify-center "
          onClick={() =>
            navigate(
              `/admin/directory/member/contact-information?id=${memberId}`
            )
          }
        >
          <p className="text-lg ">Previous</p>
        </button>
        <button
          className=" flex mt-4 bg-[#17275B] text-white px-4 py-2  rounded-lg gap-2 justify-center "
          onClick={() =>
            navigate(
              `/admin/directory/member/membership-history?id=${memberId}`
            )
          }
        >
          {/* <RiAddCircleFill className="text-2xl" /> */}
          <p className="text-lg ">Next</p>
        </button>
      </div>
    </div>
  );
};

export default ChurchInformation;

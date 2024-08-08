import InformationInput from "./InformationField";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";

const ChurchInformation = () => {
  const queryParams = new URLSearchParams(location.search);
  const memberId = queryParams.get("id");
  const member = useSelector((state: RootState) => state.members.member);

  const information = [
    {
      name: "Member Status",
      value:
        member && member?.memberStatus
          ? member?.memberStatus?.slice(0, 1).toUpperCase() +
            member?.memberStatus?.slice(1)
          : "Undefined",
    },
    {
      name: "Worker Type",
      value:
        member && member?.profile?.worker
          ? member?.profile?.worker?.slice(0, 1).toUpperCase() +
            member?.profile?.worker?.slice(1)
          : "Undefined",
    },
    {
      name: "Service Unit/Group",
      value:
        member && member?.profile?.worker
          ? member?.profile?.worker?.slice(0, 1).toUpperCase() +
            member?.profile?.worker?.slice(1)
          : "Undefined",
    },
  ];

  const navigate = useNavigate();
  return (
    <div className="">
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
          }>
          <p className="text-lg ">Previous</p>
        </button>
        <button
          className=" flex mt-4 bg-[#17275B] text-white px-4 py-2  rounded-lg gap-2 justify-center "
          onClick={() =>
            navigate(
              `/admin/directory/member/membership-history?id=${memberId}`
            )
          }>
          {/* <RiAddCircleFill className="text-2xl" /> */}
          <p className="text-lg ">Next</p>
        </button>
      </div>
    </div>
  );
};

export default ChurchInformation;

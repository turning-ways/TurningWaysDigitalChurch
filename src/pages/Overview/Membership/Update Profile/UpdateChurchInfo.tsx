import { DropDownInput } from "../../../../ui/DropDownMenu/DropDownInput";
import { ThreeDots } from "react-loader-spinner";
import useUpdateMember from "../../../../hooks/Member/member-service/useUpdateMember";
import { useEditPersonalInformationStore } from "../../../../stores/Edit Member/personalinfo";
import { useEditContactInformationStore } from "../../../../stores/Edit Member/contactinfo";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../../../../stores/user";
import { useEditChurchInformationStore } from "../../../../stores/Edit Member/churchinfo";

const UpdateChurchInfo = () => {
  const {
    setMemberStatus,
    setWorkType,
    setServiceUnit,
    member_status,
    work_type,
    service_unit,
  } = useEditChurchInformationStore();

  const navigate = useNavigate();

  const dropDown = [
    {
      text: "Member Status",
      items: ["Inactive", "Active"],
      onSelect: (value: string) => setMemberStatus(value),
      value: member_status,
    },
    {
      text: "Worker Type",
      items: ["Pastor", "Reverend"],
      onSelect: (value: string) => setWorkType(value),
      value: work_type,
    },
    {
      text: "Service Unit/Group",
      items: ["Usher", "Attendance"],
      onSelect: (value: string) => setServiceUnit(value),
      value: service_unit,
    },
  ];

  const queryParams = new URLSearchParams(location.search);

  const memberId = queryParams.get("id");

  const { mutate, isPending } = useUpdateMember(memberId ? memberId : "");
  const { first_name, last_name, middle_name, suffix, gender, educational_level, employment_status, health_status } =
    useEditPersonalInformationStore();
  const { contact_address, contact_phone, contact_email } =
    useEditContactInformationStore();
  // const {access_permission, member_status, service_unit, work_type} = useChurchInformationSore();

  const { user } = useUserAuth();

  const handleAddingMember = () => {
    mutate({
      first_name,
      last_name,
      middle_name,
      email: contact_email,
      suffix,
      address: { HomeAddress: contact_address },
      phone: { MainPhone: contact_phone },
      churchId: user?.churchId._id ? user?.churchId._id : "",
      gender,
      memberStatus: member_status,
      workerType: work_type,
      ServiceUnit: service_unit,
      employmentStatus: employment_status,
      educationalLevel: educational_level,
      healthStatus: health_status,
    });
    // console.log(member_status, work_type, service_unit);
  };

  return (
    <div className="mt-5">
      {dropDown.map((item) => (
        <DropDownInput
          text={item.text}
          items={item.items}
          onSelect={item.onSelect}
          value={
            item.value
              ? item?.value?.slice(0, 1).toUpperCase() + item?.value?.slice(1)
              : "undefined"
          }
        />
      ))}
      <div className="flex justify-between">
        <button
          className=" flex mt-4 bg-[#17275B] text-white w-28 py-2  rounded-lg gap-2 justify-center "
          onClick={() =>
            navigate(
              `/admin/directory/update-member/contact-information?id=${memberId}`
            )
          }
        >
          <p className="text-lg ">Previous</p>
        </button>
        <button
          className=" flex mt-4 bg-[#17275B] text-white px-4 py-2  rounded-lg gap-2 justify-center "
          onClick={handleAddingMember}
        >
          {!isPending ? (
            <p className="text-lg ">Save</p>
          ) : (
            <ThreeDots height="25" width="50" color="#fff" />
          )}
        </button>
      </div>
    </div>
  );
};

export default UpdateChurchInfo;

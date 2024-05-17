import { useEffect } from "react";
import { DropDownInput } from "../../../../components/DropDownMenu/DropDownInput";
import useGetMemberDetails from "../../../../hooks/Member/useGetMemberDetails";
import { useChurchInformationSore } from "../../../../stores/Add Member/churchInformation";
import { ThreeDots } from "react-loader-spinner";
import useUpdateMember from "../../../../hooks/Member/useUpdateMember";
import { useEditPersonalInformationStore } from "../../../../stores/Edit Member/personalinfo";
import { useEditContactInformationStore } from "../../../../stores/Edit Member/contactinfo";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../../../../stores/user";

const UpdateChurchInfo = () => {
  const {
    setAccessPermission,
    setMemberStatus,
    setWorkType,
    setServiceUnit,
    access_permission,
    member_status,
    work_type,
    service_unit,
  } = useChurchInformationSore();

  const { data } = useGetMemberDetails();

  const navigate = useNavigate();

  useEffect(() => {
    setAccessPermission(data ? data.member.accessPermission : "");
    setMemberStatus(data ? data.member.memberStatus : "");
    setWorkType(data ? data.member.workType : "");
    setServiceUnit(data ? data.member.ServiceUnit : "");
  }, []);

  const dropDown = [
    {
      text: "Access Permission",
      items: ["Admin", "Member"],
      onSelect: (value: string) => setAccessPermission(value),
      value: access_permission,
    },
    {
      text: "Member Status",
      items: ["Inactive", "Active"],
      onSelect: (value: string) => setMemberStatus(value),
      value: member_status,
    },
    {
      text: "Work Type",
      items: ["Pastor", "Reverend"],
      onSelect: (value: string) => setWorkType(value),
      value: work_type,
    },
    {
      text: "Service Unit/Department",
      items: ["Usher", "Attendance"],
      onSelect: (value: string) => setServiceUnit(value),
      value: service_unit,
    },
  ];

  const queryParams = new URLSearchParams(location.search);

  const memberId = queryParams.get("id");

  const { mutate, isPending } = useUpdateMember(memberId ? memberId : "");
  const { first_name, last_name, middle_name, suffix, gender } =
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
    });
    console.log(first_name, last_name, middle_name, suffix, gender);
  };

  return (
    <div className="mt-5">
      {dropDown.map((item) => (
        <DropDownInput
          text={item.text}
          items={item.items}
          onSelect={item.onSelect}
          value={item?.value?.slice(0, 1).toUpperCase() + item?.value?.slice(1)}
        />
      ))}
      <div className="flex justify-between">
        <button
          className=" flex mt-4 bg-[#17275B] text-white px-4 py-2  rounded-lg gap-2 justify-center "
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

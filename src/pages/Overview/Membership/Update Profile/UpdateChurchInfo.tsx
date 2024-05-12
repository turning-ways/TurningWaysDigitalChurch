import { useEffect } from "react";
import { DropDownInput } from "../../../../components/DropDownMenu/DropDownInput";
import useGetMemberDetails from "../../../../hooks/Member/useGetMemberDetails";
import { useChurchInformationSore } from "../../../../stores/Add Member/churchInformation";

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
    </div>
  );
};

export default UpdateChurchInfo;

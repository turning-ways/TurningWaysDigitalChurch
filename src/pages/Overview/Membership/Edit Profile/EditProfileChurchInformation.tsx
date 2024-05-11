import { DropDownInput } from "../../../../components/DropDownMenu/DropDownInput";
import { useChurchInformationSore } from "../../../../stores/Add Member/churchInformation";

const EditProfileChurchInfo = () => {
  const { setAccessPermission, setMemberStatus, setWorkType, setServiceUnit, work_type, service_unit, member_status, access_permission } =
    useChurchInformationSore();

  const dropDown = [
    {
      text: "Access Permission",
      items: ["admin", "member"],
      onSelect: (value: string) => setAccessPermission(value),
      value: access_permission,
      onChange: setAccessPermission
    },
    {
      text: "Member Status",
      items: ["active", "inactive"],
      onSelect: (value: string) => setMemberStatus(value),
      value: member_status,
      onChange: setMemberStatus
    },
    {
      text: "Work Type",
      items: ["pastor", "reverend"],
      onSelect: (value: string) => setWorkType(value),
      value: work_type,
      onChange: setWorkType,
    },
    {
      text: "Service Unit/Department",
      items: ["usher", "attendance"],
      onSelect: (value: string) => setServiceUnit(value),
      value: service_unit,
      onChange: setServiceUnit
    },
  ];

  return (
    <div className="mt-5">
      {/* {information.map((item) => (
        <InformationInput text={item.name} />
      ))} */}
      {dropDown.map((item) => (
        <DropDownInput
          text={item.text}
          items={item.items}
          onSelect={item.onSelect}
          value={item.value}
          onChange={(gender) => item.onChange(gender)}
        />
      ))}
    </div>
  );
};

export default EditProfileChurchInfo;

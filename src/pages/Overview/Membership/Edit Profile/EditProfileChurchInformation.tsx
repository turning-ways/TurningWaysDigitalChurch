import { DropDownInput } from "../../../../components/DropDownMenu/DropDownInput";
import { useChurchInformationSore } from "../../../../stores/Add Member/churchInformation";

const EditProfileChurchInfo = () => {
  const { setAccessPermission, setMemberStatus, setWorkType, setServiceUnit } =
    useChurchInformationSore();

  const dropDown = [
    {
      text: "Access Permission",
      items: ["admin", "member"],
      onSelect: (value: string) => setAccessPermission(value),
    },
    {
      text: "Member Status",
      items: ["active", "inactive"],
      onSelect: (value: string) => setMemberStatus(value),
    },
    {
      text: "Work Type",
      items: ["pastor", "reverend"],
      onSelect: (value: string) => setWorkType(value),
    },
    {
      text: "Service Unit/Department",
      items: ["usher", "attendance"],
      onSelect: (value: string) => setServiceUnit(value),
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
        />
      ))}
    </div>
  );
};

export default EditProfileChurchInfo;

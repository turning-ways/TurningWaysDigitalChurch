import { DropDownInput } from "../../../../components/DropDownMenu/DropDownInput";
import { useChurchInformationSore } from "../../../../stores/Add Member/churchInformation";

const UpdateChurchInfo = () => {

  const {setAccessPermission, setMemberStatus, setWorkType, setServiceUnit} = useChurchInformationSore();

  const dropDown = [
    { text: "Access Permission", items: ["Admin", "Member"], onSelect: (value:string) => setAccessPermission(value) },
    { text: "Member Status", items: ["Verified", "Unverifies"], onSelect: (value:string) => setMemberStatus(value) },
    { text: "Work Type", items: ["Pastor", "Reverend"], onSelect: (value:string) => setWorkType(value) },
    { text: "Service Unit/Department", items: ["usher", "attendance"], onSelect: (value:string) => setServiceUnit(value)  },
  ];


  return (
    <div className="mt-5">
      {dropDown.map((item) => (
        <DropDownInput text={item.text} items={item.items} onSelect={item.onSelect}/>
      ))}
    </div>
  );
};

export default UpdateChurchInfo;

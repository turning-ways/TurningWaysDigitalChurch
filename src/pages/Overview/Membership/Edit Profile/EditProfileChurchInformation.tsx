import { DropDownInput } from "../../../../components/DropDownMenu/DropDownInput";

const EditProfileChurchInfo = () => {
  const dropDown = [
    { text: "Access Permission", items: ["Admin", "Member"] },
    { text: "Member Status", items: ["Verified", "Unverifies"] },
    { text: "Work Type", items: ["Pastor", "Reverend"] },
    { text: "Service Unit/Department", items: ["usher", "attendance"] },
  ];
  return (
    <div className="mt-5">
      {/* {information.map((item) => (
        <InformationInput text={item.name} />
      ))} */}
      {dropDown.map((item) => (
        <DropDownInput text={item.text} items={item.items} />
      ))}
    </div>
  );
};

export default EditProfileChurchInfo;

import InformationInput from "./InformationInput";
import { usePersonalInformationStore } from "../../../../stores/personalinformation";
import { DropDownInput } from "../../../../components/DropDownMenu/DropDownInput";

const EditProfilePersonalInfo = () => {
  const {setPrefix, setFirstName, setMiddleName, setLastName, setSuffix, first_name, middle_name, last_name, suffix } =
    usePersonalInformationStore();

  const information = [
    {
      name: "First Name",
      set: setFirstName,
      value: first_name,
    },
    {
      name: "Middle Name",
      set: setMiddleName,
      value: middle_name,
    },
    {
      name: "Last Name",
      set: setLastName,
      value: last_name,
    },
    {
      name: "Suffix",
      set: setSuffix,
      value: suffix,
    },
  ];

  const handleSelectValue = (value:string) => {
    setPrefix(value);
  };

  return (
    <div className="mt-5">
      <DropDownInput text="Prefix" items={["Mr", "Mrs"]} placeholder="Mr/Mrs" onSelect={handleSelectValue}/>
      {information.map((item, index) => (
        <div key={index}>
          <InformationInput
            text={item.name}
            onChange={(e) => {
              item.set(e.target.value);
            }}
            value={item.value}
          />
        </div>
      ))}
    </div>
  );
};

export default EditProfilePersonalInfo;

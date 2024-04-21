import InformationInput from "./InformationInput";
import { usePersonalInformationStore } from "../../../../stores/personalinformation";
import { useState } from "react";
import { DropDownInput } from "../../../../components/DropDownMenu/DropDownInput";

const EditProfilePersonalInfo = () => {
  const {setPrefix, setFirstName, setMiddleName, setLastName, setSuffix } =
    usePersonalInformationStore();

  // Define individual state for each input field
  // const [prefixValue, setPrefixValue] = useState<string>("");
  const [firstNameValue, setFirstNameValue] = useState<string>("");
  const [middleNameValue, setMiddleNameValue] = useState<string>("");
  const [lastNameValue, setLastNameValue] = useState<string>("");
  const [suffixValue, setSuffixValue] = useState<string>("");

  const information = [
    {
      name: "First Name",
      set: setFirstName,
      value: firstNameValue,
      onChange: setFirstNameValue,
    },
    {
      name: "Middle Name",
      set: setMiddleName,
      value: middleNameValue,
      onChange: setMiddleNameValue,
    },
    {
      name: "Last Name",
      set: setLastName,
      value: lastNameValue,
      onChange: setLastNameValue,
    },
    {
      name: "Suffix",
      set: setSuffix,
      value: suffixValue,
      onChange: setSuffixValue,
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
              item.onChange(e.target.value);
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

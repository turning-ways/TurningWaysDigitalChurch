import InformationInput from "./InformationInput";
import { usePersonalInformationStore } from "../../../../stores/personalinformation";
import { useState } from "react";

const EditProfilePersonalInfo = () => {
  const {
    setPrefix,
    setFirstName,
    setMiddleName,
    setLastName,
    setSuffix,
  } = usePersonalInformationStore();

  // Define individual state for each input field
  const [prefixValue, setPrefixValue] = useState<string>("");
  const [firstNameValue, setFirstNameValue] = useState<string>("");
  const [middleNameValue, setMiddleNameValue] = useState<string>("");
  const [lastNameValue, setLastNameValue] = useState<string>("");
  const [suffixValue, setSuffixValue] = useState<string>("");

  const information = [
    {
      name: "Prefix",
      set: setPrefix,
      value: prefixValue,
      onChange: setPrefixValue,
    },
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

  return (
    <div className="mt-5">
      {information.map((item, index) => (
        <div key={index}>
          <InformationInput
            text={item.name}
            onChange={(e) => {
              item.set(e.target.value);
            }}
            value=""
          />
        </div>
      ))}
    </div>
  );
};

export default EditProfilePersonalInfo;

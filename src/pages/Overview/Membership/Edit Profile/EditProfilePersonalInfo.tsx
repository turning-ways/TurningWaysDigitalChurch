import InformationInput from "./InformationInput";
import { usePersonalInformationStore } from "../../../../stores/Add Member/personalinformation";
import { DropDownInput } from "../../../../components/DropDownMenu/DropDownInput";

const EditProfilePersonalInfo = () => {
  const {
    setPrefix,
    setFirstName,
    setMiddleName,
    setLastName,
    setSuffix,
    setGender,
    first_name,
    middle_name,
    last_name,
    suffix,
  } = usePersonalInformationStore();

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

  const handlePrefix = (value: string) => {
    setPrefix(value);
  };

  const handleGender = (value: string) => {
    setGender(value);
  };

  return (
    <div className="mt-5">
      <DropDownInput
        text="Prefix"
        items={["Mr", "Mrs"]}
        placeholder=""
        onSelect={handlePrefix}
      />
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
      <DropDownInput
        text="Gender"
        items={["male", "female"]}
        placeholder=""
        onSelect={handleGender}
      />
    </div>
  );
};

export default EditProfilePersonalInfo;

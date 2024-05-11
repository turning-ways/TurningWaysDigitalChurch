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
    setDateOfBirth,
    setAnniversary,
    first_name,
    middle_name,
    last_name,
    suffix,
    dateOfBirth,
    anniversary,
    prefix,
    gender,
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
        value={prefix}
        onChange={(prefix) => setPrefix(prefix)}
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
            notCompulsory={item.name === "Suffix" ? " " : "*"}
          />
        </div>
      ))}
      <DropDownInput
        text="Gender"
        items={["male", "female"]}
        placeholder="Male"
        compulsory="*"
        onSelect={handleGender}
        value={gender}
        onChange={(gender) => setGender(gender)}
      />
      <div className=" space-y-1 mb-4">
        <p className="text-[#727272]">
          D.O.B <span className="text-[#61BD74]"> *</span>
        </p>
        <div className="border rounded-lg p-2">
          <input
            className="outline-none text-[#434343] text-lg w-full"
            type="date"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
          />
        </div>
      </div>
      <div className=" space-y-1 mb-4">
        <p className="text-[#727272]">Anniversary</p>
        <div className="border rounded-lg p-2">
          <input
            className="outline-none text-[#434343] text-lg w-full"
            type="date"
            value={anniversary}
            onChange={(e) => setAnniversary(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default EditProfilePersonalInfo;

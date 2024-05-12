import InformationInput from "../Edit Profile/InformationInput";
import { DropDownInput } from "../../../../components/DropDownMenu/DropDownInput";
import { useEditPersonalInformationStore } from "../../../../stores/Edit Member/personalinfo";
import { useEffect } from "react";
import useGetMemberDetails from "../../../../hooks/Member/useGetMemberDetails";

const UpdatePersonalInfo = () => {
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
    gender,
    prefix,
    dateOfBirth,
    setDateOfBirth,
  } = useEditPersonalInformationStore();

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

  const handleSelectValue = (value: string) => {
    setPrefix(value);
  };

  const handleGender = (value: string) => {
    setGender(value);
  };

  const { data } = useGetMemberDetails();

  useEffect(() => {
    setFirstName(data ? data?.member?.first_name : "");
    setMiddleName(data ? data?.member?.middle_name : "");
    setLastName(data ? data?.member?.last_name : "");
    setSuffix(data ? data?.member?.suffix : "");
    setPrefix(data ? data?.member?.prefix : "");
    setDateOfBirth(data ? data?.member?.dateOfBirth : "");
  }, []);

  return (
    <div className="mt-5">
      <DropDownInput
        text="Prefix"
        items={["Mr", "Mrs"]}
        placeholder="Mr/Mrs"
        value={prefix}
        onSelect={handleSelectValue}
      />
      {information.map((item, index) => (
        <div key={index}>
          <InformationInput
            text={item.name}
            onChange={(e) => {
              item.set(e.target.value);
            }}
            value={item?.value?.slice(0, 1).toUpperCase() + item?.value?.slice(1)}
          />
        </div>
      ))}
      <DropDownInput
        text="Gender"
        items={["male", "female"]}
        placeholder="Male"
        compulsory="*"
        onSelect={handleGender}
        value={gender?.slice(0, 1).toUpperCase() + gender?.slice(1)}
      />
      <div className=" space-y-1 mb-4">
        <p className="text-[#727272]">
          D.O.B <span className="text-[#61BD74]"> *</span>
        </p>
        <div className="border rounded-lg p-2">
          <input
            className="outline-none text-[#434343] text-lg w-full"
            type="date"
            value={dateOfBirth.split('T')[0]}
            onChange={(e) => setDateOfBirth(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default UpdatePersonalInfo;

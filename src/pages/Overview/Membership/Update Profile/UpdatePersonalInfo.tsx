import InformationInput from "../Edit Profile/InformationInput";
import { DropDownInput } from "../../../../components/DropDownMenu/DropDownInput";
import { useEditPersonalInformationStore } from "../../../../stores/Edit Member/personalinfo";
import { useNavigate } from "react-router-dom";

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

  const navigate = useNavigate();

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


  const queryParams = new URLSearchParams(location.search);

  const memberId = queryParams.get("id");

  

  return (
    <div className="mt-5 flex flex-col">
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
            value={
              item?.value?.slice(0, 1).toUpperCase() + item?.value?.slice(1)
            }
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
            value={dateOfBirth.split("T")[0]}
            onChange={(e) => setDateOfBirth(e.target.value)}
          />
        </div>
      </div>
      <button
        className=" self-end mt-4 bg-[#17275B] text-white px-4
        
        py-2 rounded-lg gap-2 justify-center"
        onClick={() =>
          navigate(
            `/admin/directory/update-member/contact-information?id=${memberId}`
          )
        }
      >
        <p className="text-lg ">Next</p>
      </button>
    </div>
  );
};

export default UpdatePersonalInfo;

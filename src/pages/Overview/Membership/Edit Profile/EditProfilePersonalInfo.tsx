import InformationInput from "./InformationInput";
import { usePersonalInformationStore } from "../../../../stores/Add Member/personalinformation";
import { DropDownInput } from "../../../../ui/DropDownMenu/DropDownInput";
import { useNavigate } from "react-router-dom";

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
    setEducationalLevel,
    setEmploymentStatus,
    setHealthStatus,
    first_name,
    middle_name,
    last_name,
    suffix,
    dateOfBirth,
    anniversary,
    prefix,
    gender,
    educational_level,
    employment_status,
    health_status,
  } = usePersonalInformationStore();

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

  const handlePrefix = (value: string) => {
    setPrefix(value);
  };

  const handleGender = (value: string) => {
    setGender(value);
  };

  const handleEducationalLevel = (value: string) => {
    setEducationalLevel(value.toLowerCase());
  };

  const handleEmploymentStatus = (value: string) => {
    setEmploymentStatus(value.toLowerCase());
  };

  const handleHealthStatus = (value: string) => {
    setHealthStatus(value.toLowerCase());
  };

  return (
    <div className="mt-5 flex flex-col">
      <DropDownInput
        text="Prefix"
        items={[
          "Mr",
          "Mrs",
          "Madam",
          "Lady",
          "Sir",
          "Jr.",
          "Sr.",
          "Ms.",
          "Dr",
          "Lady",
        ]}
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
            notCompulsory={
              item.name === "Suffix" || item.name === "Middle Name" ? " " : "*"
            }
          />
        </div>
      ))}
      <DropDownInput
        text="Gender"
        items={["Male", "Female"]}
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
      <DropDownInput
        text="Educational Level"
        items={[
          "Undefined",
          "Primary",
          "Secondary",
          "Graduate",
          "Post Graduate",
          "Others",
        ]}
        placeholder="undefined"
        compulsory=" "
        onSelect={handleEducationalLevel}
        value={educational_level}
        onChange={(educational_level) => setEducationalLevel(educational_level)}
      />
      <DropDownInput
        text="Employment Status"
        items={["Undefined", "Self Employed", "Employed", "Unemployed"]}
        placeholder="undefined"
        compulsory=" "
        onSelect={handleEmploymentStatus}
        value={employment_status}
        onChange={(employment_status) => setEmploymentStatus(employment_status)}
      />
      <DropDownInput
        text="Health Status"
        items={["Undefined", "Healthy", "Allergic", "Special Condition"]}
        placeholder="undefined"
        compulsory=" "
        onSelect={handleHealthStatus}
        value={health_status}
        onChange={(health_status) => setHealthStatus(health_status)}
      />
      <button
        className=" self-end mt-4 bg-[#17275B] text-white px-4
        
        py-2 rounded-lg gap-2 justify-center"
        onClick={() =>
          navigate("/admin/directory/add-member/contact-information")
        }
      >
        {/* <RiAddCircleFill className="text-2xl" /> */}
        <p className="text-lg ">Next</p>
      </button>
    </div>
  );
};

export default EditProfilePersonalInfo;

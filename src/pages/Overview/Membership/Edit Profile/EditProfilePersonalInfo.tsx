import InformationInput from "./InformationInput";
import { DropDownInput } from "../../../../ui/DropDownMenu/DropDownInput";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../../../../store";
import { useDispatch, useSelector } from "react-redux";
import {
  selectTempMember,
  updateTempMemberField,
} from "../../../../slices/memberSlice";

const EditProfilePersonalInfo = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const tempMember = useSelector(selectTempMember);

  const handleInputChange = (
    field: string,
    value: string | number | boolean
  ) => {
    dispatch(updateTempMemberField({ field, value }));
  };

  const information = [
    {
      name: "First Name",
      set: (value: string) => handleInputChange("profile.firstName", value),
      value: tempMember?.profile?.firstName,
    },
    {
      name: "Middle Name",
      set: (value: string) => handleInputChange("profile.middleName", value),
      value: tempMember?.profile?.middleName,
    },
    {
      name: "Last Name",
      set: (value: string) => handleInputChange("profile.lastName", value),
      value: tempMember?.profile?.lastName,
    },
  ];

  return (
    <div className="mt-5 flex flex-col">
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
        text="Prefix"
        items={[
          "Honorable",
          "Mr",
          "Mrs",
          "Bro",
          "Sis",
          "Miss",
          "Dr",
          "Prof",
          "Rev",
          "Pastor",
          "Elder",
          "Deacon",
          "Bishop",
          "Deaconess",
          "undefined",
        ]}
        value={tempMember?.profile?.prefix}
        placeholder=""
        onSelect={(prefix) => handleInputChange("profile.prefix", prefix)}
      />
      <DropDownInput
        text="Suffix"
        items={["Jr", "Sr", "II", "III", "IV", "undefined"]}
        value={tempMember?.profile?.suffix}
        placeholder=""
        onSelect={(suffix) => handleInputChange("profile.suffix", suffix)}
      />
      <DropDownInput
        text="Gender"
        items={["male", "female"]}
        placeholder="male"
        compulsory="*"
        onSelect={(gender) => handleInputChange("profile.gender", gender)}
        value={tempMember?.profile?.gender}
      />
      <div className=" space-y-1 mb-4">
        <p className="text-[#727272]">
          D.O.B <span className="text-[#61BD74]"> *</span>
        </p>
        <div className="border rounded-lg p-2">
          <input
            className="outline-none text-[#434343] text-lg w-full"
            type="date"
            value={tempMember?.profile?.dateOfBirth}
            onChange={(e) =>
              handleInputChange("profile.dateOfBirth", e.target.value)
            }
          />
        </div>
      </div>
      {/* <div className=" space-y-1 mb-4">
				<p className="text-[#727272]">Anniversary</p>
				<div className="border rounded-lg p-2">
					<input
						className="outline-none text-[#434343] text-lg w-full"
						type="date"
						value={anniversary}
						onChange={(e) => setAnniversary(e.target.value)}
					/>
				</div>
			</div> */}
      <DropDownInput
        text="Educational Level"
        items={[
          "undefined",
          "primary",
          "secondary",
          "graduate",
          "post-graduate",
          "Others",
        ]}
        placeholder="undefined"
        compulsory=" "
        onSelect={(value) =>
          handleInputChange("profile.educationalLevel", value)
        }
        value={tempMember?.profile?.educationalLevel}
      />
      <DropDownInput
        text="Employment Status"
        items={[
          "undefined",
          "self-employed",
          "employed",
          "unemployed",
          "retired",
        ]}
        placeholder="undefined"
        compulsory=" "
        onSelect={(value) =>
          handleInputChange("profile.employmentStatus", value)
        }
        value={tempMember?.profile?.employmentStatus}
      />
      <DropDownInput
        text="Health Status"
        items={["undefined", "healthy", "allergic", "special condition"]}
        placeholder="undefined"
        compulsory=" "
        onSelect={(value) => handleInputChange("profile.healthStatus", value)}
        value={tempMember?.profile?.healthStatus}
      />
      <button
        className=" self-end mt-4 bg-[#17275B] text-white px-4
        
        py-2 rounded-lg gap-2 justify-center"
        onClick={() =>
          navigate("/admin/directory/add-member/contact-information")
        }>
        {/* <RiAddCircleFill className="text-2xl" /> */}
        <p className="text-lg ">Next</p>
      </button>
    </div>
  );
};

export default EditProfilePersonalInfo;

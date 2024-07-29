import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import { AppDispatch } from "../../../../store";

import InformationInput from "../Edit Profile/InformationInput";
import { DropDownInput } from "../../../../ui/DropDownMenu/DropDownInput";
import {
  updateMemberDetails,
  updateTempMemberField,
  selectTempMember,
  selectMemberStatus,
  selectMemberError,
} from "../../../../slices/memberSlice";
import { useChurchIdStore } from "../../../../stores/churchId";
import { notify, success } from "../../../../hooks/useAuthData";

const UpdatePersonalInfo = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const memberId = queryParams.get("id");
  const { churchId } = useChurchIdStore();

  const tempMember = useSelector(selectTempMember);
  console.log(tempMember);
  const status = useSelector(selectMemberStatus);
  const error = useSelector(selectMemberError);

  // useEffect(() => {
  // 	if (memberId) {
  // 		dispatch(fetchMemberDetails({ churchId, memberId }));
  // 	}
  // 	return () => {
  // 		// dispatch(clearMemberDetails());
  // 	};
  // }, []);

  const handleInputChange = (
    field: string,
    value: string | number | boolean
  ) => {
    dispatch(updateTempMemberField({ field, value }));
  };

  const handleSave = () => {
    if (!memberId) {
      console.error("Member ID is missing");
      return;
    }

    const memberData = { ...tempMember, churchId: churchId ?? "" };
    try {
      dispatch(
        updateMemberDetails({
          navigate,
          churchId: churchId ?? "",
          memberId,
          member: memberData,
        })
      ).then(() => {
        if (status !== "failed") {
          success("Member details updated successfully");
        }
      });
    } catch (error) {
      notify("An error occurred");
    }
  };

  return (
    <div className="mt-5 flex flex-col">
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
        placeholder="Mr"
        value={tempMember?.profile?.prefix}
        onSelect={(value) => handleInputChange("profile.prefix", value)}
      />
      <DropDownInput
        text="Suffix"
        items={["Jr", "Sr", "II", "III", "IV", "undefined"]}
        placeholder="Jr"
        value={tempMember?.profile?.suffix}
        onSelect={(value) => handleInputChange("profile.suffix", value)}
      />
      <InformationInput
        text="First Name"
        onChange={(e) => handleInputChange("profile.firstName", e.target.value)}
        value={tempMember?.profile?.firstName}
        notCompulsory="*"
      />
      <InformationInput
        text="Middle Name"
        onChange={(e) =>
          handleInputChange("profile.middleName", e.target.value)
        }
        value={tempMember?.profile?.middleName}
        notCompulsory=" "
      />
      <InformationInput
        text="Last Name"
        onChange={(e) => handleInputChange("profile.lastName", e.target.value)}
        value={tempMember?.profile?.lastName}
        notCompulsory="*"
      />
      <DropDownInput
        text="Gender"
        items={["male", "female"]}
        placeholder="Male"
        compulsory="*"
        onSelect={(value) => handleInputChange("profile.gender", value)}
        value={tempMember?.profile?.gender}
      />
      <div className="space-y-1 mb-4">
        <p className="text-[#727272]">
          Date Of Birth <span className="text-[#61BD74]"> *</span>
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
      <DropDownInput
        text="Marital Status"
        items={["single", "married", "divorced", "widowed", "undefined"]}
        placeholder="Single"
        compulsory=" "
        onSelect={(value) => handleInputChange("profile.maritalStatus", value)}
        value={tempMember?.profile?.maritalStatus}
      />
      <DropDownInput
        text="Educational Level"
        items={[
          "undefined",
          "primary",
          "secondary",
          "graduate",
          "post-graduate",
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
          "student",
          "retired",
          "unemployed",
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
      <div className="flex justify-between">
        <button
          className="self-end mt-4 bg-[#17275B] text-white px-4 py-2 rounded-lg gap-2 justify-center"
          onClick={() =>
            navigate(
              `/admin/directory/update-member/contact-information?id=${memberId}`
            )
          }>
          <p className="text-lg">Next</p>
        </button>
        <button
          className="flex mt-4 bg-[#17275B] text-white px-4 py-2 rounded-lg gap-2 justify-center"
          onClick={handleSave}>
          {status !== "loading" ? (
            <p className="text-lg">Save</p>
          ) : (
            <ThreeDots height="25" width="50" color="#fff" />
          )}
        </button>
      </div>
      {status === "failed" && <div className="mt-2 text-red-500">{error}</div>}
    </div>
  );
};

export default UpdatePersonalInfo;

import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import { AppDispatch } from "../../../../store";

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

const UpdateChurchInfo = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const memberId = queryParams.get("id");
  const { churchId } = useChurchIdStore();

  const tempMember = useSelector(selectTempMember);
  const status = useSelector(selectMemberStatus);
  const error = useSelector(selectMemberError);

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
      success("Member details updated successfully");
    } catch (error) {
      notify("An error occurred");
    }
  };

  const dropDownItems = [
    {
      text: "Member Status",
      items: ["inactive", "active"],
      onSelect: (value: string) => {
        handleInputChange("profile.active", value === "active");
      },
      value: tempMember?.profile?.active ? "Active" : "Inactive",
    },
    {
      text: "Worker Type",
      items: ["Pastor", "Deacon", "Deaconess", "Elder", "Member", "undefined"],
      onSelect: (value: string) => {
        handleInputChange("profile.worker", value);
      },
      value: tempMember?.profile?.worker || "undefined",
    },
    {
      text: "Service Unit",
      items: [
        "Usher",
        "Attendance",
        "Choir",
        "Media",
        "Technical",
        "Security",
        "Children",
        "Decoration",
        "Prayer",
        "Finance",
        "Welfare",
        "Evangelism",
        "Hospitality",
        "Transport",
        "Sanitation",
        "Protocol",
        "Counseling",
        "Youth",
        "undefined",
      ],
      onSelect: (value: string) => {
        handleInputChange("profile.serviceUnit", value);
      },
      placeholder: "Select Service Unit",
      value: tempMember?.profile?.serviceUnit || "undefined",
    },
  ];

  return (
    <div className="mt-5">
      {dropDownItems.map((item) => (
        <DropDownInput
          key={item.text}
          text={item.text}
          items={item.items}
          onSelect={item.onSelect}
          value={item.value}
        />
      ))}
      <div className="flex justify-between">
        <button
          className="flex mt-4 bg-[#17275B] text-white w-28 py-2 rounded-lg gap-2 justify-center"
          onClick={() =>
            navigate(
              `/admin/directory/update-member/contact-information?id=${memberId}`
            )
          }
          disabled={status === "loading"}>
          <p className="text-lg">Previous</p>
        </button>
        <button
          className="flex mt-4 bg-[#17275B] text-white px-4 py-2 rounded-lg gap-2 justify-center"
          onClick={handleSave}
          disabled={status === "loading"}>
          {status !== "loading" ? (
            <p className="text-lg">Save</p>
          ) : (
            <ThreeDots height="25" width="50" color="#fff" />
          )}
        </button>
      </div>
      {status === "failed" && (
        <div className="mt-2 text-red-500">{error || "An error occurred"}</div>
      )}
    </div>
  );
};

export default UpdateChurchInfo;

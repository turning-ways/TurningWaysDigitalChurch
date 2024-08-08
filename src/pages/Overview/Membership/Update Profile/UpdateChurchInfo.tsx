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
import React, { useEffect } from "react";
import axiosInstance from "@/axios";

const UpdateChurchInfo = () => {
  const [roles, setRoles] = React.useState<
    { _id: string; name: string; description: string }[]
  >([]);
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

  useEffect(() => {
    async function getRoles() {
      const role = await axiosInstance.get(
        `/api/v1/churches/${churchId}/roles`
      );
      const roles = role.data.data.roles;
      const rolesArray = roles.map(
        (role: { _id: string; name: string; description: string }) => {
          return {
            _id: role._id,
            name: role.name,
            description: role.description,
          };
        }
      );
      setRoles(rolesArray);
    }
    getRoles();
  }, [churchId]);

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
        if (status !== "failed" && status !== "loading") {
          success("Member details updated successfully");
        } else {
          notify("An error occurred");
        }
      });
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
    {
      text: "Church Role",
      items: roles.map((role) => role.name),
      onSelect: (value: string) => {
        const role = roles.find((role) => role.name === value);
        handleInputChange("orgRole", role ? role._id : "");
      },
      value: roles.find(
        (role) =>
          role._id ===
          (tempMember?.orgRole?._id
            ? tempMember?.orgRole?._id
            : tempMember?.orgRole)
      )?.name,
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

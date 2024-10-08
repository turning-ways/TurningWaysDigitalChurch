import React, { useMemo, useCallback, useEffect } from "react";
import { DropDownInput } from "../../../../ui/DropDownMenu/DropDownInput";
import { notify } from "../../../../hooks/useAuthData";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "../../../../store";
import {
  selectTempMember,
  updateTempMemberField,
  addMember,
  selectMemberAddStatus,
} from "../../../../slices/memberSlice";
import { useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import { useChurchIdStore } from "../../../../stores/churchId";
import axiosInstance from "@/axios";

const EditProfileChurchInfo: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const tempMember = useSelector(selectTempMember);
  const status = useSelector(selectMemberAddStatus);
  const { churchId } = useChurchIdStore();
  const [roles, setRoles] = React.useState<
    { _id: string; name: string; description: string }[]
  >([]);

  const handleInputChange = useCallback(
    (field: string, value: string | number | boolean) => {
      dispatch(updateTempMemberField({ field, value }));
    },
    [dispatch]
  );

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

  const dropDown = useMemo(
    () => [
      {
        text: "Member Status",
        items: ["active", "inactive"],
        onSelect: (value: string) =>
          handleInputChange("profile.active", value === "active"),
        value: tempMember?.profile?.active ? "active" : "inactive",
      },
      {
        text: "Worker Type",
        items: [
          "Pastor",
          "Deacon",
          "Deaconess",
          "Elder",
          "Member",
          "undefined",
        ],
        onSelect: (value: string) => handleInputChange("profile.worker", value),
        value: tempMember?.profile?.worker,
      },
      {
        text: "Service Unit/Group",
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
        onSelect: (value: string) =>
          handleInputChange("profile.serviceUnit", value),
        value: tempMember?.profile?.serviceUnit,
      },
      {
        text: "Church Role",
        items: roles.map((role: { name: string }) => role.name),
        compulsory: true,
        onSelect: (value: string) => {
          const role = roles.find((role) => {
            console.log(role.name === value);
            return role.name === value;
          });
          handleInputChange("orgRole", role ? role?._id : "");
        },
        value:
          roles.find(
            (role) => role?._id === (tempMember?.orgRole as unknown as string)
          )?.name || "",
      },
    ],
    [
      handleInputChange,
      roles,
      tempMember?.orgRole,
      tempMember?.profile?.active,
      tempMember?.profile?.serviceUnit,
      tempMember?.profile?.worker,
    ]
  );

  const handleSave = useCallback(() => {
    if (!tempMember?.profile?.firstName || !tempMember?.profile?.lastName) {
      notify("First Name and Last Name are compulsory");
      return;
    }

    if (!tempMember?.profile?.gender) {
      notify("Gender is compulsory");
      return;
    }

    if (!tempMember?.profile?.dateOfBirth) {
      notify("Date of Birth is compulsory");
      return;
    }

    if (!tempMember?.orgRole) {
      notify("Church Role is compulsory");
      return;
    }

    if (
      tempMember?.profile?.phone?.mainPhone === "+234" ||
      !tempMember?.profile?.phone?.mainPhone
    ) {
      notify("Phone Number is compulsory");
      return;
    }
    try {
      dispatch(
        addMember({
          churchId: churchId,
          member: tempMember,
        })
      );
    } catch (err) {
      notify("Failed to add member");
    }
  }, [tempMember, dispatch, churchId]);

  useEffect(() => {
    if (status === "succeeded") {
      navigate("/admin/directory");
    }
  }, [status, navigate]);

  return (
    <div className="mt-5 flex flex-col">
      {dropDown.map((item) => (
        <DropDownInput
          key={item.text}
          text={item.text}
          items={item.items}
          compulsory={item?.compulsory ? "*" : ""}
          onChange={item.onSelect}
          onSelect={item.onSelect}
          value={item.value}
        />
      ))}
      <div className="flex justify-between">
        <button
          className="flex mt-4 bg-[#17275B] text-white px-4 py-2 rounded-lg gap-2 justify-center"
          onClick={() =>
            navigate("/admin/directory/add-member/contact-information")
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
    </div>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export default EditProfileChurchInfo;

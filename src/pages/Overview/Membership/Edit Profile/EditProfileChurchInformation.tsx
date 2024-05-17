import { DropDownInput } from "../../../../components/DropDownMenu/DropDownInput";
import { useChurchInformationSore } from "../../../../stores/Add Member/churchInformation";
import useAddRegularMember from "../../../../hooks/Member/useAddRegularMember";
import { usePersonalInformationStore } from "../../../../stores/Add Member/personalinformation";
import { useContactInformationStore } from "../../../../stores/Add Member/contactInformation";
import { notify } from "../../../../hooks/useLogin";
import { useUserAuth } from "../../../../stores/user";
import { useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";

const EditProfileChurchInfo = () => {
  const {
    setAccessPermission,
    setMemberStatus,
    setWorkType,
    setServiceUnit,
    work_type,
    service_unit,
    member_status,
    access_permission,
  } = useChurchInformationSore();

  const dropDown = [
    {
      text: "Access Permission",
      items: ["admin", "member"],
      onSelect: (value: string) => setAccessPermission(value),
      value: access_permission,
      onChange: setAccessPermission,
    },
    {
      text: "Member Status",
      items: ["active", "inactive"],
      onSelect: (value: string) => setMemberStatus(value),
      value: member_status,
      onChange: setMemberStatus,
    },
    {
      text: "Work Type",
      items: ["pastor", "reverend"],
      onSelect: (value: string) => setWorkType(value),
      value: work_type,
      onChange: setWorkType,
    },
    {
      text: "Service Unit/Department",
      items: ["usher", "attendance"],
      onSelect: (value: string) => setServiceUnit(value),
      value: service_unit,
      onChange: setServiceUnit,
    },
  ];

  const { mutate, isPending } = useAddRegularMember();
  const {
    first_name,
    last_name,
    middle_name,
    suffix,
    gender,
    dateOfBirth,
    anniversary,
  } = usePersonalInformationStore();
  const { contact_email } = useContactInformationStore();
  const { contact_address, contact_phone } = useContactInformationStore();
  const { user } = useUserAuth();

  const handleAddingMember = () => {
    if (
      first_name &&
      last_name &&
      middle_name &&
      contact_email &&
      contact_phone !== "" &&
      dateOfBirth !== "" &&
      gender !== "" &&
      contact_address !== ""
    ) {
      mutate({
        first_name,
        last_name,
        middle_name,
        email: contact_email,
        suffix,
        address: { HomeAddress: contact_address },
        phone: { MainPhone: contact_phone },
        churchId: user ? user?.churchId?._id : "",
        gender,
        dateOfBirth,
        anniversary,
        accessPermission: access_permission,
        memberStatus: member_status,
        ServiceUnit: service_unit,
        workType: work_type,
      });
    } else notify("Please fill in all required fields");
  };

  const navigate = useNavigate();

  return (
    <div className="mt-5 flex flex-col">
      {dropDown.map((item) => (
        <DropDownInput
          text={item.text}
          items={item.items}
          onSelect={item.onSelect}
          value={item.value}
          onChange={(gender) => item.onChange(gender)}
        />
      ))}
      <div className="flex justify-between">
        <button
          className=" flex mt-4 bg-[#17275B] text-white px-4 py-2  rounded-lg gap-2 justify-center "
          onClick={() =>
            navigate("/admin/directory/add-member/contact-information")
          }
        >
          <p className="text-lg ">Previous</p>
        </button>
        <button
          className=" flex mt-4 bg-[#17275B] text-white px-4 py-2  rounded-lg gap-2 justify-center "
          onClick={handleAddingMember}
        >
          {!isPending ? (
            <p className="text-lg ">Save</p>
          ) : (
            <ThreeDots height="25" width="50" color="#fff" />
          )}
        </button>
        <p>
          click
        </p>
      </div>
    </div>
  );
};

export default EditProfileChurchInfo;

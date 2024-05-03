import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { usePersonalInformationStore } from "../../../../stores/Add Member/personalinformation";
import { useChurchIdStore } from "../../../../stores/churchId";
import useAddRegularMember from "../../../../hooks/Member/useAddRegularMember";
import { useContactInformationStore } from "../../../../stores/Add Member/contactInformation";
import { notify } from "../../../../hooks/useLogin";
import { useUserAuth } from "../../../../stores/user";
import { useChurchInformationSore } from "../../../../stores/Add Member/churchInformation";

interface SubHeaderProps {
  btnText: string;
}

const SubHeader: React.FC<SubHeaderProps> = ({ btnText }) => {
  const navigate = useNavigate();
  const { mutate } = useAddRegularMember();
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
  const {access_permission, member_status, service_unit, work_type} = useChurchInformationSore();
  const { churchId } = useChurchIdStore();
  const handleAddingMember = () => {
    if (
      first_name &&
      last_name &&
      middle_name &&
      contact_email &&
      contact_phone !== "" &&
      dateOfBirth !== ""
    ) {
      mutate({
        first_name,
        last_name,
        middle_name,
        email: contact_email,
        suffix,
        address: { HomeAddress: contact_address },
        phone: { MainPhone: contact_phone },
        churchId: churchId ? churchId : "",
        gender,
        dateOfBirth,
        anniversary,
        accessPermission: access_permission,
        memberStatus: member_status,
        ServiceUnit: service_unit,
        workType: work_type,
      });
    } else notify("Please fill in all required fields");
    console.log(first_name, last_name, middle_name, suffix, gender);
  };

  return (
    <div className="flex justify-center flex-col mt-10 items-center relative">
      <div
        className="bg-[#F1F0F3] rounded-lg p-2 w-fit cursor-pointer h-fit absolute top-0 left-0"
        onClick={() => navigate(`/admin/directory`)}
      >
        <IoIosArrowBack className=" text-2xl w-auto text-[#6C6C6D]" />
      </div>
      <div className="border border-black w-32 h-32 rounded-full mb-5 flex justify-center items-center text-5xl">
        {user
          ? user?.first_name.charAt(0).toUpperCase() +
            user?.last_name.charAt(0).toUpperCase()
          : "P"}
      </div>
      <button
        className="bg-[#17275B] text-[#ffffff] border border-[#BFBFBF] px-6 py-3 rounded-[8px] font-medium h-fit"
        onClick={handleAddingMember}
      >
        {btnText}
      </button>
    </div>
  );
};

export default SubHeader;

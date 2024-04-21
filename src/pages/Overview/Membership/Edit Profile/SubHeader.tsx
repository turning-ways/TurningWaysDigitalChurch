import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { routes } from "../../../routes/routes";
// import useAddMember from "../../../../hooks/AddMember/useAddMember";
// import { usePersonalInformationStore } from "../../../../stores/personalinformation";
// import { useContactInformationStore } from "../../../../stores/contactInformation";
// import { useChurchInformationSore } from "../../../../stores/churchInformation";
// import { useChurchIdStore } from "../../../../stores/churchId";

interface SubHeaderProps {
  btnText: string
}

const SubHeader: React.FC<SubHeaderProps> = ({btnText}) => {
  const navigate = useNavigate();
  // const {mutate} = useAddMember();
  // const {first_name, last_name, middle_name, prefix, suffix} = usePersonalInformationStore();
  // const {contact_address, contact_email, contact_phone} = useContactInformationStore();
  // const {access_permission, member_status, service_unit, work_type} = useChurchInformationSore();
  // const {} = useChurchIdStore();

  // const handleAddingMember = () => {
  //   mutate({first_name, last_name, middle_name, prefix, suffix, address: {HomeAddress: contact_address}, email: contact_email, phone: {MainPhone: contact_phone}})
  // }

  return (
    <div className="flex justify-center flex-col mt-10 items-center relative">
      <div
        className="bg-[#F1F0F3] rounded-lg p-2 w-fit cursor-pointer h-fit absolute top-0 left-0"
        onClick={() => navigate(routes.membership.membersPage)}
      >
        <IoIosArrowBack className=" text-2xl w-auto text-[#6C6C6D]" />
      </div>
      <div className="bg-black w-32 h-32 rounded-full mb-5" />
      <button className="bg-[#17275B] text-[#ffffff] border border-[#BFBFBF] px-6 py-3 rounded-[8px] font-medium h-fit">
        {btnText}
      </button>
    </div>
  );
};

export default SubHeader;

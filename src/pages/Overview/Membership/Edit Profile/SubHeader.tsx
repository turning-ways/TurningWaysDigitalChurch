import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { usePersonalInformationStore } from "../../../../stores/personalinformation";
import { useChurchIdStore } from "../../../../stores/churchId";
import useAddRegularMember from "../../../../hooks/AddMember/useAddRegularMember";
import { useContactInformationStore } from "../../../../stores/contactInformation";

interface SubHeaderProps {
  btnText: string;
}

const SubHeader: React.FC<SubHeaderProps> = ({ btnText }) => {
  const navigate = useNavigate();
  const { mutate } = useAddRegularMember();
  const { first_name, last_name, middle_name, suffix } =
    usePersonalInformationStore();
  const { contact_address, contact_phone } = useContactInformationStore();
  // const {access_permission, member_status, service_unit, work_type} = useChurchInformationSore();
  const { churchId } = useChurchIdStore();

  const handleAddingMember = () => {
    mutate({
      first_name,
      last_name,
      middle_name,
      suffix,
      address: { HomeAddress: contact_address },
      phone: { MainPhone: contact_phone },
      churchId: churchId ? churchId : "",
    });
    console.log(first_name, last_name, middle_name, suffix);
  };

  return (
    <div className="flex justify-center flex-col mt-10 items-center relative">
      <div
        className="bg-[#F1F0F3] rounded-lg p-2 w-fit cursor-pointer h-fit absolute top-0 left-0"
        onClick={() => navigate(`/admin/church/${churchId}/members`)}
      >
        <IoIosArrowBack className=" text-2xl w-auto text-[#6C6C6D]" />
      </div>
      <div className="bg-black w-32 h-32 rounded-full mb-5" />
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

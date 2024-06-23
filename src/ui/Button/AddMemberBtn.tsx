import { RiAddCircleFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { routes } from "../../pages/routes/routes";

const AddMemberBtn = () => {
  const navigate = useNavigate();
  return (
    <button
      className="absolute bottom-1 lg:bottom-0 right-0 flex items-center bg-[#17275B] text-white p-4 mr-10 mb-10 rounded-[15px] gap-3 shadow-custom"
      onClick={() => navigate(routes.membership.membershipProfilePage)}
    >
      <RiAddCircleFill className="text-2xl" />
      <p>Add Member</p>
    </button>
  );
};

export default AddMemberBtn;

import React from "react";
import { FaArrowRight } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

interface ViewMoreProps {
  id: string;
}

const ViewMore: React.FC<ViewMoreProps> = ({ id }) => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-center">
      <button
        onClick={() =>
          navigate(`/admin/directory/member/personal-information?id=${id}`)
        }
        className="flex items-center gap-2 text-secondary font-semibold">
        View More <FaArrowRight />
      </button>
    </div>
  );
};

export default ViewMore;

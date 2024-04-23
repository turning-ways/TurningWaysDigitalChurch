import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import AddMemberBtn from "../AddMemberBtn";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useChurchIdStore } from "../../../stores/churchId";
import axios from "axios";

const AllMembers = () => {
  const navigate = useNavigate();
  const { churchId } = useChurchIdStore();

  const { data: member } = useQuery({
    queryKey: ["churches", churchId, "members"],
    queryFn: () =>
      axios
        .get(
          `https://digital-church.onrender.com/api/v1/churches/${churchId}/members`,
          { withCredentials: true }
        )
        .then((res) => res.data)
        .catch((err) => console.log(err)),
  });

  return (
    <div>
      <div className="grid grid-cols-[100px,210px,280px,150px,150px,auto] gap-4 border-b py-2  ">
        <div className="flex space-x-1 items-center">
          <MdOutlineCheckBoxOutlineBlank className="text-xl" />
          <p>Profile</p>
        </div>
        <div className="">Name</div>
        <div className="">Email</div>
        <div className="">Phone Number</div>
        <div className="">Gender</div>
      </div>

      {churchId && member && member.data && member.data.members && 
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        member.data.members.map((item: any) => (
          <div className="grid grid-cols-[100px,210px,280px,150px,150px,auto] border-b py-4  text-[#636363] gap-4">
            <div className="flex space-x-2 items-center">
              <MdOutlineCheckBoxOutlineBlank className="text-xl" />
              <p>pic</p>
            </div>
            <div className="">{item.first_name}</div>
            <div className="">{item.email}</div>
            <div className="">{item.phone.MainPhone}</div>
            <div className="">{item.gender}</div>
            <div
              className="flex items-center gap-x-2 text-secondary cursor-pointer"
              onClick={() => {
                navigate(
                  `/overview/membership/personal-information?id=${item._id}`
                );
              }}
            >
              <p>View more</p> <FaArrowRight />
            </div>
          </div>
        ))}
      <AddMemberBtn />
    </div>
  );
};

export default AllMembers;

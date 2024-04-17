import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import AddMemberBtn from "../AddMemberBtn";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const AllMembers = () => {
  const members = [
    {
      name: "dire",
      email: "test@gmail.com",
      phonenumber: "09088778899",
      gender: "male",
    },
    {
      name: "john",
      email: "test123@gmail.com",
      phonenumber: "09022778899",
      gender: "male",
    },
    {
      name: "chase",
      email: "123@gmail.com",
      phonenumber: "09088448899",
      gender: "male",
    },
    {
      name: "ace",
      email: "123test@gmail.com",
      phonenumber: "09088774499",
      gender: "male",
    },
  ];

  const navigate = useNavigate();

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
      {members.map((item) => (
        <div className="grid grid-cols-[100px,210px,280px,150px,150px,auto] border-b py-4  text-[#636363] gap-4">
          <div className="flex space-x-2 items-center">
            <MdOutlineCheckBoxOutlineBlank className="text-xl" />
            <p>pic</p>
          </div>
          <div className="">{item.name}</div>
          <div className="">{item.email}</div>
          <div className="">{item.phonenumber}</div>
          <div className="">{item.gender}</div>
          <div
            className="flex items-center gap-x-2 text-secondary cursor-pointer"
            onClick={() =>
              navigate("/overview/membership/personal-information")
            }
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

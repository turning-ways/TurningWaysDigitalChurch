/* eslint-disable @typescript-eslint/no-explicit-any */
import AddMemberBtn from "../AddMemberBtn";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useChurchIdStore } from "../../../stores/churchId";
import useGetAllMembers from "../../../hooks/Member/useGetAllMembers";
import { useState } from "react";

const AllMembers = () => {
  const navigate = useNavigate();
  const { churchId } = useChurchIdStore();

  const { data: members } = useGetAllMembers();

  const [memberCheckboxes, setMemberCheckboxes] = useState(
    Array(members?.length).fill(false)
  );

  const [selectAll, setSelectAll] = useState(false);

  const handleMemberCheckboxChange = (index: number) => {
    const updatedCheckboxes = [...memberCheckboxes];
    updatedCheckboxes[index] = !updatedCheckboxes[index];
    setMemberCheckboxes(updatedCheckboxes);
    setSelectAll(updatedCheckboxes.every((checkbox) => checkbox === true));
  };

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    setSelectAll(isChecked);
    setMemberCheckboxes(memberCheckboxes.map(() => isChecked));
  };


  return (
    <div>
      <div className="grid grid-cols-[100px,210px,280px,150px,150px,auto] gap-4 border-b py-2  ">
        <div className="flex space-x-1 items-center">
          <input type="checkbox"  checked={selectAll}
                onChange={handleSelectAll}/>
          <p>Profile</p>
        </div>
        <div className="">Name</div>
        <div className="">Email</div>
        <div className="">Phone Number</div>
        <div className="">Gender</div>
      </div>

      {churchId && members ? (
        members.map((item: any, index:number) => (
          <div className="grid grid-cols-[100px,210px,280px,150px,150px,auto] border-b py-4  text-[#636363] gap-4">
            <div className="flex space-x-2 items-center">
              <input type="checkbox" checked={memberCheckboxes[index]} onChange={() => handleMemberCheckboxChange(index)}/>
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
                  `/admin/directory/member/personal-information?id=${item._id}`
                );
              }}
            >
              <p>View more</p> <FaArrowRight />
            </div>
          </div>
        ))
      ) : (
        <div>There's no member</div>
      )}
      <AddMemberBtn />
    </div>
  );
};

export default AllMembers;

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import AddMemberBtn from "../AddMemberBtn";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import useGetAllMembers from "../../../hooks/Member/useGetAllMembers";
import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { ThreeDots } from "react-loader-spinner";

const AllMembers = () => {
  const navigate = useNavigate();
  const pageSize = 10;

  const [page, setPage] = useState(1);

  const { data: members, isPending, refetch } = useGetAllMembers({ page, pageSize });

  const [memberCheckboxes, setMemberCheckboxes] = useState(
    Array(members?.length).fill(false)
  );

  const [selectAll, setSelectAll] = useState(false);

  const [selectedMembers, setSelectedMembers] = useState<any[]>([]);

  const handleMemberCheckboxChange = (index: number) => {
    const updatedCheckboxes = [...memberCheckboxes];
    updatedCheckboxes[index] = !updatedCheckboxes[index];
    setMemberCheckboxes(updatedCheckboxes);
    setSelectAll(updatedCheckboxes.every((checkbox) => checkbox === true));

    const selectedMember = members && members[index];
    if (updatedCheckboxes[index]) {
      setSelectedMembers((prevMembers) => [...prevMembers, selectedMember]);
    } else if (updatedCheckboxes[index] === false) {
      setSelectedMembers((prevState) =>
        selectedMember
          ? prevState.filter(
              (member: { id: string }) => member.id !== selectedMember.id
            )
          : []
      );
    }
  };

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    setSelectAll(isChecked);
    setMemberCheckboxes(memberCheckboxes.map(() => isChecked));
    if (isChecked) {
      // If select all is checked, add all members to selectedMembers
      setSelectedMembers(members ? [...members] : []);
    } else {
      // If select all is unchecked, remove all members from selectedMembers
      setSelectedMembers([]);
      console.log(selectedMembers);
    }
  };

  const totalPages = members ? Math.ceil(members?.length / pageSize) : 0;
  const renderPaginationNumbers = () => {
    const pagesToShow = 5;
    const startPage = Math.max(1, page - Math.floor(pagesToShow / 2));
    const endPage = Math.min(totalPages, startPage + pagesToShow - 1);

    const paginationNumbers = [];
    for (let i = startPage; i <= endPage; i++) {
      paginationNumbers.push(
        <span
          key={i}
          onClick={() => setPage(i)}
          className={
            i === page
              ? "active bg-[#AAA9A9] rounded-full w-12 h-12 text-white flex items-center justify-center"
              : ""
          }
        >
          <p className="w-4 cursor-pointer text-center">{i}</p>
        </span>
      );
    }

    return paginationNumbers;
  };

  useEffect(() => {
    refetch()
  }, [refetch])

  return (
    <>
      {!isPending ? (
        <div className="flex flex-col items-center">
          <div className="grid grid-cols-[100px,210px,280px,150px,150px,auto] gap-4 border-b py-2  w-full">
            <div className="flex space-x-1 items-center">
              <input
                type="checkbox"
                checked={selectAll}
                onChange={handleSelectAll}
              />
              <p>Profile</p>
            </div>
            <div className="">Name</div>
            <div className="">Email</div>
            <div className="">Phone Number</div>
            <div className="">Gender</div>
          </div>

          {members && members?.length !== 0 ? (
            members.map((item: any, index: number) => (
              <div className="grid grid-cols-[100px,210px,280px,150px,150px,auto] border-b py-4  text-[#636363] gap-4 w-full items-center">
                <div className="flex space-x-2 items-center">
                  <input
                    type="checkbox"
                    checked={memberCheckboxes[index]}
                    onChange={() => handleMemberCheckboxChange(index)}
                  />
                  <p>pic</p>
                </div>
                <div>{item.first_name}</div>
                <div>{item.email}</div>
                <div>{item.phone?.MainPhone}</div>
                <div>{item.gender}</div>
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
          <div className="flex justify-center items-center space-x-10 absolute bottom-10 ">
            <button
              className="flex items-center space-x-3 cursor-pointer"
              onClick={() => setPage((page) => page - 1)}
              disabled={page === 1}
            >
              <FaArrowLeft className="text-[#555545]" />
              <p className="text-[#7F7E7E]">Previous</p>
            </button>
            {renderPaginationNumbers()}
            <button
              className="flex items-center space-x-3 cursor-pointer"
              onClick={() => setPage((page) => page + 1)}
              disabled={totalPages === 1}
            >
              <p className="text-[#7F7E7E]">Next</p>
              <FaArrowRight className="text-[#555545]" />
            </button>
          </div>
          <AddMemberBtn />
        </div>
      ) : (
        <div>
          <ThreeDots height="25" width="50" color="#000" />
        </div>
      )}
    </>
  );
};

export default AllMembers;

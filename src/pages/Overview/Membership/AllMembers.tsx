/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import AddMemberBtn from "../../../ui/Button/AddMemberBtn";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { ThreeDots } from "react-loader-spinner";
import { SlArrowRight } from "react-icons/sl";
import { RxAvatar } from "react-icons/rx";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "../../../store";
import { useChurchIdStore } from "../../../stores/churchId";
import {
  selectMembers,
  selectMemberLoading,
  getAllMembers,
  clearMemberDetails,
} from "../../../slices/memberSlice";

const AllMembers = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const members = useSelector(selectMembers);
  const isPending = useSelector(selectMemberLoading);
  const churchId = useChurchIdStore((state) => state.churchId);

  useEffect(() => {
    dispatch(clearMemberDetails());
    dispatch(getAllMembers({ churchId }));
  }, [churchId]);
  // const [memberCheckboxes, setMemberCheckboxes] = useState(
  //   Array(members?.length).fill(false)
  // );

  // const [selectAll, setSelectAll] = useState(false);

  // const [selectedMembers, setSelectedMembers] = useState<any[]>([]);

  // const handleMemberCheckboxChange = (index: number) => {
  //   const updatedCheckboxes = [...memberCheckboxes];
  //   updatedCheckboxes[index] = !updatedCheckboxes[index];
  //   setMemberCheckboxes(updatedCheckboxes);
  //   setSelectAll(updatedCheckboxes.every((checkbox) => checkbox === true));

  //   const selectedMember = members && members[index];
  //   if (updatedCheckboxes[index]) {
  //     setSelectedMembers((prevMembers) => [...prevMembers, selectedMember]);
  //   } else if (updatedCheckboxes[index] === false) {
  //     setSelectedMembers((prevState) =>
  //       selectedMember
  //         ? prevState.filter(
  //             (member: { id: string }) => member.id !== selectedMember.id
  //           )
  //         : []
  //     );
  //   }
  // };

  // const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const isChecked = event.target.checked;
  //   setSelectAll(isChecked);
  //   setMemberCheckboxes(memberCheckboxes.map(() => isChecked));
  //   if (isChecked) {
  //     // If select all is checked, add all members to selectedMembers
  //     setSelectedMembers(members ? [...members] : []);
  //   } else {
  //     // If select all is unchecked, remove all members from selectedMembers
  //     setSelectedMembers([]);
  //     console.log(selectedMembers);
  //   }
  // };

  // const totalPages = members ? Math.ceil(members?.length / pageSize) : 0;
  // const renderPaginationNumbers = () => {
  //   const pagesToShow = 5;
  //   const startPage = Math.max(1, page - Math.floor(pagesToShow / 2));
  //   const endPage = Math.min(totalPages, startPage + pagesToShow - 1);

  //   const paginationNumbers = [];
  //   for (let i = startPage; i <= endPage; i++) {
  //     paginationNumbers.push(
  //       <span
  //         key={i}
  //         onClick={() => setPage(i)}
  //         className={
  //           i === page
  //             ? "active bg-[#AAA9A9] rounded-full w-8 h-8 md:w-12 md:h-12 text-white flex items-center justify-center"
  //             : ""
  //         }
  //       >
  //         <p className="w-4 cursor-pointer text-center">{i}</p>
  //       </span>
  //     );
  //   }

  //   return paginationNumbers;
  // };

  return (
    <>
      {!isPending ? (
        <div className="flex flex-col items-center">
          <div className="md:grid grid-cols-[70px,1fr,1fr,1fr,1fr,100px] gap-4 gap-x-6 border-b py-2  w-full hidden">
            <div className="flex space-x-3 items-center">
              {/* <input
                type="checkbox"
                checked={selectAll}
                onChange={handleSelectAll}
              /> */}
              <p>Profile</p>
            </div>
            <div className="">Name</div>
            <div className="">Email</div>
            <div className="">
              Phone <span className="hidden lg:inline-block">Number</span>
            </div>
            <div className="">Gender</div>
          </div>

          <div className="border-b w-full border-[#BDBDBD] md:hidden" />
          <div className="mb-10 w-full">
            {members && members?.length !== 0 ? (
              members.map((item: any) => (
                // Use item._id as the key prop if it is unique for each member
                <div key={item._id}>
                  <div className="md:grid grid-cols-[70px,1fr,1fr,1fr,1fr,100px] border-b py-4  text-[#636363] gap-4 gap-x-6 w-full items-center hidden">
                    <div className="flex space-x-3 items-center">
                      {item.photo ? (
                        <img
                          src={item.photo}
                          className="rounded-full w-10 h-10 object-cover"
                          loading="lazy"
                        />
                      ) : (
                        <RxAvatar className="w-10 h-10" />
                      )}
                    </div>
                    <div className="truncate ">
                      {item.firstName && item.firstName}
                      {item?.lastName && item.lastName}
                    </div>
                    <div className="truncate">{item.email}</div>
                    <div className="truncate">{item.phone}</div>
                    <div>{item.gender}</div>
                    <div
                      className="flex items-center gap-x-2 text-secondary cursor-pointer whitespace-nowrap justify-end"
                      onClick={() => {
                        navigate(
                          `/admin/directory/member/personal-information?id=${item._id}`
                        );
                      }}>
                      <p>View more</p> <FaArrowRight />
                    </div>
                  </div>
                  <div className="w-full md:hidden">
                    <div
                      className="border-b border-[#BDBDBD]  flex py-2 text-[#555454] px-3 justify-between items-center hover:bg-gray-100"
                      onClick={() => {
                        navigate(
                          `/admin/directory/member/personal-information?id=${item._id}`
                        );
                      }}>
                      <div className="flex space-x-3 items-center">
                        {item.photo ? (
                          <img
                            src={item.photo}
                            className="rounded-full w-10 h-10 object-cover"
                            loading="lazy"
                          />
                        ) : (
                          <RxAvatar className="w-10 h-10" />
                        )}
                        <div>
                          <p className="font-azoSemiBold">
                            {item.firstName} {item.lastName}
                          </p>
                          <p>{item.phone}</p>
                        </div>
                      </div>
                      <SlArrowRight />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="mt-4 text-center">There's no member</div>
            )}
          </div>

          {/* <div className="flex justify-center items-center space-x-10 fixed bottom-14 text-sm md:text-base lg:bottom-2">
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
          </div> */}
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

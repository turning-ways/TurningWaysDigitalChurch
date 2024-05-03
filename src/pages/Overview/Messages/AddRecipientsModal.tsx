/* eslint-disable @typescript-eslint/no-explicit-any */
import Modal from "../../../components/Modal/Modal";
import { IoFilter } from "react-icons/io5";
import useGetAllMembers from "../../../hooks/Member/useGetAllMembers";
import { useEffect, useState } from "react";

interface AddRecipientsModalProps {
  onClose: () => void;
}

const AddRecipientsModal: React.FC<AddRecipientsModalProps> = ({ onClose }) => {
  
  const { data: members } = useGetAllMembers();

  const [selectAll, setSelectAll] = useState(false);
  const [memberCheckboxes, setMemberCheckboxes] = useState(
    Array(members?.length).fill(false)
  );
  const [displayedMembers, setDisplayedMembers] = useState([]);

  useEffect(() => {
    if (members) {
      setDisplayedMembers([...members]);
    }
  }, [members]);
  

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    setSelectAll(isChecked);
    setMemberCheckboxes(memberCheckboxes.map(() => isChecked));
  };

  const handleMemberCheckboxChange = (index: number) => {
    const updatedCheckboxes = [...memberCheckboxes];
    updatedCheckboxes[index] = !updatedCheckboxes[index];
    setMemberCheckboxes(updatedCheckboxes);
    setSelectAll(updatedCheckboxes.every((checkbox) => checkbox === true));
  };

  const handleDisplayButtonClick = () => {
    const selectedMembers = members?.filter(
      (_: any, index: number) => memberCheckboxes[index]
    );
    setDisplayedMembers(selectedMembers ? selectedMembers : []);
    console.log(displayedMembers);
  };

  return (
    <Modal>
      <div className="bg-white p-6 rounded-xl m-10 max-h-screen overflow-y-scroll">
        <div className="p-4 flex justify-between items-center">
          <div className="flex space-x-2 text-[#7F7F7F]">
            <input type="checkbox" />
            <p>40 Persons</p>
          </div>
          <div className="flex items-center space-x-2 cursor-pointer text-[#AAAAAA]">
            <p>
              <IoFilter />
            </p>
            <p>Filter</p>
          </div>
        </div>
        <div className="border rounded-xl">
          <div className="grid grid-cols-[100px,210px,280px,150px,150px,auto] gap-4 border-b p-4 ">
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

          {members?.map((item: any, index: number) => (
            <div className="grid grid-cols-[100px,210px,280px,150px,150px,auto] gap-4 border-b p-4  ">
              <div className="flex space-x-1 items-center">
                <input
                  type="checkbox"
                  checked={memberCheckboxes[index]}
                  onChange={() => handleMemberCheckboxChange(index)}
                />
                <p>pic</p>
              </div>
              <div className="">{item.first_name + " " + item.last_name}</div>
              <div className="">{item.email}</div>
              <div className="">{item.phone.MainPhone}</div>
              <div className="">{item.gender}</div>
            </div>
          ))}
        </div>
        <div className="flex justify-center space-x-8 mt-6">
          <button
            className="text-[#4C4C4C] bg-[#F4F4F4] rounded-lg w-64 py-2 text-lg"
            onClick={handleDisplayButtonClick}
          >
            Add Recipients
          </button>
          <button
            className="text-[#4E4E4E] bg-white rounded-lg w-64 py-2 text-lg border border-[#AAAAAA]"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default AddRecipientsModal;

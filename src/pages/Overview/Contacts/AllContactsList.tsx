import { useState } from "react";
import { PiDotsThreeCircleVertical } from "react-icons/pi";
import ContactsModal from "./ContactsModal";

import { memberDetails } from "./contactdata";

const AllContactsList = () => {


  const [show, setShow] = useState<number | null>(null);
  return (
    <>
      <div className="flex flex-col">
        <div className="grid grid-cols-[120px,150px,150px,150px,100px,auto] gap-4 py-2  w-full bg-[#E8EDFF] rounded-t-md border border-[#E6E6E6] px-3 items-center">
          <div className="flex space-x-1 items-center">Name</div>
          <div className="">Phone Number</div>
          <div className="">Assigned To</div>
          <div className="">Label</div>
          <div className="">Status</div>
          <div className="">Modified</div>
        </div>

        {memberDetails.map((member) => (
          <div className="flex flex-col relative">
            <div className="grid grid-cols-[120px,150px,150px,150px,100px,auto] gap-4 py-2 px-3  w-full border-b border-x text-[#636363]">
              <div className="flex space-x-2 items-center">
                <input type="checkbox" />
                <p>{member.name}</p>
              </div>
              <div className="">{member.phone}</div>
              <div className="">{member.assignedTo}</div>
              <div className="">{member.label}</div>
              <div className="text-[#61BD74]">{member.status}</div>
              <div className="flex items-center justify-between">
                <p>{member.modified}</p>
                <PiDotsThreeCircleVertical
                  className="text-[#727272] text-2xl cursor-pointer"
                  onClick={() => setShow(member.id)}
                />
              </div>
            </div>
            <ContactsModal
              show={show}
              id={member.id}
              onClose={() => setShow(null)}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default AllContactsList;

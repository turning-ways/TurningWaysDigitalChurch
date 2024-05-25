import { PiDotsThreeCircleLight } from "react-icons/pi";
import { memberDetails } from "./contactdata";
import { useState } from "react";
import ContactsModal from "./ContactsModal";

const AllContactsGallery = () => {
  const [show, setShow] = useState<number | null>(null);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6">
      {memberDetails.map((member) => (
        <div className="text-[#2A2A2A] border border-[#2A2A2A] w-full rounded-2xl p-4 relative flex flex-col">
          <div className="flex items-center justify-between ">
            <p className="font-azoSemiBold text-xl">{member.name}</p>
            <PiDotsThreeCircleLight
              className="text-3xl cursor-pointer"
              onClick={() => setShow(member.id)}
            />
          </div>
          <div className="flex items-center justify-between mt-2">
            <p>+{member.phone}</p>
            <p className="text-[#A33B3B]">{member.status}</p>
          </div>
          <div className="flex mt-4 space-x-4">
            <div className="bg-[#EEECEC] rounded-lg px-[10px] py-3 text-sm">
              {member.label}
            </div>
            <div className="bg-[#EBCAF9] rounded-lg px-[10px] py-3 text-sm">
              {member.label}
            </div>
          </div>
          <hr className="my-8 " />
          <div className="flex justify-between">
            <p>
              <span className="font-azoSemiBold">Last Modified:</span>{" "}
              {member.modified}
            </p>
            <div className="w-5 h-5 bg-red-400 rounded-full" />
          </div>
          <ContactsModal
            show={show}
            id={member.id}
            onClose={() => setShow(null)}
          />
        </div>
      ))}
    </div>
  );
};

export default AllContactsGallery;

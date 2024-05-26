import { PiDotsThreeCircleLight } from "react-icons/pi";
import { useState } from "react";
import ContactsModal from "./ContactsModal";
import useGetAllContacts from "../../../hooks/Contacts/useGetAllContacts";

const AllContactsGallery = () => {
  const [show, setShow] = useState<string | null>(null);
  const { data: contacts } = useGetAllContacts();
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);

    const getOrdinalNum = (n: number) => {
      return (
        n +
        (n > 0
          ? ["th", "st", "nd", "rd"][
              (n > 3 && n < 21) || n % 10 > 3 ? 0 : n % 10
            ]
          : "")
      );
    };

    const day = getOrdinalNum(date.getUTCDate());
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getUTCFullYear();

    let hours = date.getUTCHours();
    const minutes = date.getUTCMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'

    const formattedTime = `${hours}:${minutes} ${ampm}`;

    return `${day} ${month} ${year} ${formattedTime}`;
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6">
      {contacts ?
        contacts.map((contact) => (
          <div className="text-[#2A2A2A] border border-[#2A2A2A] w-full rounded-2xl p-4 relative flex flex-col">
            <div className="flex items-center justify-between ">
              <p className="font-azoSemiBold text-xl">
                {contact.firstName + " " + contact.lastName}
              </p>
              <PiDotsThreeCircleLight
                className="text-3xl cursor-pointer"
                onClick={() => setShow(contact._id)}
              />
            </div>
            <div className="flex items-center justify-between mt-2">
              <p>{contact.phoneNumber}</p>
              <p className="text-[#A33B3B]">{contact.status}</p>
            </div>
            <div className="flex mt-4 space-x-4">
              <div className="bg-[#EEECEC] rounded-lg px-[10px] py-3 text-sm">
                label_1
              </div>
              <div className="bg-[#EBCAF9] rounded-lg px-[10px] py-3 text-sm">
                label_two
              </div>
            </div>
            <hr className="my-8 " />
            <div className="flex justify-between">
              <p>
                <span className="font-azoSemiBold">Last Modified:</span>{" "}
                {formatDate(contact.ModifiedDate)}
              </p>
              <div className="w-5 h-5 bg-red-400 rounded-full" />
            </div>
            <ContactsModal
              show={show}
              id={contact._id}
              onClose={() => setShow(null)}
            />
          </div>
        )) : <p>No Contacts have been added yet</p>}
    </div>
  );
};

export default AllContactsGallery;

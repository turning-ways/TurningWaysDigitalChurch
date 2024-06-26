import { useState } from "react";
import { PiDotsThreeCircleVertical } from "react-icons/pi";
import ContactsModal from "./ContactsModal";

import { SlArrowRight } from "react-icons/sl";
import { useGetAllContacts } from "../../../hooks/useContact";
import { useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";

const AllContactsList = () => {
  const [show, setShow] = useState<string | null>(null);
  const { data: contacts, isPending } = useGetAllContacts();
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

    let hours = date.getUTCHours() + 1;
    const minutes = date.getUTCMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'

    const formattedTime = `${hours}:${minutes} ${ampm}`;

    return `${day} ${month} ${year} ${formattedTime}`;
  };

  const navigate = useNavigate();
  return (
    <>
      <div className="flex flex-col">
        {contacts && Array.isArray(contacts) && !isPending && (
          <div className="xl:grid grid-cols-[120px,150px,150px,150px,100px,auto] gap-4 py-2  w-full bg-[#E8EDFF] rounded-t-md border border-[#E6E6E6] px-3 items-center hidden">
            <div className="flex space-x-1 items-center ">Name</div>
            <div className="">Phone Number</div>
            <div className="">Assigned To</div>
            <div className="">Label</div>
            <div className="">Status</div>
            <div className="">Modified</div>
          </div>
        )}

        <div className="border-t xl:hidden border-[#BDBDBD]" />

        {contacts &&
          Array.isArray(contacts) &&
          !isPending &&
          contacts.map((contact) => (
            <>
              <div className="xl:flex flex-col relative hidden">
                <div className="grid grid-cols-[120px,150px,150px,150px,100px,auto] gap-4 py-2 px-3  w-full border-b border-x text-[#636363]">
                  <div className="flex space-x-2 items-center truncate">
                    {/* <input type="checkbox" /> */}
                    <p className="truncate max-w-full">
                      {contact.firstName + " " + contact.lastName}
                    </p>
                  </div>
                  <div className="">{contact.phoneNumber}</div>
                  <div className="tuncate">
                    <p className="max-w-full truncate">
                      {contact.assignedTo && contact.assignedTo.length > 0
                        ? `${contact.assignedTo[0].first_name} ${contact.assignedTo[0].last_name}`
                        : "No assigned member"}
                    </p>
                  </div>
                  <div className="">
                    <p className="max-w-full truncate">
                      {contact.labels && contact.labels.length > 0
                        ? `${contact.labels[0].label} `
                        : "NIL"}
                    </p>
                  </div>
                  <div
                    className={`text-[#61BD74] ${
                      contact.status === "not started" && "text-[#555555]"
                    } ${contact.status === "open" && "text-[#B061BD]"} ${
                      contact.status === "won" && "text-[#61BD74]"
                    } ${contact.status === "lost" && "text-[#BD6161]"}`}
                  >
                    {contact.status}
                  </div>
                  <div className="flex items-center justify-between">
                    <p>{formatDate(contact.modifiedDate)}</p>
                    <PiDotsThreeCircleVertical
                      className="text-[#727272] text-2xl cursor-pointer"
                      onClick={() => setShow(contact._id ? contact._id : null)}
                    />
                  </div>
                </div>
                <ContactsModal
                  show={show}
                  id={contact._id}
                  onClose={() => setShow(null)}
                />
              </div>
              <div className="xl:hidden">
                <div
                  className="border-b border-[#BDBDBD]  flex py-2 text-[#555454] px-3 justify-between items-center cursor-pointer"
                  onClick={() =>
                    navigate(`/admin/contacts/${contact._id}`)
                  }
                >
                  <div>
                    <p>{contact.firstName + " " + contact.lastName}</p>
                    <p>{formatDate(contact.modifiedDate)}</p>
                  </div>
                  <SlArrowRight />
                </div>
              </div>
            </>
          ))}
        {!contacts && (
          <p className="text-sm text-[#D9D9D9]">No contacts have been added</p>
        )}
      </div>
      {isPending && <ThreeDots color="black" width={24} height={24} />}
    </>
  );
};

export default AllContactsList;

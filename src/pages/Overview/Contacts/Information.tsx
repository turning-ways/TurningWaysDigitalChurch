import { BiSolidDownArrow } from "react-icons/bi";
import Heading from "./Heading";
import { useEffect, useState } from "react";
import { useGetContacts, useUpdateContactStatus } from "../../../hooks/useContact";
import UpdateContact from "./UpdateContact";
import { useUserAuth } from "../../../stores/user";

const Information = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [openStatus, setOpenStatus] = useState<boolean>(false);

  const { data: contact } = useGetContacts();

  useEffect(() => {
    if (contact) {
      setStatus(contact.status);
    }
  }, [contact]);
  const [status, setStatus] = useState<string | null>(null);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);

    const getOrdinalSuffix = (day: number) => {
      if (day > 3 && day < 21) return "th";
      switch (day % 10) {
        case 1:
          return "st";
        case 2:
          return "nd";
        case 3:
          return "rd";
        default:
          return "th";
      }
    };

    const day = date.getUTCDate();
    const ordinalSuffix = getOrdinalSuffix(day);
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getUTCFullYear();

    return `${day}${ordinalSuffix} ${month} ${year}`;
  };

  const queryParams = new URLSearchParams(location.search);

  const contactId = queryParams.get("id");

  const { mutate } = useUpdateContactStatus({id: contactId??"", onClose: () => console.log("status changed")});

  const { user } = useUserAuth();

  
  return (
    <div className="relative">
      <Heading text="Contact Information" />
      <h2 className="md:mt-4">
        {contact && contact.firstName && contact.lastName ? (
          contact.firstName + " " + contact.lastName
        ) : (
          <span className="skeleton skeleton-text w-60"></span>
        )}
      </h2>
      <div className="md:flex justify-between items-center space-y-2 md:space-y-0 mb-8 md:mb-0">
        <p className="text-sm text-[#A1A0A0] mb-4 md:mb-0">
          {contact && contact.createdAt && contact.ModifiedDate ? (
            `Created: ${formatDate(
              contact.createdAt
            )} | Last Modified: ${formatDate(contact.ModifiedDate)}`
          ) : (
            <span className="skeleton skeleton-text w-96"></span>
          )}
        </p>
        <div className="flex space-x-4 relative">
          <button
            className={` text-white flex items-center py-2 px-6 rounded-lg space-x-1 min-w-20 ${
              status === "new" && "bg-[#A561BD]"
            } ${status === "contacted" && "bg-[#555555]"} ${
              status === "won" && "bg-[#61BD74]"
            } ${status === "lost" && "bg-[#BD6161]"}`}
            onClick={() => setOpenStatus(!openStatus)}
          >
            <span>{status}</span> <BiSolidDownArrow className="text-[10px]" />
          </button>
          <button
            className="border border-[#17275B] text-[#17275B] px-4 py-2 rounded-lg"
            onClick={() => setOpen(!open)}
          >
            Edit Contact
          </button>
          {openStatus && (
            <div
              className={`modal bg-white rounded-2xl w-[280px] px-6 py-4 space-y-6 border -left-4 md:left-auto md:right-[136px] absolute top-12 z-50 `}
            >
              <ul className="  space-y-2">
                <li
                  className="text-[#555555] cursor-pointer"
                  onClick={() => {
                    setOpenStatus(false);
                    setStatus("contacted");
                    mutate({ status: "contacted", modifiedBy: user?._id });
                  }}
                >
                  contacted
                </li>
                <li
                  className="text-[#B061BD] cursor-pointer"
                  onClick={() => {
                    setOpenStatus(false);
                    setStatus("new");
                    mutate({ status: "new", modifiedBy: user?._id });
                  }}
                >
                  new
                </li>
                <li
                  className="text-[#61BD74] cursor-pointer"
                  onClick={() => {
                    setOpenStatus(false);
                    setStatus("won");
                    mutate({ status: "won", modifiedBy: user?._id });
                  }}
                >
                  won
                </li>
                <li
                  className="text-[#BD6161] cursor-pointer"
                  onClick={() => {
                    setOpenStatus(false);
                    setStatus("lost");
                    mutate({ status: "lost", modifiedBy: user?._id });
                  }}
                >
                  lost
                </li>
              </ul>
              <button
                className="text-[#7A7A7A] bg-[#F3F3F3] px-6 py-2 w-full rounded-[14px] hover:text-[#2A2A2A]"
                onClick={() => setOpenStatus(!openStatus)}
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
      {open && <UpdateContact onClose={() => setOpen(!open)} />}
    </div>
  );
};

export default Information;

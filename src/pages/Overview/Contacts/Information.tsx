import { BiSolidDownArrow } from "react-icons/bi";
import Heading from "./Heading";
import { IoIosClose } from "react-icons/io";
import InformationInput from "../Membership/Edit Profile/InformationInput";
import { useEffect, useState } from "react";
import PhoneNumber from "../../../components/Input/PhoneNumber";
import Modal from "../../../components/Modal/Modal";
import useGetContacts from "../../../hooks/Contacts/useGetContact";
import useUpdateContactStatus from "../../../hooks/Contacts/useUpdateContactStatus";
import useUpdateContact from "../../../hooks/Contacts/useUpdateContact";
import { ThreeDots } from "react-loader-spinner";

const Information = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [maturity, setMaturity] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

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

  const { mutate } = useUpdateContactStatus();

  const { mutate: update, isPending } = useUpdateContact();

  const handleEdit = () => {
    update({
      firstName,
      lastName,
      address,
      maturity,
      phoneNumber,
      email,
    });
  };

  useEffect(() => {
    if (contact) {
      setFirstName(contact.firstName);
      setLastName(contact.lastName);
      setAddress(contact.address);
      setMaturity(contact.maturity);
      setPhoneNumber(contact.phoneNumber);
      setEmail(contact.email);
    }
  }, [contact]);

  return (
    <div className="relative">
      <Heading text="Contact Information" />
      <h2 className="md:mt-4">
        {contact && contact.firstName && contact.lastName
          ? contact.firstName + " " + contact.lastName
          : "NA"}
      </h2>
      <div className="md:flex justify-between items-center space-y-2 md:space-y-0 mb-8 md:mb-0">
        <p className="text-sm text-[#A1A0A0] mb-4 md:mb-0">
          {contact && contact.createdAt && contact.ModifiedDate
            ? `Created: ${formatDate(
                contact.createdAt
              )} | Last Modified: ${formatDate(contact.ModifiedDate)}`
            : "NA"}
        </p>
        <div className="flex space-x-4 relative">
          <button
            className={` text-white flex items-center py-2 px-6 rounded-lg space-x-1 ${
              status === "new" && "bg-[#A561BD]"
            } ${status === "contacted" && "bg-[#555555]"} ${
              status === "won" && "bg-[#61BD74]"
            } ${status === "lost" && "bg-[#BD6161]"}`}
            onClick={() => setOpenStatus(!openStatus)}
          >
            <span>{status}</span> <BiSolidDownArrow className="text-[10px]" />
          </button>
          <button
            className="border border-[#17275B] text-[#17275B] px-4 rounded-lg"
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
                    mutate({ status: "contacted" });
                  }}
                >
                  contacted
                </li>
                <li
                  className="text-[#B061BD] cursor-pointer"
                  onClick={() => {
                    setOpenStatus(false);
                    setStatus("new");
                    mutate({ status: "new" });
                  }}
                >
                  new
                </li>
                <li
                  className="text-[#61BD74] cursor-pointer"
                  onClick={() => {
                    setOpenStatus(false);
                    setStatus("won");
                    mutate({ status: "won" });
                  }}
                >
                  won
                </li>
                <li
                  className="text-[#BD6161] cursor-pointer"
                  onClick={() => {
                    setOpenStatus(false);
                    setStatus("lost");
                    mutate({ status: "lost" });
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
      {open && (
        <Modal>
          <form
            className="w-[450px] md:w-[605px] bg-white px-6 py-6 border rounded-2xl flex flex-col"
            onSubmit={(e) => {
              e.preventDefault();
              handleEdit();
            }}
          >
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl">Edit Contact</h1>
              <IoIosClose
                className="text-5xl cursor-pointer"
                onClick={() => setOpen(!open)}
              />
            </div>
            <InformationInput
              text={"First Name"}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
              value={firstName}
            />
            <InformationInput
              text={"Last Name"}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
              value={lastName}
              notCompulsory={" "}
            />
            <PhoneNumber
              value={phoneNumber}
              setValue={(value) => setPhoneNumber(value)}
            />
            <InformationInput
              text={"Email"}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              value={email}
              notCompulsory={" "}
            />
            <InformationInput
              text={"Address"}
              onChange={(e) => {
                setAddress(e.target.value);
              }}
              value={address}
              notCompulsory={" "}
            />
            <InformationInput
              text={"Maturity"}
              onChange={(e) => {
                setMaturity(e.target.value);
              }}
              value={maturity}
              notCompulsory={" "}
            />
            <button className="self-end border border-[#414141] px-20 py-2 rounded-lg text-[#141414]">
              {!isPending ? (
                <p>Save</p>
              ) : (
                <ThreeDots height="25" width="50" color="#141414" />
              )}
            </button>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default Information;

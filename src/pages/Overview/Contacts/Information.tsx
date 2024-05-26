import { BiSolidDownArrow } from "react-icons/bi";
import Heading from "./Heading";
import { IoIosClose } from "react-icons/io";
import InformationInput from "../Membership/Edit Profile/InformationInput";
import { useState } from "react";
import PhoneNumber from "../../../components/Input/PhoneNumber";
import Modal from "../../../components/Modal/Modal";

const Information = () => {
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [maturity, setMaturity] = useState("");
  const [phone, setPhone] = useState("");

  const [open, setOpen] = useState<boolean>(false);
  const [openStatus, setOpenStatus] = useState<boolean>(false);

  const [status, setStatus] = useState<string>("Open");

  return (
    <div className="relative">
      <Heading text="Contact Information" />
      <h2 className="md:mt-4">Ikeokwu Somtochi Purity</h2>
      <div className="md:flex justify-between items-center space-y-2 md:space-y-0 mb-8 md:mb-0">
        <p className="text-sm text-[#A1A0A0] mb-4 md:mb-0">
          Created: 12th May 2024 | Last Modified: 12th May 2024
        </p>
        <div className="flex space-x-4 relative">
          <button
            className={` text-white flex items-center py-2 px-6 rounded-lg space-x-1 ${
              status === "Open" && "bg-[#A561BD]"
            } ${status === "Not Started" && "bg-[#555555]"} ${
              status === "Soul Won" && "bg-[#61BD74]"
            } ${status === "Soul Lost" && "bg-[#BD6161]"}`}
            onClick={() => setOpenStatus(!openStatus)}
          >
            <span>{status}</span> <BiSolidDownArrow />
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
                    setStatus("Not Started");
                  }}
                >
                  Not Started
                </li>
                <li
                  className="text-[#B061BD] cursor-pointer"
                  onClick={() => {
                    setOpenStatus(false);
                    setStatus("Open");
                  }}
                >
                  Open
                </li>
                <li
                  className="text-[#61BD74] cursor-pointer"
                  onClick={() => {
                    setOpenStatus(false);
                    setStatus("Soul Won");
                  }}
                >
                  Soul Won
                </li>
                <li
                  className="text-[#BD6161] cursor-pointer"
                  onClick={() => {
                    setOpenStatus(false);
                    setStatus("Soul Lost");
                  }}
                >
                  Soul Lost
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
          <div className="w-[450px] md:w-[605px] bg-white px-6 py-6 border rounded-2xl flex flex-col">
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
              value={first_name}
            />
            <InformationInput
              text={"Last Name"}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
              value={last_name}
              notCompulsory={" "}
            />
            <PhoneNumber value={phone} setValue={(value) => setPhone(value)} />
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
              Save
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Information;

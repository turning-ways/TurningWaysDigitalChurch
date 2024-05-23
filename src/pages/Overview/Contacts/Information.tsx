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

  return (
    <div className="relative">
      <Heading text="Contact Information" />
      <h2 className="mt-4">Ikeokwu Somtochi Purity</h2>
      <div className="flex justify-between items-center">
        <p className="text-sm text-[#A1A0A0]">
          Created: 12th May 2024 | Last Modified: 12th May 2024
        </p>
        <div className="flex space-x-4">
          <button className="bg-[#A561BD] text-white flex items-center py-2 px-6 rounded-lg space-x-1">
            <span>Open</span> <BiSolidDownArrow />
          </button>
          <button
            className="border border-[#17275B] text-[#17275B] px-4 rounded-lg"
            onClick={() => setOpen(!open)}
          >
            Edit Contact
          </button>
        </div>
      </div>
      {open && (
        <Modal>
          <div className="w-[605px] bg-white px-6 py-6 border rounded-lg flex flex-col">
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

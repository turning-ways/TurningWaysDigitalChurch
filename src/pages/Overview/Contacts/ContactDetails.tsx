import { IoIosArrowBack } from "react-icons/io";
import Header from "../Header";
import OverviewContainer from "../OverviewContainer";
import { BiSend } from "react-icons/bi";
import { DropDownInput } from "../../../components/DropDownMenu/DropDownInput";
import { useState } from "react";
import Heading from "./Heading";
import { IoIosAddCircle, IoIosClose } from "react-icons/io";
import Information from "./Information";
import { useNavigate } from "react-router-dom";

const ContactDetails = () => {
  const [membership, setMembership] = useState("");
  const handleMembership = (value: string) => {
    setMembership(value);
  };
  const [maturity, setMaturity] = useState("");
  const handleMaturity = (value: string) => {
    setMaturity(value);
  };

  const [background, setBackGround] = useState<number | null>(null);

  const navigate = useNavigate();
  return (
    <OverviewContainer active="Contacts">
      <Header text="Contacts" />
      <button
        className="bg-[#F1F0F3] rounded-lg p-2 w-fit cursor-pointer h-fit my-6"
        onClick={() => navigate("/admin/contacts")}
      >
        <IoIosArrowBack className=" text-2xl w-auto text-[#6C6C6D]" />
      </button>
      <Information />
      <div className="grid grid-cols-2 gap-x-4 ">
        <DropDownInput
          text="Membership:"
          items={["In progress", "Completed"]}
          placeholder="In Progress"
          onSelect={handleMembership}
          value={membership}
          onChange={(value) => setMembership(value)}
        />
        <DropDownInput
          text="Maturity:"
          items={["Adult", "Child"]}
          placeholder="Adult"
          onSelect={handleMaturity}
          value={maturity}
          onChange={(value) => setMaturity(value)}
        />
        <div className=" space-y-1">
          <p className="text-[#727272]">Phone Number</p>
          <div className="border border-[#D9D9D9] rounded-lg p-2 ">
            <input
              className="outline-none text-[#434343] text-lg w-full bg-transparent"
              readOnly={true}
              value={"09073210998"}
            />
          </div>
        </div>
        <div className=" space-y-1">
          <p className="text-[#727272]">Email</p>
          <div className="border border-[#D9D9D9] rounded-lg p-2">
            <input
              className="outline-none text-[#434343] text-lg w-full bg-transparent"
              readOnly={true}
              value={"@yahoo.com"}
            />
          </div>
        </div>
        <div className=" space-y-1 col-span-2 my-4">
          <p className="text-[#727272]">Address</p>
          <div className="border border-[#D9D9D9] rounded-lg p-2">
            <input
              className="outline-none text-[#434343] text-lg w-full bg-transparent"
              readOnly={true}
              value={"Ojodu Berger"}
            />
          </div>
        </div>
      </div>
      <Heading text="Label" />
      <div className="flex space-x-3 items-center">
        <IoIosAddCircle className="text-5xl text-[#444343]" />
        <div className="border border-[#923863] rounded-md bg-[#E6A5B4] text-[#141414] flex items-center px-2 py-1">
          <p>Will attend Service</p>
          <IoIosClose className="text-3xl cursor-pointer" />
        </div>
      </div>
      <Heading text="Action checklist" />
      <ul className="space-y-2">
        <li className="flex space-x-2">
          <div
            className={`border-2 border-[#2A2A2A] w-5 h-5 rounded-full cursor-pointer ${
              background === 1 && "bg-blue-500"
            }`}
            onClick={() => setBackGround(1)}
          />
          <p>Visit at home</p>
        </li>
        <li className="flex space-x-2">
          <div
            className={`border-2 border-[#2A2A2A] w-5 h-5 rounded-full cursor-pointer ${
              background === 2 && "bg-blue-500"
            }`}
            onClick={() => setBackGround(2)}
          />
          <p>Call every Saturday</p>
        </li>
        <li className="flex space-x-2">
          <div
            className={`border-2 border-[#2A2A2A] w-5 h-5 rounded-full cursor-pointer ${
              background === 3 && "bg-blue-500"
            }`}
            onClick={() => setBackGround(3)}
          />
          <p>Add an Item</p>
        </li>
      </ul>
      <Heading text="Assigned To" />
      <div className="flex space-x-3">
        <IoIosAddCircle className="text-5xl text-[#444343]" />
        {Array.from({ length: 3 }, () => (
          <div className="bg-[#7F7E7E] text-white rounded-full h-full w-12 flex items-center justify-center">
            OF
          </div>
        ))}
      </div>
      <Heading text="Comments" />
      <div className="bg-white w-full flex mb-2 items-stretch">
        <input
          type="text"
          className="flex-grow text-black p-2 outline-none shadow-md"
          style={{ boxShadow: "0px 0px 4px 0px #00000040" }}
          placeholder="Type your comment here"
        />
        <button className=" bg-[#17275B] text-white px-3 flex items-center">
          <BiSend />
        </button>
      </div>
      <div className="flex w-full space-x-4 mt-4">
        <div className="bg-[#D9D9D9] text-[#707070] flex justify-center items-center p-3 rounded-full ">
          BO
        </div>
        <div className="w-full">
          <div className="text-[#7F7E7E] flex justify-between ">
            <p>Bolu Olamide</p>
            <p>21st May 2024 21:00</p>
          </div>
          <p className="text-[#555454]">
            Somto said that she is a member of another church
          </p>
        </div>
      </div>
    </OverviewContainer>
  );
};

export default ContactDetails;

import { IoIosArrowBack } from "react-icons/io";
import Header from "../Header";
import OverviewContainer from "../OverviewContainer";
import { BiSend } from "react-icons/bi";
import { DropDownInput } from "../../../components/DropDownMenu/DropDownInput";
import { useEffect, useState } from "react";
import Heading from "./Heading";
import { IoIosAddCircle, IoIosClose } from "react-icons/io";
import Information from "./Information";
import { useNavigate } from "react-router-dom";
import useGetContacts from "../../../hooks/Contacts/useGetContact";
import useUpdateContactStatus from "../../../hooks/Contacts/useUpdateContactStatus";
import useUpdateContact from "../../../hooks/Contacts/useUpdateContact";
import useAddContactComment from "../../../hooks/Contacts/useAddContactComment";
import { useUserAuth } from "../../../stores/user";
import { formatTheDate } from "./formatDate";
import { action, labels } from "../../../constants/constants";
import Modal from "../../../components/Modal/Modal";
import useGetAllMembers from "../../../hooks/Member/useGetAllMembers";
import useAssignMember from "../../../hooks/Contacts/useAssignMember";
import useAddLabel from "../../../hooks/Contacts/useAddLabel";
import useDeleteLabel from "../../../hooks/Contacts/useDeleteLabel";
import Color from "color";

const ContactDetails = () => {
  const [showActions, setShowActions] = useState<boolean>(false);
  const [showMembers, setShowMembers] = useState<boolean>(false);
  const [showLabels, setShowLabels] = useState<boolean>(false);
  const { data: members } = useGetAllMembers({ page: 1, pageSize: 100000 });
  const queryParams = new URLSearchParams(location.search);

  const contactId = queryParams.get("id");
  const { mutate } = useUpdateContactStatus(contactId);
  const { mutate: update } = useUpdateContact();
  const [membershipStatus, setMembershipStatus] = useState("");
  const handleMembershipStatus = (value: string) => {
    setMembershipStatus(value);
    mutate({ membershipStatus: value });
  };
  const [maturity, setMaturity] = useState("");
  const handleMaturity = (value: string) => {
    setMaturity(value);
    update({ maturity: value });
  };

  const { mutate: addLabel } = useAddLabel();

  // const [background, setBackGround] = useState<number | null>(null);

  const navigate = useNavigate();

  const [comment, setComment] = useState("");

  const { data: contact } = useGetContacts();
  useEffect(() => {
    if (contact) {
      setMaturity(contact.maturity);
      setMembershipStatus(contact.membershipStatus);
    }
  }, [contact]);

  const { mutate: addComment } = useAddContactComment();

  const { mutate: assignMember } = useAssignMember();

  const { user } = useUserAuth();

  const { mutate: deleteLabel } = useDeleteLabel();

  const getDarkerShade = (color: string, amount: number = 0.2): string => {
    return Color(color).darken(amount).hex();
  };
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
      <div className="md:grid md:grid-cols-2 gap-x-4 ">
        <DropDownInput
          text="Membership:"
          items={["in progress", "potential", "confirmed", "cancelled"]}
          placeholder="In Progress"
          onSelect={handleMembershipStatus}
          value={membershipStatus}
          onChange={(value) => setMembershipStatus(value)}
        />
        <DropDownInput
          text="Maturity:"
          items={["adult", "child", "teen"]}
          placeholder="Adult"
          onSelect={handleMaturity}
          value={maturity}
          onChange={(value) => setMaturity(value)}
        />
        <div className=" space-y-1 mb-4 md:mb-0">
          <p className="text-[#727272]">Phone Number</p>
          <div className="border border-[#D9D9D9] rounded-lg p-2 ">
            <input
              className="outline-none text-[#434343] text-lg w-full bg-transparent"
              readOnly={true}
              value={contact ? contact.phoneNumber : ""}
            />
          </div>
        </div>
        <div className=" space-y-1">
          <p className="text-[#727272]">Email</p>
          <div className="border border-[#D9D9D9] rounded-lg p-2">
            <input
              className="outline-none text-[#434343] text-lg w-full bg-transparent"
              readOnly={true}
              value={contact ? contact.email : ""}
            />
          </div>
        </div>
        <div className=" space-y-1 col-span-2 my-4">
          <p className="text-[#727272]">Address</p>
          <div className="border border-[#D9D9D9] rounded-lg p-2">
            <input
              className="outline-none text-[#434343] text-lg w-full bg-transparent"
              readOnly={true}
              value={contact ? contact.address : ""}
            />
          </div>
        </div>
      </div>
      <Heading text="Label" />
      <div className="flex space-x-3 items-center w-full">
        <IoIosAddCircle
          className="text-5xl text-[#444343] cursor-pointer"
          onClick={() => setShowLabels(!showLabels)}
        />
        <div className="overflow-x-scroll flex space-x-3 scrollbar-hide">
          {contact &&
            contact.labels &&
            contact.labels.length > 0 &&
            contact.labels.map((item) => (
              <div
                style={{
                  backgroundColor: getDarkerShade(item.label_type, -0.7),
                  borderColor: getDarkerShade(item.label_type, 0.3),
                }}
                className={`border border-[${item.label_type}] rounded-md text-[#141414] w-full flex items-center px-2 py-1 whitespace-nowrap`}
              >
                <p>{item.label}</p>
                <IoIosClose
                  className="text-3xl cursor-pointer"
                  onClick={() => deleteLabel(item.label)}
                />
              </div>
            ))}
        </div>
        {showLabels && (
          <Modal>
            <div
              className={`w-[400px] bg-white px-6 py-6 border rounded-2xl flex flex-col space-y-4`}
            >
              {labels.map((item) => (
                <ul className="text-[#555555]">
                  <li
                    className="cursor-pointer"
                    onClick={() => {
                      const colors = [
                        "red",
                        "green",
                        "yellow",
                        "blue",
                        "purple",
                        "orange",
                        "grey",
                      ];
                      const randomIndex = Math.floor(
                        Math.random() * colors.length
                      );
                      const color = colors[randomIndex];
                      addLabel({ label: item, labelType: color });
                    }}
                  >
                    {item}
                  </li>
                </ul>
              ))}
              <button
                className="px-10 w-fit bg-[#F3F3F3] text-[#7A7A7A] self-center rounded-[14px] py-2"
                onClick={() => setShowLabels(!showLabels)}
              >
                Cancel
              </button>
            </div>
          </Modal>
        )}
      </div>
      <Heading text="Action checklist" />
      <ul className="space-y-2">
        {/* <li className="flex space-x-2">
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
        </li> */}
        <button
          className="py-1 px-4 rounded-lg border border-[#17275B] text-[#17275B]"
          onClick={() => setShowActions(!showActions)}
        >
          <p>Add an Item</p>
        </button>
      </ul>
      {showActions && (
        <Modal>
          <div
            className={`w-[400px] bg-white px-6 py-6 border rounded-2xl flex flex-col space-y-4`}
          >
            {action.map((item) => (
              <ul className="text-[#555555]">
                <li className="cursor-pointer">{item}</li>
              </ul>
            ))}
            <button
              className="px-10 w-fit bg-[#F3F3F3] text-[#7A7A7A] self-center rounded-[14px] py-2"
              onClick={() => setShowActions(!showActions)}
            >
              Cancel
            </button>
          </div>
        </Modal>
      )}
      <Heading text="Assigned To" />
      <div className="flex space-x-3">
        <IoIosAddCircle
          className="text-5xl text-[#444343]"
          onClick={() => setShowMembers(!showMembers)}
        />
        {contact &&
          contact.assignedTo &&
          contact.assignedTo.length > 0 &&
          contact.assignedTo.map((item) => (
            <div className="bg-[#7F7E7E] text-white rounded-full h-full w-12 flex items-center justify-center">
              {item.first_name.charAt(0).toUpperCase() +
                item.last_name.charAt(0).toUpperCase()}
            </div>
          ))}
        {showMembers && (
          <Modal>
            <div
              className={`w-[400px] bg-white px-6 py-6 border rounded-2xl flex flex-col space-y-4`}
            >
              {members ? (
                members.map((member, i) => (
                  <ul className="text-[#555555]">
                    <li
                      key={i}
                      className="cursor-pointer"
                      onClick={() => assignMember(member._id)}
                    >
                      {member.first_name + " " + member.last_name}
                    </li>
                  </ul>
                ))
              ) : (
                <p>There are no members present</p>
              )}
              <button
                className="px-10 w-fit bg-[#F3F3F3] text-[#7A7A7A] self-center rounded-[14px] py-2"
                onClick={() => setShowMembers(!showMembers)}
              >
                Cancel
              </button>
            </div>
          </Modal>
        )}
      </div>
      <Heading text="Comments" />
      <div className="bg-white w-full flex mb-2 items-stretch">
        <input
          type="text"
          className="flex-grow text-black p-2 outline-none shadow-md"
          style={{ boxShadow: "0px 0px 4px 0px #00000040" }}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Type your comment here"
        />
        <button
          className=" bg-[#17275B] text-white px-3 flex items-center"
          onClick={(e) => {
            e.preventDefault();
            addComment({ note: comment, recordedBy: user ? user._id : "" });
          }}
        >
          <BiSend />
        </button>
      </div>
      {Array.isArray(contact?.Notes) && contact.Notes.length > 0 ? (
        contact.Notes.map((item) => (
          <div className="flex w-full space-x-4 mt-4">
            <div className="bg-[#D9D9D9] text-[#707070] flex justify-center items-center p-3 rounded-full w-10 h-10">
              {contact.firstName.charAt(0).toUpperCase() +
                contact.lastName.charAt(0).toUpperCase()}
            </div>
            <div className="w-full">
              <div className="text-[#7F7E7E] flex justify-between items-center">
                <p className="text-sm sm:text-base">
                  {contact.firstName + " " + contact.lastName}
                </p>
                <p className="text-xs sm:text-sm">{formatTheDate(item.date)}</p>
              </div>
              <p className="text-[#555454]">{item.note}</p>
            </div>
          </div>
        ))
      ) : (
        <p>dire</p>
      )}
    </OverviewContainer>
  );
};

export default ContactDetails;

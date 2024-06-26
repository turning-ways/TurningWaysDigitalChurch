import { useEffect, useState } from "react";
import Modal from "../../../ui/Modal/Modal";
import {
  useUpdateContact,
  useGetContacts,
  useUpdateContactStatus,
} from "../../../hooks/useContact";
import InformationInput from "../Membership/Edit Profile/InformationInput";
import PhoneNumber from "../../../ui/Input/PhoneNumber";
import { IoIosClose } from "react-icons/io";
import { ThreeDots } from "react-loader-spinner";
import { DropDownInput } from "../../../ui/DropDownMenu/DropDownInput";
import { useParams } from "react-router-dom";
import { useUserAuth } from "../../../stores/user";

interface UpdateContactProps {
  onClose: () => void;
  id?: string;
}

const UpdateContact: React.FC<UpdateContactProps> = ({ onClose, id }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [maturity, setMaturity] = useState("");
  const [membership, setMembership] = useState("");
  // const [dateOfBirth, setDateOfBirth] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const { contact_id } = useParams();

  const { mutate: update, isPending } = useUpdateContact(
    onClose,
    contact_id ? contact_id : id
  );

  const { data: contact } = useGetContacts();

  const contactStatusQuery = useUpdateContactStatus({
    id: contact_id,
    onClose: () => console.log("status updated"),
  });

  const modifiedBy = useUserAuth((auth) => auth.user?._id);

  const handleEdit = () => {
    update({
      firstName,
      lastName,
      address,
      maturity: maturity ? maturity.toLowerCase() : maturity,
      phoneNumber,
      email,
    });
    contactStatusQuery.mutate({ membershipStatus: membership, modifiedBy });
  };

  useEffect(() => {
    if (contact) {
      setFirstName(contact.firstName);
      setLastName(contact.lastName);
      setAddress(contact.address);
      setMaturity(contact.maturity);
      setPhoneNumber(contact.phoneNumber);
      setEmail(contact.email);
      setMembership(contact.membershipStatus);
    }
  }, [contact]);

  return (
    <Modal onClose={onClose}>
      <form
        className="w-[450px] z-[999] md:w-[605px] bg-white px-6 py-6 border rounded-2xl flex flex-col max-h-[600px] overflow-y-scroll"
        onSubmit={(e) => {
          e.preventDefault();
          handleEdit();
        }}
      >
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl">Edit Contact</h1>
          {id}
          <IoIosClose className="text-5xl cursor-pointer" onClick={onClose} />
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
        <DropDownInput
          text="Maturity"
          items={["Child", "Adult", "Teen"]}
          placeholder="Child, Adult or Teen"
          compulsory=" "
          onSelect={(value) => setMaturity(value)}
          value={maturity}
          onChange={(maturity) => setMaturity(maturity)}
        />
        <DropDownInput
          text="Membership:"
          items={["potential", "confirmed", "cancelled"]}
          placeholder="potential, confirmed, cancelled"
          onSelect={(value) => setMembership(value)}
          value={membership}
          onChange={(value) => setMembership(value)}
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
        {/* <div className=" space-y-1 mb-4">
        <p className="text-[#727272]">
          D.O.B <span className="text-[#61BD74]"> *</span>
        </p>
        <div className="border rounded-lg p-2">
          <input
            className="outline-none text-[#434343] text-lg w-full"
            type="date"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
          />
        </div>
      </div> */}
        <button className="self-end border border-[#414141] px-20 py-2 rounded-lg text-[#141414] sticky bottom-0 bg-white">
          {!isPending ? (
            <p>Save</p>
          ) : (
            <ThreeDots height="25" width="50" color="#141414" />
          )}
        </button>
      </form>
    </Modal>
  );
};

export default UpdateContact;

import { IoIosClose } from "react-icons/io";
import Modal from "../../../components/Modal/Modal";
import InformationInput from "../Membership/Edit Profile/InformationInput";
import PhoneNumber from "../../../components/Input/PhoneNumber";
import { useState } from "react";
import useAddContact from "../../../hooks/Contacts/useAddContact";
import { useUserAuth } from "../../../stores/user";
import { ThreeDots } from "react-loader-spinner";

interface AddContactProps {
  onClose: () => void;
}

const AddContact: React.FC<AddContactProps> = ({ onClose }) => {
  const { user } = useUserAuth();
  const { mutate, isPending } = useAddContact();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [maturity, setMaturity] = useState("");
  return (
    <Modal>
      <form
        className={`w-[450px] md:w-[605px] bg-white px-6 py-6 border rounded-2xl flex flex-col`}
        onSubmit={(e) => {
          e.preventDefault();
          user?._id &&
            mutate({
              firstName,
              lastName,
              address,
              phoneNumber,
              maturity,
              createdBy: user?._id,
            });
        }}
      >
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl">Add Contact</h1>
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
  );
};

export default AddContact;
import { IoIosClose } from "react-icons/io";
import Modal from "../../../ui/Modal/Modal";
import InformationInput from "../Membership/Edit Profile/InformationInput";
import PhoneNumber from "../../../ui/Input/PhoneNumber";
import { useState } from "react";
import { useAddContact } from "../../../hooks/useContact";
import { useUserAuth } from "../../../stores/user";
import { ThreeDots } from "react-loader-spinner";
import { DropDownInput } from "../../../ui/DropDownMenu/DropDownInput";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../../../ui/Input/Input";

interface AddContactProps {
  onClose: () => void;
}

const AddContact: React.FC<AddContactProps> = ({ onClose }) => {
  const schema = z.object({
    email: z.string().email({ message: "Please enter a valid email" }),
  });

  type FormData = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const { user } = useUserAuth();
  const { mutate, isPending } = useAddContact({ onClose: onClose });
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [maturity, setMaturity] = useState("");
  const [email, setEmail] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");

  const handleGender = (value: string) => {
    setGender(value);
  };
  return (
    <Modal onClose={onClose}>
      <form
        className={`w-full md:w-[605px] bg-white px-6 py-6 border rounded-2xl flex flex-col max-h-[700px] overflow-y-scroll`}
        onSubmit={handleSubmit(() => {
          user?._id &&
            mutate({
              firstName,
              lastName,
              address,
              phoneNumber,
              maturity: maturity.toLowerCase(),
              createdBy: user?._id,
              email,
              gender,
            });
        })}
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
          notCompulsory=" "
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
        <Input
          heading={"Email"}
          name={"email"}
          register={register}
          placeholder={"temidireowoeye@gmail.com"}
          formError={errors.email?.message}
          classname="bg-white"
        />

        <div className=" space-y-1 mb-4">
          <p className="text-[#727272]">D.O.B</p>
          <div className="border rounded-lg p-2">
            <input
              className="outline-none text-[#434343] text-lg w-full"
              type="date"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
            />
          </div>
        </div>
        <DropDownInput
          text="Gender"
          items={["male", "female"]}
          placeholder="Male"
          compulsory=" "
          onSelect={handleGender}
          value={gender}
          onChange={(gender) => setGender(gender)}
        />
        <InformationInput
          text={"Address"}
          onChange={(e) => {
            setAddress(e.target.value);
          }}
          value={address}
          notCompulsory=" "
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

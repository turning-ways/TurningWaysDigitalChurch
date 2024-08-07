import InformationInput from "../Membership/Edit Profile/InformationInput";
import PhoneNumber from "../../../ui/Input/PhoneNumber";
import { useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import {
  createContact,
  selectContactsLoading,
} from "../../../slices/contactSlice";
import { AppDispatch } from "../../../store";
import { useDispatch, useSelector } from "react-redux";
import { useChurchIdStore } from "../../../stores/churchId";
import { DropDownInput } from "../../../ui/DropDownMenu/DropDownInput";
import { notify } from "../../../hooks/useAuthData";
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/ui/Dialog";
import { HiMiniPlusCircle } from "react-icons/hi2";

const AddContact: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [maturity, setMaturity] = useState("undefined");
  const [email, setEmail] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");
  const churchId = useChurchIdStore((state) => state.churchId);
  const dispatch = useDispatch<AppDispatch>();
  const isPending = useSelector(selectContactsLoading);
  const user = JSON.parse(localStorage.getItem("user") as string);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName || !phoneNumber || !maturity || !gender) {
      notify("Please fill in all the required fields");
      return;
    }
    if (phoneNumber.length < 10) {
      notify("Please enter a valid phone number");
      return;
    }
    dispatch(
      createContact({
        churchId,
        contact: {
          firstName,
          lastName,
          phone: phoneNumber,
          address,
          maturityLevel: maturity,
          email,
          gender,
          createdBy: user.memberId,
          // dateOfBirth,
        },
        onClose: () => setOpen(false),
      })
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild onClick={() => setOpen(!open)}>
        <button className="rounded-[15px] border border-[#17275B] px-5 py-3 space-x-2 text-[#17275B] flex items-center my-10 md:my-0 h">
          <HiMiniPlusCircle className="text-[21px]" />
          <p className="font-medium">Add Contact</p>
        </button>
      </DialogTrigger>
      <DialogContent className="bg-white max-h-[80%] overflow-auto">
        <DialogHeader className="!flex flex-row justify-between items-center w-full">
          <DialogTitle className="text-2xl font-azo text-gray-800">
            Add Contact
          </DialogTitle>
        </DialogHeader>

        <form
          className={`w-full bg-white py-6 flex flex-col h-full`}
          onSubmit={handleSubmit}>
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
            items={["infant", "child", "teen", "adult", "elder", "undefined"]}
            placeholder="Child, Adult or Teen"
            compulsory=" "
            onSelect={(value) => setMaturity(value)}
            value={maturity}
            onChange={(maturity) => setMaturity(maturity)}
          />
          <InformationInput
            text={"Email"}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
            notCompulsory=" "
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
            compulsory="*"
            onSelect={(value) => setGender(value)}
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
      </DialogContent>
    </Dialog>
  );
};

export default AddContact;

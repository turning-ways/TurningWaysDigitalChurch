import { useEffect, useState } from "react";
import InformationInput from "../Membership/Edit Profile/InformationInput";
import PhoneNumber from "../../../ui/Input/PhoneNumber";
import { ThreeDots } from "react-loader-spinner";
import { DropDownInput } from "../../../ui/DropDownMenu/DropDownInput";
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/ui/Dialog";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "../../../store";
import {
  updateContact,
  selectSelectedContact,
  selectContactsLoading,
} from "../../../slices/contactSlice";
import { useChurchIdStore } from "../../../stores/churchId";
import { notify } from "../../../hooks/useAuthData";

const UpdateContact: React.FC = () => {
  const contact = useSelector(selectSelectedContact);
  const isPending = useSelector(selectContactsLoading);
  const dispatch = useDispatch<AppDispatch>();
  const [open, setOpen] = useState(false);

  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [maturity, setMaturity] = useState<string>("");
  const [membership, setMembership] = useState<string>("");
  const [dateOfBirth, setDateOfBirth] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const { contact_id } = useParams();
  const safeContactId = contact_id ?? "";
  const churchId = useChurchIdStore((state) => state.churchId);
  interface Authuser {
    memberId: string;
    // Add other properties as needed
  }

  const user: Authuser = JSON.parse(localStorage.getItem("user") as string);

  const handleEdit = () => {
    if (!firstName || !gender || !phoneNumber) {
      notify("Please fill in the required fields");
      return;
    }

    if (phoneNumber.length < 10) {
      notify("Phone number must be at least 10 digits");
      return;
    }

    dispatch(
      updateContact({
        contactId: safeContactId,
        churchId: churchId,
        contact: {
          firstName: firstName?.toLowerCase(),
          lastName: lastName?.toLowerCase(),
          gender: gender?.toLowerCase(),
          address: address?.toLowerCase(),
          email: email?.toLowerCase(),
          maturityLevel: maturity?.toLowerCase(),
          contactType: membership?.toLowerCase(),
          phone: phoneNumber,
          dateOfBirth: dateOfBirth,
          modifiedBy: user.memberId,
        },
      })
    );
    // delay the closing of the modal to allow the user see the loading spinner
    setTimeout(() => {
      setOpen(false);
    }, 2000);
  };

  useEffect(() => {
    if (contact) {
      setFirstName(contact.firstName);
      setLastName(contact?.lastName || "");
      setAddress(contact.address);
      setGender(contact.gender);
      setMaturity(contact.maturityLevel);
      setPhoneNumber(contact.phone);
      setEmail(contact.email);
      setMembership(contact.memberStatus);
    }
  }, [contact]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild onClick={() => setOpen(!open)}>
        <button className="border border-[#17275B] text-[#17275B] px-4 py-2 rounded-lg">
          Edit Contact
        </button>
      </DialogTrigger>
      <DialogContent className="bg-white max-h-[80%] overflow-auto">
        <DialogHeader className="!flex flex-row justify-between items-center w-full">
          <DialogTitle className="text-2xl font-azo text-gray-800">
            Edit Contact
          </DialogTitle>
        </DialogHeader>
        <form
          className="w-full bg-white py-6 flex flex-col h-full"
          onSubmit={(e) => {
            e.preventDefault();
            handleEdit();
          }}>
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
          <DropDownInput
            text="gender"
            items={["male", "female"]}
            placeholder="male or female"
            compulsory=" "
            onSelect={(value) => setGender(value)}
            value={gender}
            onChange={(gender) => setGender(gender)}
          />
          <PhoneNumber
            value={phoneNumber}
            setValue={(value) => setPhoneNumber(value)}
          />
          <DropDownInput
            text="Maturity"
            items={["infant", "child", "teen", "adult", "elder"]}
            placeholder="Child, Teen, Adult, Elder"
            compulsory=" "
            onSelect={(value) => setMaturity(value)}
            value={maturity}
            onChange={(maturity) => setMaturity(maturity)}
          />
          <DropDownInput
            text="Contact Type:"
            items={[
              "member",
              "regular",
              "visitor",
              "participant",
              "inprogress",
              "undefined",
            ]}
            itemsArray={[
              {
                label: "Member",
                value: "member",
              },
              {
                label: "Regular Attendee",
                value: "regular",
              },
              {
                label: "Visitor",
                value: "visitor",
              },
              {
                label: "Participant",
                value: "participant",
              },
              {
                label: "In Progress",
                value: "inprogress",
              },
              {
                label: "Undefined",
                value: "undefined",
              },
            ]}
            placeholder="potential, inprogress, cancelled"
            onSelect={(value) => setMembership(value)}
            value={membership}
            onChange={(value) => setMembership(value)}
          />
          <InformationInput
            text={"Email"}
            type="email"
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
          <div className=" space-y-1 mb-4">
            <p className="text-[#727272]">
              Date Of Birth <span className="text-[#61BD74]"></span>
            </p>
            <div className="border rounded-lg p-2">
              <input
                className="outline-none text-[#434343] text-lg w-full"
                type="date"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
              />
            </div>
          </div>
          <button className="self-end border border-[#414141] px-20 py-2 rounded-lg text-[#141414] bg-white">
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

export default UpdateContact;

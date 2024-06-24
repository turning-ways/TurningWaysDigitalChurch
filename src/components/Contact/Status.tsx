import { useState } from "react";
import { DropDownInput } from "../../ui/DropDownMenu/DropDownInput";
import { useUserAuth } from "../../stores/user";
import {
  useGetContacts,
  useUpdateContact,
  useUpdateContactStatus,
} from "../../hooks/useContact";
import { useParams } from "react-router-dom";

const Status = () => {
  const id = useUserAuth((auth) => auth.user?._id);
  const { contact_id } = useParams();
  const contactDetailsQuery = useGetContacts();

  const contactStatusQuery = useUpdateContactStatus({
    id: contact_id,
    onClose: () => console.log("status updated"),
  });
  const updateContactQuery = useUpdateContact({});
  const [membershipStatus, setMembershipStatus] = useState("");
  const handleMembershipStatus = (value: string) => {
    setMembershipStatus(value);
    contactStatusQuery.mutate({ membershipStatus: value, modifiedBy: id });
  };
  const [maturity, setMaturity] = useState("");
  const handleMaturity = (value: string) => {
    setMaturity(value);
    updateContactQuery.mutate({ maturity: value });
  };
  return (
    <section className="md:grid md:grid-cols-2 gap-x-4 ">
      <DropDownInput
        text="Membership:"
        items={["potential", "confirmed", "cancelled"]}
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

      {fields.map((field, index) => (
        <div className={`space-y-1 mb-4 md:mb-0 ${index === fields.length-1 && "col-span-2"}`} key={index}>
          <p className="text-[#727272]">{field.name}</p>
          <div className="border border-[#D9D9D9] rounded-lg p-2 ">
            <input
              className={`outline-none text-[#434343] text-lg w-full bg-transparent `}
              readOnly={true}
              value={
                contactDetailsQuery.data
                  ? contactDetailsQuery.data[field.id]
                  : ""
              }
            />
          </div>
        </div>
      ))}
    </section>
  );
};

export default Status;

const fields = [
  { id: "phoneNumber", name: "Phone Number" },
  { id: "email", name: "Email" },
  { id: "dateOfBirth", name: "DOB" },
  { id: "gender", name: "Gender" },
  { id: "address", name: "Address" },
];

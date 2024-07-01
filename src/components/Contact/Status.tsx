import { capitalizeFirstLetters } from "../../constants/constants";
import {
  useGetContacts,
} from "../../hooks/useContact";

const Status = () => {
  const contactDetailsQuery = useGetContacts();

  return (
    <section className="md:grid md:grid-cols-2 gap-x-4 ">
      {fields.map((field, index) => (
        <div
          className={`space-y-1 mb-4 ${
            index === fields.length - 1 && "col-span-2"
          }`}
          key={index}
        >
          <p className="text-[#727272]">{field.name}</p>
          <div className="border border-[#D9D9D9] rounded-lg p-2 ">
            <input
              className={`outline-none text-[#434343] text-lg w-full bg-transparent `}
              readOnly={true}
              value={
                contactDetailsQuery.data
                  ? (field.id !== "phoneNumber" && field.id !== "email" ? capitalizeFirstLetters(contactDetailsQuery.data[field.id]) : contactDetailsQuery.data[field.id])
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
  { id: "membershipStatus", name: "Membership Status" },
  { id: "maturity", name: "Maturity" },
  { id: "phoneNumber", name: "Phone Number" },
  { id: "email", name: "Email" },
  { id: "dateOfBirth", name: "DOB" },
  { id: "gender", name: "Gender" },
  { id: "address", name: "Address" },

];

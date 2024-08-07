/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector } from "react-redux";
import { capitalizeFirstLetters } from "../../constants/constants";
import {
  selectContactsLoading,
  selectSelectedContact,
} from "../../slices/contactSlice";

const dobFormatter = (dob: string) => {
  const date = new Date(dob);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const Status = () => {
  const contact = useSelector(selectSelectedContact) as any;
  const isPending = useSelector(selectContactsLoading);
  return (
    <section className="md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 ">
      {fields.map((field, index) => (
        <div
          className={`space-y-1 mb-4 ${
            index === fields.length - 1 && "col-span-2"
          } ${isPending && "mt-4"}`}
          key={index}>
          {!isPending ? (
            <>
              <p className="text-[#727272]">{field.name}</p>
              <div className="border border-[#D9D9D9] rounded-lg p-2 ">
                <input
                  className={`outline-none text-[#434343] text-lg w-full bg-transparent `}
                  readOnly={true}
                  value={
                    contact
                      ? field.id === "dateOfBirth"
                        ? dobFormatter(contact[field.id])
                        : field.id !== "phone" && field.id !== "email"
                        ? capitalizeFirstLetters(contact[field.id])
                        : contact[field.id]
                      : ""
                  }
                />
              </div>
            </>
          ) : (
            <div className="w-full h-10 skeleton "></div>
          )}
        </div>
      ))}
    </section>
  );
};

// contactDetailsQuery.data
// 	? field.id !== "phoneNumber" && field.id !== "email"
// 		? capitalizeFirstLetters(contactDetailsQuery.data[field.id])
// 		: contactDetailsQuery.data[field.id]
// 	: ""

export default Status;

const fields = [
  { id: "contactType", name: "Contact Type" },
  { id: "maturityLevel", name: "Maturity" },
  { id: "phone", name: "Phone Number" },
  { id: "email", name: "Email" },
  { id: "dateOfBirth", name: "Date Of Birth" },
  { id: "gender", name: "Gender" },
  { id: "address", name: "Address" },
];

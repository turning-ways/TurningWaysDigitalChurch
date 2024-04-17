import InformationInput from "./InformationField";

const ContactInformation = () => {
  const information = [
    { name: "Email", value: "12345" },
    { name: "Phone Number", value: "12345" },
  ];
  return (
    <div className="mt-5">
      {information.map((item) => (
        <InformationInput text={item.name} subText={item.value} />
      ))}
    </div>
  );
};

export default ContactInformation;

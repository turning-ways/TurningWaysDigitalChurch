import InformationInput from "./InformationInput";

const EditProfileContactInfo = () => {
  const information = [
    { name: "Email" },
    { name: "Phone Number" },
    { name: "Home Address" },
  ];
  return (
    <div className="mt-5">
      {information.map((item) => (
        <InformationInput text={item.name} />
      ))}
    </div>
  );
};

export default EditProfileContactInfo;

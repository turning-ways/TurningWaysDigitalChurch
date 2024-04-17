import InformationInput from "./InformationInput";

const EditProfilePersonalInfo = () => {
  const information = [
    {
      name: "Prefix",
    },
    {
      name: "Last Name",
    },
    {
      name: "Birthday",
    },
    {
      name: "Country",
    },
    {
      name: "Marital Status",
    },
  ];

  return (
    <div className="mt-5">
      {information.map((item) => (
        <InformationInput text={item.name} />
      ))}
    </div>
  );
};

export default EditProfilePersonalInfo;

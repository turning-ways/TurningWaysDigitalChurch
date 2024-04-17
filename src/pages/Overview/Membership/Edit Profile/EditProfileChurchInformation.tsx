import InformationInput from "./InformationInput";

const EditProfileChurchInfo = () => {
  const information = [
    { name: "Access Permission" },
    { name: "Member Status" },
    { name: "Work Type" },
    { name: "Service Unit/Department" },
  ];
  return (
    <div className="mt-5">
      {information.map((item) => (
        <InformationInput text={item.name} />
      ))}
    </div>
  );
};

export default EditProfileChurchInfo;

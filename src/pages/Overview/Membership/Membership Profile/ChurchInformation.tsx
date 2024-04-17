import InformationInput from "./InformationField";

const ChurchInformation = () => {
  const information = [
    {
      name: "Access Permission",
      value: "Temidire",
    },
    {
      name: "Member Status",
      value: "Owoeye",
    },
    {
      name: "Work Type",
      value: "Owoeye",
    },
    {
      name: "Service Unit or Department",
      value: "Owoeye",
    },
    {
      name: "Membership Confirmation/Date",
      value: "Owoeye",
    },
    {
      name: "Work Ordination",
      value: "Owoeye",
    },
    {
      name: "Salvation Date",
      value: "Owoeye",
    },
  ];
  return (
    <div className="mt-5">
      {information.map((item) => (
        <InformationInput text={item.name} subText={item.value} />
      ))}
    </div>
  );
};

export default ChurchInformation;

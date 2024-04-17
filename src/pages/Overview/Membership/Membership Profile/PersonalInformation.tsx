import { IoIosArrowForward } from "react-icons/io";
import InformationInput from "./InformationField";

const PersonalInformation = () => {


  const information = [
    {
      name: "First Name",
      value: "Temidire",
    },
    {
      name: "Last Name",
      value: "Owoeye",
    },
    {
      name: "Birthday",
      value: "Owoeye",
    },
    {
      name: "Country",
      value: "Owoeye",
    },
    {
      name: "Marital Status",
      value: "Owoeye",
    },
  ];

  return (
    <div className="mt-10">
      <div className="flex p-5 bg-[#F3F1F1] justify-between items-center ">
        <p className="font-medium text-[#414040]">Household</p>
        <IoIosArrowForward className="text-[28px]" />
      </div>
      {information.map((item) => (
        <InformationInput text={item.name} subText={item.value} />
      ))}
    </div>
  );
};

export default PersonalInformation;

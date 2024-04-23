import Header from "../Header";
import OverviewContainer from "../OverviewContainer";
import { CiImport, CiExport, CiMail, CiFilter } from "react-icons/ci";
import AllMembers from "./AllMembers";

const Membership = () => {
  const items = [
    { name: "Filter", icon: <CiFilter /> },
    { name: "Send Bulk Message", icon: <CiMail /> },
    { name: "Export Data", icon: <CiExport /> },
    { name: "Import Data", icon: <CiImport /> },
  ];

  return (
    <OverviewContainer active="Directory">
      <Header text="Membership" />

      {/* component */}
      <div className="flex justify-between my-10">
        <p className="text-xl">40 Persons</p>
        <ul className="flex space-x-6 text-[18px] text-[#8A8989]">
          {items.map((item) => (
            <li className="flex items-center space-x-1 p-2 cursor-pointer">
              <div>{item.icon}</div>
              <p className="leading-3">{item.name}</p>
            </li>
          ))}
        </ul>
      </div>
      {/* componentClosed */}

      <AllMembers />
    </OverviewContainer>
  );
};

export default Membership;
